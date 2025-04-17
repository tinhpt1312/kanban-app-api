import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/permission.dto';
import { Audit } from 'src/entities/audit';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async createPermission(permissionDto: CreatePermissionDto, userId: string) {
    const { subject, action } = permissionDto;

    const permissionEntities: Permission[] = [];

    for (const act of action) {
      const permission = new Permission();
      permission.subject = subject;
      permission.action = act;
      permission.isActive = true;
      permission.audit = {
        createdById: userId,
      } as Audit;
      permissionEntities.push(permission);
    }

    const savePermission =
      await this.permissionRepository.save(permissionEntities);

    return {
      message: 'Permission created successfully',
      data: savePermission.map((permission) => ({
        action: permission.action,
        subject: permission.subject,
      })),
    };
  }
}
