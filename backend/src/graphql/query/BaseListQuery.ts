import { Product } from '@db/entities'
import { ArgsType, Field, InputType, Resolver } from '@nestjs/graphql'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource, FindOptionsRelations, FindOptionsWhere } from 'typeorm'

import { MyGqlContext } from '../graphql.module'
import { ObjectScalar } from '../scalars'

@InputType()
class QPagination {
  @Field({ nullable: true })
  skip: number

  @Field({ nullable: true })
  take: number
}

@ArgsType()
export class QArgs {
  @Field(() => ObjectScalar, { nullable: true })
  where: FindOptionsWhere<Product>

  @Field({ nullable: true })
  withDeleted: boolean = false

  @Field(() => QPagination, { nullable: true })
  pagination: QPagination
}

// FIXME: id = 1 is a mysql curse
@Resolver()
export class BaseListQueryResolver {
  entity: any
  constructor(@InjectDataSource() private dataSource?: DataSource) {}

  async findAll<Entity>(relations: FindOptionsRelations<Entity>, args: QArgs, ctx: MyGqlContext): Promise<any[]> {
    const { where, withDeleted, pagination = { skip: 0, take: 50 } } = args

    console.log(ctx.selection)
    return this.dataSource.manager.find(this.entity, {
      where,
      withDeleted,
      ...pagination,
      // select: ctx.selection,
      relations,
    })
  }
}
