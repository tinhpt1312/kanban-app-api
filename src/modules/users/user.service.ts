import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getMe(userId: string) {
    const user = await this.userRepository
      .createQueryBuilder('u')
      .select([
        'u.id',
        'u.username',
        'u.email',
        'u.avatar',
        'u.provider',
        'u.password',
      ])
      .leftJoin('u.role', 'r')
      .addSelect(['r.id', 'r.name'])
      .where('u.audit.deletedAt IS NULL AND u.id = :userId', { userId })
      .getOne();

    return user;
  }
}
