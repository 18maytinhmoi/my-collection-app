import { Entity, ManyToOne, OptionalProps, Property } from '@mikro-orm/core';
import { BaseEntity } from '../utils/base.entity';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'collections' })
export class CollectionEntity extends BaseEntity {
  [OptionalProps]?: keyof BaseEntity;

  @Property()
  name: string;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;
}
