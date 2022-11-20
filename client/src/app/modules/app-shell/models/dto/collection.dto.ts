import { CollectionEntity } from '../entities/collection.entity';
export type CollectionDto = Omit<CollectionEntity, 'id'>;
export type CreateCollectionDto = CollectionDto;
