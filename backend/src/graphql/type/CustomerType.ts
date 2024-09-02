import { Order } from '@db/entities'
import { Field, InputType, ObjectType } from '@nestjs/graphql'

import { BaseAuthUserType } from './BaseAuthUserType'
import { OrderType } from './OrderType'

@ObjectType()
export class CustomerType extends BaseAuthUserType {
  @Field(() => [OrderType])
  orders: Order[]
}

// for mutation
@InputType()
export class CustomerInput {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  userId: number
}
