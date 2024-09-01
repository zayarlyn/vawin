// prettier-ignore
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity'
import { OrderProduct } from './OrderProductEntity'
import { Customer } from './CustomerEntity'

// prettier-ignore
export const ORDER_STATUS_ENUM = ['draft', 'paid', 'packaging', 'shipped', 'completed', 'cancelled', 'refunded']

@Entity()
export class Order extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ORDER_STATUS_ENUM,
  })
  status: string

  @Column({ name: 'customer_id' })
  customerId: number

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[]

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer
}
