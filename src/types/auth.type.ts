import { Request } from 'express';

export interface IAuth {
  id: string;
  roleId?: string;
  permissions?: Array<{ action: PermissionAction; subject: SubjectName }>;
}

export interface IRequestWithPayload extends Request {
  user?: IAuth;
}

export enum PermissionAction {
  Manage = 'manage',
  Read = 'read',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export enum SubjectName {
  all = 'all',
  user = 'user',
  role = 'role',
  permission = 'permission',
  board = 'board',
  list = 'list',
  card = 'card',
  comment = 'comment',
  attachment = 'attachment',
}

export interface GoogleProfile {
  username: string;
  email: string;
  avatar: string;
  provider: string;
}

export enum UserCodeType {
  REGISTER = 'register',
  RESET_PASSWORD = 'reset_password',
}

export enum UserCodeExpiration {
  REGISTER = 3 * 60 * 1000,
  RESET_PASSWORD = 2 * 60 * 1000,
}

export enum Provider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

export enum RoleEnum {
  ADMIN = '1',
  USER = '2',
}
