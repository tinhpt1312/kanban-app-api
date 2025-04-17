import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRole, User, UserCode } from 'src/entities';
import { AuthController } from './auth.controller';
import { GoogleStrategy, JwtStrategy } from './strategies';
import { CaslAbilityFactory } from 'src/shared/casl/casl-ability.factory';
import { APP_GUARD } from '@nestjs/core';
import { CaslGuard, JwtAuthGuard } from './guards';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PermissionRole, UserCode]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    CaslAbilityFactory,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CaslGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
