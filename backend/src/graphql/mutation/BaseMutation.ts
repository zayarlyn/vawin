// prettier-ignore
import { Args, ArgsType, Field, InputType, Int, Resolver } from '@nestjs/graphql';
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource, QueryRunner } from 'typeorm'

import { Order, OrderProduct } from '@db/entities'
import { OrderType, OrderTypeInput } from '../type'

@InputType()
class OrderMutationValuesInput extends OrderTypeInput {
  @Field(() => [Number], { nullable: true })
  productIds: number[]
  deletedProductIds: number[]
}

@ArgsType()
class MArgs {
  @Field(() => Int, { nullable: true })
  id: number

  @Field(() => OrderMutationValuesInput, { nullable: true })
  values: OrderMutationValuesInput

  @Field({ nullable: true })
  deleted: boolean
}

interface MutationResponse {
  id: number
}

@Resolver()
export class BaseMutationResolver {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async withTransaction(func: any) {
    console.log(this.dataSource)
    const runner = this.dataSource.createQueryRunner()
    await runner.connect()
    await runner.startTransaction()

    try {
      const result = await func(runner)
      await runner.commitTransaction()
      return result
    } catch (e) {
      await runner.rollbackTransaction()
      return { id: 0 }
    } finally {
      // you need to release query runner which is manually created:
      await runner.release()
    }
  }

  async doSoftDelete(runner: QueryRunner, entity: any, id: number) {
    await runner.manager.softDelete(entity, id)
    return { id }
  }

  async mutation<ResponseType>(args: any): Promise<ResponseType | MutationResponse> {
    return
  }
}
