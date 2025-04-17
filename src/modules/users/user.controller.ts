import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { IRequestWithPayload } from 'src/types';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getMe(@Req() req: IRequestWithPayload) {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error('User ID is required');
    }

    return this.userService.getMe(userId);
  }
}
