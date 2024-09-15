import { Column, Entity } from 'typeorm'
import { BaseVendorEntity } from './BaseEntity'

@Entity()
export class BaseAuthUserEntity extends BaseVendorEntity {
  @Column()
  name: string

  @Column({ name: 'user_id' })
  userId: string

  @Column()
  phone: string

  @Column()
  email: string

  @Column({ type: 'datetime', name: 'email_verified_at' })
  emailVerifiedAt: Date

  @Column({ type: 'datetime', name: 'phone_verified_at' })
  phoneVerifiedAt: Date
}
