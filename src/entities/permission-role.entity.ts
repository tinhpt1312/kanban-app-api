import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity({ name: 'permissions_roles', schema: 'public' })
export class PermissionRole {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'permissions_roles_pkey',
  })
  id!: string;

  @Column({ name: 'role_id', type: 'bigint', nullable: false })
  roleId!: string;

  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_permissions_roles_role_id',
  })
  @ManyToOne(() => Role, (role) => role.permissionRoles)
  role: Role;

  @Column({ name: 'permission_id', type: 'bigint', nullable: false })
  permissionId!: string;

  @ManyToOne(() => Permission, (permission) => permission.permissionRoles)
  @JoinColumn({
    name: 'permission_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_permissions_roles_permission_id',
  })
  permission: Permission;
}
