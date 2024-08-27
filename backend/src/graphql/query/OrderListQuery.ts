import { Order } from '@db/entities';
import { Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderType } from '../type';

// FIXME: id = 1 is a mysql curse

@Resolver()
export class OrderListQueryResolver {
  constructor(@InjectRepository(Order) private order: Repository<Order>) {}

  @Query(() => [OrderType])
  // async billList(@Args() args: BillListArgs): Promise<BillType[]> {
  async orderList(): Promise<OrderType[]> {
    // const { where } = args;

    console.log(
      await this.order.findOne({
        relations: { orderProducts: { product: true } },
        where: { id: 47 },
      }),
    );
    return this.order.find({ relations: { orderProducts: { product: true } } });
    // return this.billModel.findAll({ where });
    return;
  }
}
