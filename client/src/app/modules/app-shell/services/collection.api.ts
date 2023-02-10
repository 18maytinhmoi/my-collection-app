import { Injectable } from '@angular/core';

@Injectable()
export class CollectionApi {
  constructor() {}

  // getAll(uid: string): Observable<CollectionEntity[]> {
  //   const collectionRef = collection(this._store, CollectionEntity.getPath(uid));
  //   return collectionData(collectionRef, { idField: 'id' }).pipe(
  //     map(data => data as CollectionEntity[]),
  //     map(data => data.map(item => new CollectionEntity(item.id, item))),
  //     take(1)
  //   );
  // }

  // create(uid: string, dto: CreateCollectionDto) {
  //   const documentRef = doc(this._store, CollectionEntity.getPath(uid));
  //   const promise = setDoc(documentRef, dto);
  //   return defer(() => from(promise)).pipe(
  //     map(() => new CollectionEntity(documentRef.id, dto))
  //   );
  // }

  // create(userId: string);
}
