import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { AuthConfig, InjectAuthConfig } from 'src/configs/auth.config';
import { UserService } from 'src/modules/user/user.service';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectAuthConfig()
    private readonly _authConfig: AuthConfig,
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async getTokens(payload: JwtPayload) {
    const createAccessToken = this._jwtService.signAsync(payload, {
      secret: this._authConfig.jwtSecret,
      expiresIn: this._authConfig.jwtExpired,
    });

    const createRefreshToken = this._jwtService.signAsync(payload, {
      secret: this._authConfig.jwtRefreshSecret,
      expiresIn: this._authConfig.jwtRefreshExpired,
    });

    const [accessToken, refreshToken] = await Promise.all([
      createAccessToken,
      createRefreshToken,
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(payload: JwtPayload) {
    const user = await this._userService.findOne(payload.username);
    if (user && user.email === payload.email) {
      return user;
    }
    return null;
  }

  async hashPassword(password: string) {
    const salt = await genSalt(this._authConfig.jwtSalt);
    return await hash(password, salt);
  }

  async verify(password: string, encrypted: string) {
    return await compare(password, encrypted);
  }
}
