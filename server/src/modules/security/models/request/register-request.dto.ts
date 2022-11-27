import { LoginRequestDto } from './login-request.dto';

export class RegisterRequestDto extends LoginRequestDto {
  email!: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  avatarUrl?: string;
}
