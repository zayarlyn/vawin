import { Field, ObjectType } from '@nestjs/graphql'
import { BaseType } from './BaseType'

@ObjectType()
export class BaseAuthUserType extends BaseType {
  @Field()
  name: string

  @Field()
  userId: string

  @Field()
  phone: string

  @Field()
  email: string

  @Field()
  emailVerifiedAt: Date

  @Field()
  phoneVerifiedAt: Date
}
