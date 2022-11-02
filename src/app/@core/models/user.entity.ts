import { COLLECTIONS } from '@shared/constants/collections';
import { BaseEntity } from './base.entity';

export class UserEntity extends BaseEntity {
  private readonly _id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;

  constructor(id: string, data: any) {
    super();
    this._id = id;
    this.emailAddress = data.emailAddress;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }

  get id() {
    return this._id;
  }

  static getPath(id?: string): string {
    return COLLECTIONS.USERS + (id ? `/${id}` : '');
  }
}
