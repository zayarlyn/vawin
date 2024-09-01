import { Module } from '@nestjs/common'
import { DbModule } from './db/db.module'
import { GraphqlModule } from './graphql/graphql.module'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer, Order, OrderProduct, Product } from '@db/entities'
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [GraphqlModule, DbModule, TypeOrmModule.forFeature([Customer, Product, Order, OrderProduct])],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
