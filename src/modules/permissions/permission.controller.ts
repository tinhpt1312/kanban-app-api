import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePermissionDto } from './dto/permission.dto';
import { IRequestWithPayload, PermissionAction, SubjectName } from 'src/types';
import { CaslPermissions } from '../auth/decorators';

@Controller('permissions')
@ApiTags('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post()
  @CaslPermissions([PermissionAction.Create, SubjectName.permission])
  async createPermission(
    @Body(ValidationPipe) permissionDto: CreatePermissionDto,
    @Req() req: IRequestWithPayload,
  ) {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error('User ID is required');
    }

    return await this.permissionService.createPermission(permissionDto, userId);
  }
}
