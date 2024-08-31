import { Field, Float, InputType, ObjectType } from '@nestjs/graphql'
import { BaseType } from './BaseType'

@ObjectType()
export class ProductType extends BaseType {
  @Field()
  name: string

  @Field(() => Float)
  price: number
}

@InputType()
export class ProductTypeInput {
  @Field({ nullable: true })
  name: string

  @Field(() => Float, { nullable: true })
  price: number
}
