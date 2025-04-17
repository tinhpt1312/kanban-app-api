import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionRole, Role } from 'src/entities';
import { IsNull, Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { isBuffer } from 'util';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(PermissionRole)
    private readonly permissionRoleRepository: Repository<PermissionRole>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto, userId: string) {
    const { name, permissionIds } = createRoleDto;

    const { id: roleId } = await this.roleRepository.save(
      this.roleRepository.create({
        name,
        audit: {
          createdById: userId,
        },
      }),
    );

    if (permissionIds && permissionIds.length > 0) {
      const permissionRoles = permissionIds.map((permissionId) => ({
        permissionId,
        roleId,
      }));

      await this.permissionRoleRepository.insert(permissionRoles);
    }

    return {
      message: 'create role is successfully',
    };
  }

  async getRoleById(roleId: string) {
    const role = this.roleRepository.findOne({
      where: { id: roleId, audit: { deletedAt: IsNull() } },
    });

    if (!role) {
      throw new NotFoundException('role not found');
    }

    return role;
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto, userId: string) {
    const { name, permissionIds } = updateRoleDto;
    const role = await this.getRoleById(id);

    await this.permissionRoleRepository.delete({ roleId: id });

    if (permissionIds && permissionIds.length > 0) {
      const permissionRoles = permissionIds.map((permissionId) => ({
        permissionId,
        roleId: id,
      }));

      await this.permissionRoleRepository.insert(permissionRoles);
    }

    return this.roleRepository.save({
      ...role,
      name,
      audit: {
        updatedById: userId,
      },
    });
  }
}
