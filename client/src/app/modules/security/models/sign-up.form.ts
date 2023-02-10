import { SignInDto } from '@core/models/dto';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpForm implements SignInDto {
  @IsNotEmpty()
  public readonly firstName!: string;

  @IsNotEmpty()
  public readonly lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  public readonly username!: string;

  @IsNotEmpty()
  @MinLength(6)
  public readonly password!: string;

  @IsNotEmpty()
  @MinLength(6)
  public readonly passwordConfirm!: string;
}
