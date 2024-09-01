// prettier-ignore
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity'
import { Order } from './OrderEntity'

@Entity({ name: 'customer' })
export class Customer extends BaseEntity {
  @Column()
  name: string

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[]
}
