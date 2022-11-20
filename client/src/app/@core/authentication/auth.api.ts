import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { defer, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  constructor(private readonly _auth: Auth) {}

  signIn(email: string, password: string): Observable<UserCredential> {
    const promise = signInWithEmailAndPassword(this._auth, email, password);
    return defer(() => from(promise));
  }

  signUpWithEmail(email: string, password: string): Observable<UserCredential> {
    const promise = createUserWithEmailAndPassword(this._auth, email, password);
    return defer(() => from(promise));
  }

  logout(): Observable<void> {
    const promise = signOut(this._auth);
    return defer(() => from(promise));
  }
}
