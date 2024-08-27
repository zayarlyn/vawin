import { Order, OrderProduct, Product } from '@db/entities';
import { faker } from '@faker-js/faker';
import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('/')
export class AppController {
  constructor(
    @InjectRepository(Product) private product: Repository<Product>,
    @InjectRepository(Order) private order: Repository<Order>,
    @InjectRepository(OrderProduct)
    private orderProduct: Repository<OrderProduct>,
  ) {}

  @Get('/seed')
  async getHello(): Promise<string> {
    await this.orderProduct.delete({});

    const fakeProducts = Array.from({ length: 5 }).map(() => ({
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
    }));
    await this.product.delete({});
    // this.product.create(fakeProducts);
    const products = await this.product.save(fakeProducts);

    const fakeOrders = Array.from({ length: 3 }).map(() => ({
      date: faker.date.recent(),
    }));
    await this.order.delete({});
    // this.order.create(fakeOrders);
    const orders = await this.order.save(fakeOrders);

    console.log(products[0]);
    const oid = Math.floor((orders.length - 1) * Math.random());
    const pid = Math.floor((products.length - 1) * Math.random());
    console.log({ oid, pid });
    console.log({
      orderId: orders[oid],
      productId: products[pid],
    });

    // console.log(Math.floor(orders.length - 1 / Math.random()));
    // console.log(Math.floor(products.length - 1 / Math.random()));
    const fakeOrderProducts = Array.from({ length: 8 }).map(() => ({
      orderId: orders[Math.floor((orders.length - 1) * Math.random())].id,
      productId: products[Math.floor((products.length - 1) * Math.random())].id,
    }));

    this.orderProduct.create(fakeOrderProducts);
    await this.orderProduct.save(fakeOrderProducts);

    return 'seeded!!';
  }
}
