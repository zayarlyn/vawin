// prettier-ignore
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity'

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'double' })
  name: string

  @Column()
  price: number
}
