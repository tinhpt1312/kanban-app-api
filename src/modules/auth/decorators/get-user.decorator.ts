import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuth } from 'src/types';

export const GetUser = createParamDecorator(
  (data: keyof IAuth, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user;

    return data ? user?.[data] : user;
  },
);
