import { Field, ObjectType } from '@nestjs/graphql';
import { BaseType } from './BaseType';
import { OrderProduct } from '@db/entities';
import { OrderProductType } from './OrderProductType';

@ObjectType()
export class OrderType extends BaseType {
  @Field()
  date: Date;

  @Field(() => [OrderProductType])
  orderProducts: OrderProduct[];
}
