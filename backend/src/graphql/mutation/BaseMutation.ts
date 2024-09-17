// prettier-ignore
import { Resolver } from '@nestjs/graphql';
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource, QueryRunner } from 'typeorm'

import { Customer, Order, OrderProduct, Product, Staff } from '@db/entities'
import { GraphQLError } from 'graphql'

@Resolver()
export class BaseMutationResolver {
  entities = { OrderProduct, Product, Order, Staff, Customer }

  constructor(@InjectDataSource() private dataSource?: DataSource) {}

  async withTransaction(mutationFunc: any) {
    const runner = this.dataSource.createQueryRunner()
    await runner.connect()
    await runner.startTransaction()

    try {
      const result = await mutationFunc(runner)
      await runner.commitTransaction()
      return result
    } catch (e) {
      await runner.rollbackTransaction()
      return new GraphQLError(e)
    } finally {
      // you need to release query runner which is manually created:
      await runner.release()
    }
  }

  async doSoftDelete(runner: QueryRunner, entity: any, id: number) {
    await runner.manager.softDelete(entity, id)
    return { id }
  }

  // only handle create/delete, pls do update in dedicated mutation
  async saveRelations(runner: QueryRunner, parent: any, _relations: MRelations) {
    return Promise.all(
      _relations.map(async (relationsObj) => {
        const { records: _records, entity, parentIdKey } = relationsObj
        // inject parentId foreign key
        const records = _records.map((r) => ({ [parentIdKey]: parent.id, ...r }))

        const recordsToAdd = records.filter((r) => !r.deleted)
        const recordsToRemove = records.filter((r) => r.deleted)

        if (recordsToRemove.length) {
          await runner.manager.softDelete(this.entities[entity], recordsToRemove)
        }
        if (recordsToAdd.length) {
          await runner.manager.save(this.entities[entity], recordsToAdd)
        }
      }),
    )
  }
}

// @InputType()
// export class MRelationInputType {
//   @Field()
//   id: number

//   @Field({ nullable: true })
//   deleted?: boolean
// }

export interface MutationResponse {
  id: number
}

export type MRelations = { entity: any; parentIdKey: string; records: { id?: number; deleted?: boolean }[] }[]
