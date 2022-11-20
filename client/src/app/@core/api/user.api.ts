import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { CreateUserDto, UserDto } from '@core/models/dto/user.dto';
import { UserEntity } from '@core/models/entities/user.entity';
import { defer, from, map, Observable, take } from 'rxjs';

import { checkIfDataNull } from '@core/utils/rx/check-data-null';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  constructor(private readonly _store: Firestore) {}

  create(uid: string, dto: CreateUserDto): Observable<UserEntity> {
    const documentRef = doc(this._store, UserEntity.getPath(uid));
    const promise = setDoc(documentRef, dto);
    return defer(() => from(promise)).pipe(
      map(() => new UserEntity(documentRef.id, dto))
    );
  }

  get(uid: string): Observable<UserEntity> {
    const documentRef = doc(this._store, UserEntity.getPath(uid));
    return docData(documentRef).pipe(
      checkIfDataNull('user profile null'),
      map(data => data as UserDto),
      map(data => new UserEntity(documentRef.id, data)),
      take(1)
    );
  }
}
