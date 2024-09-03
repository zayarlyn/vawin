// prettier-ignore
import { Args, ArgsType, Field, InputType, Int, Mutation, Resolver } from '@nestjs/graphql';
import { QueryRunner } from 'typeorm'

import { Order, OrderProduct } from '@db/entities'
import { OrderType, OrderTypeInput } from '../type'
import { BaseMutationResolver } from './BaseMutation'

@InputType()
class OrderMutationValuesInput extends OrderTypeInput {
  @Field(() => [Number], { nullable: true })
  productIds: number[]

  @Field(() => [Number], { nullable: true })
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
export class OrderMutationResolver extends BaseMutationResolver {
  @Mutation(() => OrderType)
  async orderMutation(@Args() args: MArgs): Promise<OrderType | MutationResponse> {
    return this.withTransaction(async (runner: QueryRunner) => {
      const { id, values, deleted } = args

      if (deleted) return this.doSoftDelete(runner, Order, id)

      const order = await runner.manager.save(Order, { id, customerId: 4, ...values })
      await this.saveRelation(runner, order, values)
      return order
    })
  }

  private async saveRelation(runner: QueryRunner, order: Order, values: OrderMutationValuesInput) {
    const { productIds, deletedProductIds } = values
    if (deletedProductIds) {
      await runner.manager.softDelete(
        OrderProduct,
        deletedProductIds.map((id) => ({ productId: id })),
      )
    }
    if (productIds) {
      await runner.manager.save(
        OrderProduct,
        productIds.map((productId) => ({ orderId: order.id, productId })),
      )
    }
  }
}
