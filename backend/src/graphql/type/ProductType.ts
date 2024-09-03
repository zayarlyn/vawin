import { Field, Float, InputType, ObjectType, ResolveProperty } from '@nestjs/graphql'
import { BaseType } from './BaseType'
import { faker } from '@faker-js/faker'

@ObjectType()
export class ProductType extends BaseType {
  @Field()
  name: string

  @Field(() => Float)
  price: number

  @Field({
    middleware: [
      ({}) => {
        return faker.image.urlLoremFlickr({ category: 'sneakers' })
      },
    ],
  })
  url: string
}

@InputType()
export class ProductTypeInput {
  @Field({ nullable: true })
  name: string

  @Field(() => Float, { nullable: true })
  price: number
}
