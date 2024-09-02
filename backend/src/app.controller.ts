import { Customer, Order, ORDER_STATUS_ENUM, OrderProduct, Product } from '@db/entities'
import { faker } from '@faker-js/faker'
import { Controller, Get } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Controller('/')
export class AppController {
  constructor(
    @InjectRepository(Customer) private customer: Repository<Customer>,
    @InjectRepository(Product) private product: Repository<Product>,
    @InjectRepository(Order) private order: Repository<Order>,
    @InjectRepository(OrderProduct)
    private orderProduct: Repository<OrderProduct>,
  ) {}

  @Get('/seed')
  async getHello(): Promise<string> {
    await this.orderProduct.delete({})
    await this.product.delete({})
    await this.order.delete({})
    await this.customer.delete({})

    const fakeProducts = Array.from({ length: 5 }).map(() => ({
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
    }))
    // this.product.create(fakeProducts);
    const products = await this.product.save(fakeProducts)

    const fakeCustomers = Array.from({ length: 3 }).map(() => ({
      userId: '123',
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      emailVerifiedAt: faker.date.past(),
      phoneVerifiedAt: faker.date.past(),
    }))
    const customers = await this.customer.save(fakeCustomers)

    const fakeOrders = Array.from({ length: 3 }).map(() => ({
      status: ORDER_STATUS_ENUM[Math.floor((ORDER_STATUS_ENUM.length - 1) * Math.random())],
      customerId: customers[Math.floor((customers.length - 1) * Math.random())].id,
    }))
    const orders = await this.order.save(fakeOrders)

    const fakeOrderProducts = Array.from({ length: 8 }).map(() => ({
      orderId: orders[Math.floor((orders.length - 1) * Math.random())].id,
      productId: products[Math.floor((products.length - 1) * Math.random())].id,
    }))

    this.orderProduct.create(fakeOrderProducts)
    await this.orderProduct.save(fakeOrderProducts)

    return 'seeded!!'
  }
}
