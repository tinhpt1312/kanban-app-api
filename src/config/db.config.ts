import { DataSource } from 'typeorm';
import { ENV } from './env.config';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

config();

export default new DataSource({
  type: 'postgres',
  host: ENV.DATABASE.HOST,
  port: ENV.DATABASE.PORT,
  username: ENV.DATABASE.USERNAME,
  password: ENV.DATABASE.PASSWORD,
  database: ENV.DATABASE.DATABASE,
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  logging: false,
});

@Injectable()
export class PostgresConfiguration implements TypeOrmOptionsFactory {
  constructor() {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: ENV.DATABASE.HOST,
      port: ENV.DATABASE.PORT,
      username: ENV.DATABASE.USERNAME,
      password: ENV.DATABASE.PASSWORD,
      database: ENV.DATABASE.DATABASE,
      entities: ['src/**/entities/*.entity{.ts,.js}'],
      migrations: ['src/migrations/*{.ts,.js}'],
      logging: true,
      logger: 'advanced-console',
    };
  }
}
