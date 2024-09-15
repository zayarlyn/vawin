import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BaseType {
  @Field(() => Int)
  id: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field({ nullable: true })
  deletedAt?: Date

  @Field()
  vendorId: string
}
