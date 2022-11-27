import { Controller } from '@nestjs/common';

@Controller('security')
export class SecurityController {
    @Post('register')
    async register(@Body() dto: RegisterParamsDto): Promise<void> {
        return await this.securityService.register(dto);
      }
    
}
