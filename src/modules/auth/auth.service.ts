import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { PermissionRole, User, UserCode } from 'src/entities';
import { comparePassword, hashPassword } from 'src/shared/utils';
import {
  GoogleProfile,
  IAuth,
  PermissionAction,
  Provider,
  RoleEnum,
  SubjectName,
  UserCodeExpiration,
  UserCodeType,
} from 'src/types';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { ACCESS_TOKEN_COOKIE_NAME, COOKIE_OPTIONS } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { ENV } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserCode)
    private readonly userCodeRepository: Repository<UserCode>,
    @InjectRepository(PermissionRole)
    private readonly permissionRoleRepository: Repository<PermissionRole>,
    private readonly jwtService: JwtService,
  ) {}

  private async generateCode(type: UserCodeType) {
    const verifyCode = Math.random().toString().slice(2, 8);
    const expirationTime =
      type === UserCodeType.REGISTER
        ? UserCodeExpiration.REGISTER
        : UserCodeExpiration.RESET_PASSWORD;

    const expiredAt = dayjs().add(expirationTime, 'seconds').format();

    return { code: verifyCode, expiredAt };
  }

  private async generatePayload(id: string, roleId: string): Promise<IAuth> {
    const permissionRoles = await this.permissionRoleRepository
      .createQueryBuilder('pr')
      .leftJoinAndSelect('pr.permission', 'p', 'p.audit.deletedAt IS NULL')
      .where('pr.roleId = :roleId', { roleId })
      .getMany();

    return {
      id,
      roleId,
      permissions: permissionRoles.map(({ permission }) => ({
        action: permission.action as PermissionAction,
        subject: permission.subject as SubjectName,
      })),
    };
  }

  private signToken(payload: IAuth) {
    return this.jwtService.sign(payload, {
      expiresIn: ENV.JWT.EXPIRES,
      secret: ENV.JWT.SECRET || 'kanban-secret-key',
    });
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;
    const existingUser = await this.userRepository
      .createQueryBuilder('u')
      .where('u.audit.deletedAt IS NULL')
      .where('u.email = :email', { email })
      .getOne();

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await this.userRepository.save(
      this.userRepository.create({
        username,
        email,
        password: hashedPassword,
        emailVerified: false,
        provider: Provider.LOCAL,
        roleId: RoleEnum.USER,
      }),
    );

    const { code, expiredAt } = await this.generateCode(UserCodeType.REGISTER);

    await this.userCodeRepository.save({
      userId: newUser.id,
      code,
      expiredAt,
      type: UserCodeType.REGISTER,
    });

    return {
      message:
        'Create user is successfully! Please checking email to verify your account',
      data: newUser.id,
    };
  }

  async login(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;
    const user = await this.userRepository
      .createQueryBuilder('u')
      .where('u.audit.deletedAt IS NULL')
      .where('u.email = :email', { email })
      .getOne();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!user.emailVerified) {
      throw new HttpException(
        {
          message: 'Please verify your email before login',
          userId: user.id,
          email: user.email,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const payload = await this.generatePayload(user.id, user.roleId);

    const token = this.signToken(payload);
    res.cookie(ACCESS_TOKEN_COOKIE_NAME || 'kanban', token, COOKIE_OPTIONS);

    return {
      message: 'Login successfully',
      data: token,
    };
  }

  async logout(res: Response) {
    res.clearCookie(
      ACCESS_TOKEN_COOKIE_NAME || 'kanban-access-token',
      COOKIE_OPTIONS,
    );
    return {
      message: 'Logout successfully',
    };
  }

  async googleLoginCallback(req: Request, res: Response) {
    const { email, avatar, provider, username } = req.user as GoogleProfile;

    const user = await this.userRepository
      .createQueryBuilder('u')
      .where('u.email = :email', { email })
      .getOne();

    const roleId = user ? user.roleId : RoleEnum.USER;

    try {
      const userId = user
        ? user.id
        : (
            await this.userRepository.save(
              this.userRepository.create({
                email,
                username,
                avatar,
                provider,
                roleId,
                emailVerified: true,
              }),
            )
          ).id;

      const payload = await this.generatePayload(userId, roleId);

      const token = this.signToken(payload);
      res.cookie(
        ACCESS_TOKEN_COOKIE_NAME || 'kanban-access-token',
        token,
        COOKIE_OPTIONS,
      );
      const redirectUrl = ENV.URL.REDIRECT || 'not found';

      res.redirect(redirectUrl);
    } catch (error) {
      throw new HttpException(
        `Failed to login by google: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
