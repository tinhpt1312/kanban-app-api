import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Audit } from './audit';
import { PermissionRole } from './permission-role.entity';

@Entity({ name: 'roles', schema: 'public' })
export class Role {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    primaryKeyConstraintName: 'roles_pkey',
  })
  id!: string;

  @Column({
    name: 'name',
    type: 'character varying',
    length: 255,
    nullable: false,
  })
  name!: string;

  @OneToMany(() => User, (user) => user.role)
  user: User[];

  @Column(() => Audit, { prefix: false })
  audit: Audit;

  @OneToMany(() => PermissionRole, (permissionRole) => permissionRole.role)
  permissionRoles: PermissionRole[];
}
