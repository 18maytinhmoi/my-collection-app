import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export class BaseEntity {
  @PrimaryKey()
  id: number;

  @Property({ defaultRaw: 'current_timestamp' })
  createAt: Date = new Date();

  @Property({ defaultRaw: 'current_timestamp', onUpdate: () => new Date() })
  updateAt: Date = new Date();
}
