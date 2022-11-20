import { AuthErrorCodes } from '@angular/fire/auth';

export type AuthErrorKey = keyof typeof AuthErrorCodes;

export type AuthErrorMessages = Partial<{
  [key in keyof typeof AuthErrorCodes]: string;
}>;
