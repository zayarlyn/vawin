import { Customer } from '@db/entities'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'

import { MyGqlContext } from '../graphql.module'
import { CustomerType } from '../type'
import { BaseListQueryResolver, QArgs } from './BaseListQuery'

@Resolver()
export class CustomerListQueryResolver extends BaseListQueryResolver {
  // constructor(@InjectRepository(Customer) private customer: Repository<Customer>) {}
  entity = Customer

  @Query(() => [CustomerType])
  async customerList(@Args() args: QArgs, @Context() ctx: MyGqlContext): Promise<CustomerType[]> {
    return this.findAll(undefined, args, ctx)
  }
}
