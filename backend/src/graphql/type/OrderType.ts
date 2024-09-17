import { OrderProduct } from '@db/entities'
import { Field, InputType, ObjectType } from '@nestjs/graphql'

import { BaseType } from './BaseType'
import { OrderProductType } from './OrderProductType'

@ObjectType()
export class OrderType extends BaseType {
  @Field()
  status: string

  @Field(() => [OrderProductType])
  orderProducts: OrderProduct[]
}

// for mutation
@InputType()
export class OrderMVI {
  @Field({ nullable: true })
  status: string
}
