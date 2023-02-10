import { CollectionDto } from '../dto/collection.dto';

export class CollectionEntity {
  private readonly _id: string;
  name: string;
  iconKey: string;
  color: string;

  constructor(id: string, data: CollectionDto) {
    this._id = id;
    this.name = data.name;
    this.iconKey = data.iconKey;
    this.color = data.color;
  }
  get id() {
    return this._id;
  }
}
