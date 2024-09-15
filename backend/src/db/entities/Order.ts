// prettier-ignore
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseVendorEntity } from './BaseEntity'
import { Customer } from './Customer'
import { OrderProduct } from './OrderProduct'

// prettier-ignore
export const ORDER_STATUS_ENUM = ['draft', 'paid', 'packaging', 'shipped', 'completed', 'cancelled', 'refunded']

@Entity()
export class Order extends BaseVendorEntity {
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
