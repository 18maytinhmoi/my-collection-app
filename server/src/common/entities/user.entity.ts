import { BaseEntity } from './base.entity';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export class UserEntity extends BaseEntity {
  username: string;
  password: string;
  email: string;
  refreshToken?: string;
  role: UserRole;
  firstName: string;
  lastName: string;

  constructor() {
    super();
    this.role = UserRole.User;
  }
}
