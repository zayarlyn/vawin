import { Field, ObjectType } from '@nestjs/graphql';
import { BaseType } from './BaseType';
import { ProductType } from './ProductType';
import { Product } from '@db/entities';

@ObjectType()
export class OrderProductType extends BaseType {
  @Field()
  orderId: number;

  @Field()
  productId: number;

  @Field(() => ProductType)
  product: Product;
}
