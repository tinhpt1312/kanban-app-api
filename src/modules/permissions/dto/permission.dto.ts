import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PermissionAction } from 'src/types';

export class CreatePermissionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Permission subject required' })
  subject!: string;

  @ApiProperty()
  @IsArray()
  @IsEnum(PermissionAction, { each: true })
  action!: PermissionAction[];
}
