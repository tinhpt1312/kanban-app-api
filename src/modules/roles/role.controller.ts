import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IRequestWithPayload, PermissionAction, SubjectName } from 'src/types';
import { CaslPermissions } from '../auth/decorators';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller('role')
@ApiTags('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @CaslPermissions([PermissionAction.Create, SubjectName.role])
  async createRole(
    @Body() createRoleDto: CreateRoleDto,
    @Req() req: IRequestWithPayload,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error('User ID is required');
    }

    return this.roleService.createRole(createRoleDto, userId);
  }

  @Patch(':id')
  @CaslPermissions([PermissionAction.Update, SubjectName.role])
  async updateRole(
    @Body() updateRoleDto: UpdateRoleDto,
    @Req() req: IRequestWithPayload,
    @Param('id', ParseIntPipe) id: string,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error('User ID is required');
    }

    return this.roleService.updateRole(id, updateRoleDto, userId);
  }
}
