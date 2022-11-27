import { Module } from '@nestjs/common';
import { AuthModule } from 'src/authentication/auth.module';
import { UserModule } from '../user/user.module';
import { SecurityController } from './security.controller';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [SecurityController],
})
export class SecurityModule {}
