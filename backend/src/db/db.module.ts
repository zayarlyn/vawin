import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order, OrderProduct, Product } from './entities'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'yyyy',
      entities: [Product, Order, OrderProduct],
      // logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DbModule {}
