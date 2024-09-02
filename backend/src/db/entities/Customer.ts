// prettier-ignore
import { Entity, OneToMany } from 'typeorm';
import { BaseAuthUserEntity } from './BaseAuthUserEntity'
import { Order } from './Order'

@Entity({ name: 'customer' })
export class Customer extends BaseAuthUserEntity {
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]
}
