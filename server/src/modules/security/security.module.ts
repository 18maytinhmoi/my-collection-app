import { AuthModule } from '@authentication/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
