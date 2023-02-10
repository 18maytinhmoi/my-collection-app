import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  OptionalProps,
  Property,
  Unique
} from '@mikro-orm/core';
import { BaseEntity } from '../utils/base.entity';
import { CollectionEntity } from './collection.entity';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

@Entity({ tableName: 'users' })
export class UserEntity extends BaseEntity {
  [OptionalProps]?: keyof BaseEntity;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  username: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  @Unique()
  email?: string;

  @Property({ nullable: true })
  refreshToken?: string;

  @Enum({ items: () => UserRole, default: UserRole.User })
  role: UserRole;

  @OneToMany(() => CollectionEntity, book => book.user)
  collections = new Collection<CollectionEntity>(this);
}
