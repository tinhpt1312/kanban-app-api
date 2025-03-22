import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
  MongoQuery,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { IAuth, PermissionAction, SubjectName } from 'src/types';

export type PossibleAbilities = [PermissionAction, SubjectName];
type Conditions = MongoQuery;
export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: IAuth) {
    const { can, build } = new AbilityBuilder(
      createMongoAbility<PossibleAbilities, Conditions>,
    );

    const permissions = user.permissions || [];

    for (const permission of permissions) {
      can(permission.action, permission.subject);
    }

    return build();
  }
}
