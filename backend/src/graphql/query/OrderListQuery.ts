import { Order } from '@db/entities'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'

import { MyGqlContext } from '../graphql.module'
import { OrderType } from '../type'
import { BaseListQueryResolver, QArgs } from './BaseListQuery'

@Resolver()
export class OrderListQueryResolver extends BaseListQueryResolver {
  // constructor(@InjectRepository(Order) private order: Repository<Order>) {}
  entity = Order

  @Query(() => [OrderType])
  async orderList(@Args() args: QArgs, @Context() ctx: MyGqlContext): Promise<OrderType[]> {
    return this.findAll({ orderProducts: { product: true } }, args, ctx)
  }
}
