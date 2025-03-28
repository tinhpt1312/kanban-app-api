import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { IsNull, Repository } from 'typeorm';
import { RegisterDto } from './dto/auth.dto';
import { Provider, RoleEnum } from 'src/types';
import { hashPassword } from 'src/shared/utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;
    const existingUser = await this.userRepository
      .createQueryBuilder('u')
      .where('u.audit.deletedAt IS NULL')
      .where('u.email = :email', { email })
      .getOne();

    if (!existingUser?.emailVerified) {
      throw new HttpException(
        'User not verified. Please checking email verified',
        HttpStatus.BAD_REQUEST,
      );
    }

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

    return {
      message:
        'Create user is successfully! Please checking email to verify your account',
      data: newUser,
    };
  }
}
