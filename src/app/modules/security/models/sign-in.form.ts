import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInForm {
  @IsNotEmpty()
  @IsEmail()
  public readonly email!: string;

  @IsNotEmpty()
  @MinLength(6)
  public readonly password!: string;
}

// export type SignInDto = SignInForm;
