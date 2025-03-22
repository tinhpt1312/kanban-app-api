import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { PossibleAbilities } from 'src/shared/casl/casl-ability.factory';

export const CHECK_PERMISSION_KEY = 'check_permission_key';
export const CaslPermissions = (
  ...params: PossibleAbilities[]
): CustomDecorator => SetMetadata(CHECK_PERMISSION_KEY, params);
