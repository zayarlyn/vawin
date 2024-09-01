import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule as NestJSGraphQLModule } from '@nestjs/graphql'
// import { GraphQLJSON } from 'graphql-scalars';
import { Order, OrderProduct, Product } from '@db/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderMutationResolver } from './mutation'
import { OrderListQueryResolver, ProductListQueryResolver } from './query'
import { ProductMutationResolver } from './mutation/ProductMutation'
import { ObjectScalar } from './scalars'
import { parse } from 'graphql'
import { FindOptionsSelect } from 'typeorm'

@Module({
  imports: [
    // SequelizeModule.forFeature([BillModel]),
    TypeOrmModule.forFeature([Product, Order, OrderProduct]),
    NestJSGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      context: async (ctx) => {
        return {
          //@ts-ignore
          selection: parse(ctx.req.body.query).definitions[0].selectionSet.selections[0].selectionSet.selections.map(
            (s) => s.name.value,
          ),
        }
      },
      // FIXME: why need to be JSON and not Json?
      // resolvers: { JSON: GraphQLJSON },
      resolvers: { Object: ObjectScalar },
    }),
  ],
  providers: [ProductListQueryResolver, OrderListQueryResolver, ProductMutationResolver, OrderMutationResolver],
  // controllers: [],
})
export class GraphqlModule {}

export interface MyGqlContext {
  selection: FindOptionsSelect<any>
}
