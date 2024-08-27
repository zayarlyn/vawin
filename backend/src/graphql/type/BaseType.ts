import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseType {
  @Field(() => ID)
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
