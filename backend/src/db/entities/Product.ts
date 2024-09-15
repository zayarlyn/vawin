// prettier-ignore
import { Column, Entity } from 'typeorm';
import { BaseVendorEntity } from './BaseEntity'

@Entity()
export class Product extends BaseVendorEntity {
  @Column({ type: 'double' })
  name: string

  @Column()
  price: number
}
