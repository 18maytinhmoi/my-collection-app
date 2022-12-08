import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { AuthConfig, InjectAuthConfig } from 'src/configs/auth.config';

@Injectable()
export class SecurityService {
  constructor(
    @InjectAuthConfig()
    private readonly _authConfig: AuthConfig,
  ) {}

  async hashPassword(password: string) {
    const salt = await genSalt(this._authConfig.jwtSalt);
    return await hash(password, salt);
  }

  async verify(password: string, encrypted: string) {
    return await compare(password, encrypted);
  }
}
