// prettier-ignore
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { OrderProduct } from './OrderProductEntity';

@Entity()
export class Order extends BaseEntity {
  @Column({ type: 'datetime' })
  date: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];
}
