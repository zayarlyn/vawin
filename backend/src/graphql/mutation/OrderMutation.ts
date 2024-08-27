// prettier-ignore
import { Args, Field, ID, Mutation, Resolver, ArgsType, InputType } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Order, Product } from '@db/entities';
import { OrderType } from '../type';

@InputType()
class OrderMutationValuesInput {
  @Field(() => [String])
  productIds: string[];
}

@ArgsType()
class MArgs {
  @Field(() => ID)
  id: number;

  @Field(() => OrderMutationValuesInput)
  values: OrderMutationValuesInput;

  @Field({ nullable: true })
  delete: boolean;
}

@Resolver()
export class OrderMutationResolver {
  constructor(
    @InjectRepository(Order) private order: Repository<Order>,
    @InjectRepository(Product) private product: Repository<Product>,
  ) {}

  @Mutation(() => OrderType)
  async orderMutation(@Args() args: MArgs): Promise<OrderType> {
    const { id, values } = args;
    console.log(args.values);

    // async orderMutation(): Promise<ProductType> {
    // const { id, values } = args;
    // values.date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // console.log({ id, values });
    // const [billDraft] = await this.billModel.findOrCreate({
    //   where: { id },
    //   defaults: { ...values },
    // });

    // billDraft.save();
    // return billDraft;
    // await this.order.save({});
    this.checkProductAvailability(values.productIds);
    return this.order.findOne({ where: { id } });
    return;
  }

  private async checkProductAvailability(productIds: string[]) {
    const products = await this.product.find({
      where: { id: In(productIds) },
      withDeleted: true,
    });
    console.log(products);
    // if (products.length !== productIds.length) {
    // throw new Http('Product not found', 404);
    // }
  }
}
