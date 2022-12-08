import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthService } from 'src/authentication/auth.service';
import { CurrentUser } from 'src/common/decorators/requests/current-user.decorater';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { Users } from 'src/xata';
import { UserService } from '../user/user.service';
import { LoginRequestDto } from './models/request/login-request.dto';
import { RegisterRequestDto } from './models/request/register-request.dto';
import { SecurityService } from './security.service';
@Controller('security')
export class SecurityController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
    private readonly _securityService: SecurityService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterRequestDto) {
    const userExists = await this._userService.findByUsername(dto.username);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    dto.password = await this._securityService.hashPassword(dto.password);

    const newUser = await this._userService.create(dto);
    const tokens = await this._authService.getTokens(dto);

    await this._updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  @Post('login')
  async login(@Body() dto: LoginRequestDto) {
    const user = await this._userService.findByUsername(dto.username);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const isMatched = await this._securityService.verify(
      dto.password,
      user.password,
    );

    if (!isMatched) {
      throw new BadRequestException('Password is incorrect');
    }

    const tokens = await this._authService.getTokens({
      username: user.username,
      email: user.email,
    });

    await this._updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshTokens(@CurrentUser() user: Users) {
    const tokens = await this._authService.getTokens({
      email: user.email,
      username: user.username,
    });

    await this._updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private _updateRefreshToken(id: string, refreshToken: string) {
    return this._userService.update(id, { refreshToken });
  }
}
