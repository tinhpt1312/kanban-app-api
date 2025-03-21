import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Audit } from './audit';
import { UserCodeExpiration } from 'src/types/auth.type';
import dayjs from 'dayjs';

@Entity({ name: 'user_codes', schema: 'public' })
export class UserCode {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'pk_user_codes_id',
  })
  id!: string;

  @Column({ name: 'user_id', type: 'bigint', nullable: false })
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_codes_user_id',
  })
  user!: User;

  @Column({ name: 'code', type: 'varchar', length: '6', nullable: false })
  code!: string;

  @Column({ name: 'type', type: 'varchar', length: '50', nullable: false })
  type!: string;

  @Column({
    name: 'used_at',
    type: 'timestamp without time zone',
    nullable: true,
  })
  usedAt?: Date;

  @Column({
    name: 'expired_at',
    type: 'timestamp without time zone',
    nullable: false,
  })
  expiredAt!: Date;

  @Column(() => Audit, { prefix: false })
  audit: Audit;

  @BeforeInsert()
  beforeInsert() {
    const expirationTime =
      UserCodeExpiration[this.type as keyof typeof UserCodeExpiration] ||
      UserCodeExpiration.REGISTER;

    this.expiredAt = new Date(Date.now() + expirationTime);
  }

  isExpired(): boolean {
    return dayjs().isAfter(this.expiredAt);
  }
}
