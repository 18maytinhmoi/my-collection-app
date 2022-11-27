import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConfig, InjectAuthConfig } from 'src/configs/auth.config';
import { UserService } from 'src/modules/user/user.service';
import { JwtPayload } from './JwtPayload';

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
}
