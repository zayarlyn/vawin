// prettier-ignore
import { Args, ArgsType, Field, InputType, Int, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Product } from '@db/entities'
import { ProductType, ProductTypeInput } from '../type'

@InputType()
class ProductMutationValuesInput extends ProductTypeInput {
  // @Field(() => [Number], { nullable: true })
  // productIds: number[]
}

@ArgsType()
class MArgs {
  @Field(() => Int, { nullable: true })
  id: number

  @Field(() => ProductMutationValuesInput, { nullable: true })
  values: ProductMutationValuesInput

  @Field({ nullable: true })
  deleted: boolean
}

interface MutationResponse {
  id: number
}

@Resolver()
export class ProductMutationResolver {
  constructor(@InjectRepository(Product) private product: Repository<Product>) {}

  @Mutation(() => ProductType)
  async productMutation(@Args() args: MArgs): Promise<ProductType | MutationResponse> {
    const { id, values, deleted } = args

    if (deleted) {
      await this.product.softDelete(id)
      return { id }
    }

    console.log(args)
    return this.product.save({ id, ...values })
  }
}
