import { AuthConfig, InjectAuthConfig } from '@configs/index';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../jwt-payload';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @InjectAuthConfig() authConfig: AuthConfig,
    private _authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.jwtRefreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    console.log('test');
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    const user = await this._authService.validateUser(payload);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    if (refreshToken !== user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    return user;
  }
}
