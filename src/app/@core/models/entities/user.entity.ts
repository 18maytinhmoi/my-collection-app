import { FIREBASE_COLLECTIONS } from '@shared/constants/collections';
import { BaseEntity } from '../base.entity';
import { UserDto } from '../dto/user.dto';

export class UserEntity extends BaseEntity {
  private readonly _id: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(id: string, data: UserDto) {
    super();
    this._id = id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }

  get id() {
    return this._id;
  }

  static getPath(id?: string): string {
    return FIREBASE_COLLECTIONS.USERS + (id ? `/${id}` : '');
  }
}
