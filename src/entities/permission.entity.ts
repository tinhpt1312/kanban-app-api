import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Audit } from './audit';
import { PermissionRole } from './permission-role.entity';

@Entity({ name: 'permissions', schema: 'public' })
export class Permission {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'permissions_pkey',
  })
  id!: string;

  @Column({
    name: 'action',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  action!: string;

  @Column({
    name: 'subject',
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  subject!: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: false,
  })
  isActive!: boolean;

  @Column(() => Audit, { prefix: false })
  audit: Audit;

  // Relations
  @OneToMany(
    () => PermissionRole,
    (permissionRole) => permissionRole.permission,
  )
  permissionRoles: PermissionRole[];
}
