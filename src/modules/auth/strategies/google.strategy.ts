import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { ENV } from 'src/config';
import { GoogleProfile } from 'src/types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    if (
      !ENV.GOOGLE.CLIENT_ID ||
      !ENV.GOOGLE.CLIENT_SECRET ||
      !ENV.GOOGLE.CALLBACK_URL
    ) {
      throw new Error('Missing required Google OAuth configuration');
    }

    super({
      clientID: ENV.GOOGLE.CLIENT_ID,
      clientSecret: ENV.GOOGLE.CLIENT_SECRET,
      callbackURL: ENV.GOOGLE.CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile,
    done: VerifyCallback,
  ) {
    const payload: GoogleProfile = {
      username: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0]?.value,
      provider: profile.provider,
    };

    return done(null, payload);
  }
}
