// prettier-ignore
import { Args, ArgsType, Field, Int, Mutation, Resolver } from '@nestjs/graphql';
import { QueryRunner } from 'typeorm'

import { Order } from '@db/entities'
import { ObjectScalar } from '../scalars'
import { OrderMVI, OrderType } from '../type'
import { BaseMutationResolver, MRelations, MutationResponse } from './BaseMutation'

@ArgsType()
class MArgs {
  @Field(() => Int, { nullable: true })
  id: number

  @Field(() => ObjectScalar, { nullable: true })
  values: OrderMVI

  @Field(() => ObjectScalar, { nullable: true })
  relations: MRelations

  @Field({ nullable: true })
  deleted: boolean

  @Field()
  vendorId: string
}

@Resolver()
export class OrderMutationResolver extends BaseMutationResolver {
  @Mutation(() => OrderType)
  async orderMutation(@Args() args: MArgs): Promise<OrderType | MutationResponse> {
    return this.withTransaction(async (runner: QueryRunner) => {
      const { id, values, relations, deleted, vendorId } = args

      if (deleted) return this.doSoftDelete(runner, Order, id)

      const order = await runner.manager.save(Order, { id, vendorId, customerId: 7, ...values })
      await this.saveRelations(runner, order, relations)

      return order
    })
  }
}
