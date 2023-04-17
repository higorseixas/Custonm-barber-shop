import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

import authConfig from './config/auth';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
  imports: [
    HttpModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: authConfig.jwt.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}