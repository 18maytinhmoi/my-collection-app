export class BaseEntity {
  id: string;
  createTime = new Date();
  updateTime = new Date();
}

export type BaseKeys = keyof BaseEntity;
