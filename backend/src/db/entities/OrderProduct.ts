// prettier-ignore
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity'
import { Order } from './Order'
import { Product } from './Product'

@Entity({ name: 'order_product' })
export class OrderProduct extends BaseEntity {
  @Column({ name: 'order_id' })
  orderId: number

  @Column({ name: 'product_id' })
  productId: number

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product

  // FIXME: why can use both @ManyToOne and @OneToOne?
  // @OneToOne(() => Product)
  // @JoinColumn({ name: 'product_id' })
  // product: Product;
}
