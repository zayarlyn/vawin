import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer, Order, OrderProduct, Product, Staff } from './entities'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'yyyy',
      entities: [Product, Order, OrderProduct, Customer, Staff],
      // logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DbModule {}
