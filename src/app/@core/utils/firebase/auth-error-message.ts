import { FirebaseError } from '@angular/fire/app';
import { AuthErrorCodes } from '@angular/fire/auth';
import {
  AuthErrorKey,
  AuthErrorMessages,
} from '@core/models/firebase-auth-error';

export function getAuthErrorMessage(
  error: FirebaseError,
  cases: AuthErrorMessages
): string {
  const keys = Object.keys(cases) as AuthErrorKey[];
  const keyError = keys.find(key => AuthErrorCodes[key] === error.code);

  if (keyError) {
    return cases[keyError] ?? error.message;
  }

  return error.message;
}
