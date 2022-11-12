import { BaseEntity } from '@core/models/base.entity';
import { FIREBASE_COLLECTIONS } from '@shared/constants/collections';
import { CollectionDto } from '../dto/collection.dto';

export class CollectionEntity extends BaseEntity {
  private readonly _id: string;
  name: string;
  icon: string;
  color: string;

  constructor(id: string, data: CollectionDto) {
    super();
    this._id = id;
    this.name = data.name;
    this.icon = data.icon;
    this.color = data.color;
  }
  get id() {
    return this._id;
  }
  static getPath(userId: string, id?: string): string {
    return (
      `${FIREBASE_COLLECTIONS.COLLECTIONS}/${userId}/${FIREBASE_COLLECTIONS.COLLECTIONS}` +
      (id ? `/${id}` : '')
    );
  }
}
