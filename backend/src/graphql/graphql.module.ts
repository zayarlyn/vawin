import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Logger, Module } from '@nestjs/common'
import { GraphQLModule as NestJSGraphQLModule } from '@nestjs/graphql'
// import { GraphQLJSON } from 'graphql-scalars';
import { Customer, Order, OrderProduct, Product, Staff } from '@db/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderMutationResolver } from './mutation'
import { OrderListQueryResolver, ProductListQueryResolver } from './query'
import { ProductMutationResolver } from './mutation/ProductMutation'
import { ObjectScalar } from './scalars'
import { parse } from 'graphql'
import { FindOptionsSelect } from 'typeorm'
import { CustomerListQueryResolver } from './query/CustomerListQuery'

@Module({
  imports: [
    // SequelizeModule.forFeature([BillModel]),
    TypeOrmModule.forFeature([Product, Order, OrderProduct, Customer, Staff]),
    NestJSGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      context: async (ctx) => {
        // console.log('ctx.req.body.query', ctx.req.body.query)
        return {
          selection: parse(ctx.req.body.query)
            //@ts-ignore
            .definitions[0].selectionSet.selections[0].selectionSet.selections.map((s) => s.name.value)
            .filter((s) => s !== '__typename'),
        }
      },
      // FIXME: why need to be JSON and not Json?
      // resolvers: { JSON: GraphQLJSON },
      resolvers: { Object: ObjectScalar },
    }),
  ],
  providers: [
    ProductListQueryResolver,
    OrderListQueryResolver,
    CustomerListQueryResolver,
    ProductMutationResolver,
    OrderMutationResolver,
  ],
  // controllers: [],
})
export class GraphqlModule {}

export interface MyGqlContext {
  selection: FindOptionsSelect<any>
}
