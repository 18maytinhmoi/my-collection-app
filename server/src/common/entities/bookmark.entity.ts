import { Entity, ManyToOne, OptionalProps, Property } from '@mikro-orm/core';
import { BaseEntity } from '../utils/base.entity';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'bookmarks' })
export class BookmarkEntity extends BaseEntity {
  [OptionalProps]?: keyof BaseEntity;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  image: string;

  @Property()
  domain: string;

  @Property()
  url: string;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;
}
