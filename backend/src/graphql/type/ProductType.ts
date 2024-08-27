import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseType } from './BaseType';

@ObjectType()
export class ProductType extends BaseType {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;
}
