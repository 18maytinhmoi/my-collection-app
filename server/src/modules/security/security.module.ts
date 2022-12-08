import { Module } from '@nestjs/common';
import { AuthModule } from 'src/authentication/auth.module';
import { UserModule } from '../user/user.module';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
