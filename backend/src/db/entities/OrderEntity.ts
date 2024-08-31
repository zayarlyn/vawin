// prettier-ignore
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity'
import { OrderProduct } from './OrderProductEntity'

// prettier-ignore
export const ORDER_STATUS_ENUM = ['draft', 'paid', 'packaging', 'shipped', 'completed', 'cancelled', 'refunded']

@Entity()
export class Order extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ORDER_STATUS_ENUM,
  })
  status: string

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[]
}
