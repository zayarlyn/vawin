import { Product } from '@db/entities'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'

import { MyGqlContext } from '../graphql.module'
import { ProductType } from '../type'
import { BaseListQueryResolver, QArgs } from './BaseListQuery'

@Resolver()
export class ProductListQueryResolver extends BaseListQueryResolver {
  entity = Product
  // constructor(@InjectRepository(Product) private product: Repository<Product>) {}

  @Query(() => [ProductType])
  async productList(@Args() args: QArgs, @Context() ctx: MyGqlContext): Promise<ProductType[]> {
    return this.findAll(undefined, args, ctx)
  }
}
