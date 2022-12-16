import { AuthService } from '@authentication/auth.service';
import { CurrentUser } from '@common/decorators';
import { UserEntity, UserRole } from '@common/entities/user.entity';
import { RefreshTokenGuard } from '@common/guards';
import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../user/user.service';
import { LoginRequestDto } from './models/login-request.dto';
import { RegisterRequestDto } from './models/register-request.dto';

import { SecurityService } from './security.service';
@Controller('security')
@ApiTags('security')
export class SecurityController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
    private readonly _securityService: SecurityService
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterRequestDto) {
    const userExists = await this._userService.findByUsername(dto.username);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    dto.password = await this._securityService.hashPassword(dto.password);

    const newUser = await this._userService.create(dto);
    const tokens = await this._authService.getTokens({
      email: dto.email,
      username: dto.username,
      role: UserRole.User,
    });

    await this._updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  @Post('login')
  async login(@Body() dto: LoginRequestDto) {
    const user = await this._userService.findByUsername(dto.username);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const isMatched = await this._securityService.verify(dto.password, user.password);

    if (!isMatched) {
      throw new BadRequestException('Password is incorrect');
    }

    const tokens = await this._authService.getTokens({
      username: user.username,
      email: user.email,
      role: user.role,
    });

    await this._updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshTokens(@CurrentUser() user: UserEntity) {
    const tokens = await this._authService.getTokens({
      email: user.email,
      username: user.username,
      role: user.role,
    });

    await this._updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private _updateRefreshToken(id: number, refreshToken: string) {
    return this._userService.update(id, { refreshToken });
  }
}
