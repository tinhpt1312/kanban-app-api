import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ENV } from 'src/config';
import { IAuth } from 'src/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request): string | null => {
          const tokenName = ENV.COOKIE?.ACCESS_TOKEN_NAME;
          if (request.cookies && tokenName) {
            return request.cookies[tokenName] || null;
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: ENV.JWT.SECRET || 'secret',
    });
  }

  validate(payload: IAuth): IAuth {
    return payload;
  }
}
