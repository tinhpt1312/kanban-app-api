import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Audit } from './audit';
import { Role } from './role.entity';
import { CardMember } from './card-member.entity';
import { BoardMember } from './board-member.entity';

@Entity({ name: 'users', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'users_pkey',
  })
  id!: string;

  @Column({
    name: 'email',
    type: 'character varying',
    length: 255,
    nullable: false,
  })
  email!: string;

  @Column({
    name: 'username',
    type: 'character varying',
    length: 255,
    nullable: false,
  })
  username!: string;

  @Column({
    name: 'provider',
    type: 'character varying',
    length: 255,
    nullable: false,
  })
  provider!: string;

  @Column({
    name: 'avatar',
    type: 'character varying',
    length: 255,
    nullable: true,
  })
  avatar!: string;

  @Column({
    name: 'email_verified',
    type: 'boolean',
    default: false,
  })
  emailVerified!: boolean;

  @Column({
    name: 'password',
    type: 'character varying',
    length: 255,
    nullable: true,
  })
  password!: string;

  @Column({ name: 'role_id', type: 'bigint', nullable: true })
  roleId!: string;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_users_role_id',
  })
  role!: Role;

  @OneToMany(() => CardMember, (cardMember) => cardMember.user)
  cardMembers: CardMember[];

  @OneToMany(() => BoardMember, (boardMember) => boardMember.user)
  boardMembers: BoardMember[];

  @Column(() => Audit, { prefix: false })
  audit: Audit;
}
