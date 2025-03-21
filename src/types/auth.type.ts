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
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum SubjectName {
  all = 'all',
  user = 'user',
  role = 'role',
  permission = 'permission',
}

export interface GoogleProfile {
  username: string;
  email: string;
  avatar: string;
  provider: string;
}

export enum UserCodeExpiration {
  REGISTER = 3 * 60 * 1000,
  RESET_PASSWORD = 2 * 60 * 1000,
}

export enum Provider {
  LOCAL = 'local',
  GOOGLE = 'google',
}
