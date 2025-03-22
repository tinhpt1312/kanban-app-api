import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AppAbility,
  CaslAbilityFactory,
  PossibleAbilities,
} from 'src/shared/casl/casl-ability.factory';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { CHECK_PERMISSION_KEY } from '../decorators/casl.decorator';
import { IRequestWithPayload, PermissionAction, SubjectName } from 'src/types';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const requiredPermissions = this.reflector.get<
      PossibleAbilities[] | undefined
    >(CHECK_PERMISSION_KEY, context.getHandler()) ?? [
      [PermissionAction.MANAGE, SubjectName.all],
    ];

    const { user } = context.switchToHttp().getRequest<IRequestWithPayload>();

    if (user == null) {
      return false;
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    return requiredPermissions.every((permission) =>
      this.isAllowed(ability, permission),
    );
  }

  private isAllowed(
    ability: AppAbility,
    permission: PossibleAbilities,
  ): boolean {
    return ability.can(...permission);
  }
}
