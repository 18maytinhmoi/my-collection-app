import { SignInDto } from '@core/models/dto';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInForm implements SignInDto {
  @IsNotEmpty()
  @IsEmail()
  public readonly username!: string;

  @IsNotEmpty()
  @MinLength(6)
  public readonly password!: string;
}

// export type SignInDto = SignInForm;
