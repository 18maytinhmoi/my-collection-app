import { SignInDto } from './sign-in.dto';

export interface SignUpDto extends SignInDto {
  firstName: string;
  lastName: string;
}
