import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import refreshConfig from './config/refresh.config';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import googleOauthConfig from './config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
    ConfigModule.forFeature(googleOauthConfig)
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService, 
    PrismaService, 
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy
  ],
})
export class AuthModule {}
