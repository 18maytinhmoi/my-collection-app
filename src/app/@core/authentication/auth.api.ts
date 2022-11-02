import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { UserEntity } from '@core/models/user.entity';
import { checkIfDataNull } from '@core/utils/rx/check-data-null';
import { defer, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  constructor(
    private readonly _auth: Auth,
    private readonly _store: Firestore
  ) {}

  signIn(email: string, password: string) {
    const promise = signInWithEmailAndPassword(this._auth, email, password);
    return defer(() => from(promise));
  }

  createUserProfile(uid: string, entity: UserEntity): Observable<UserEntity> {
    const documentRef = doc(this._store, UserEntity.getPath(uid));
    const promise = setDoc(documentRef, entity);
    return defer(() => from(promise)).pipe(
      map(data => new UserEntity(documentRef.id, data))
    );
  }

  getUserProfile(uid: string): Observable<UserEntity> {
    const documentRef = doc(this._store, UserEntity.getPath(uid));
    return docData(documentRef).pipe(
      checkIfDataNull('user profile null'),
      map(data => new UserEntity(documentRef.id, data))
    );
  }
}
