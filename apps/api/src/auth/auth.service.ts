import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';
import { AuthJwtPayload } from './types/auth-jwt';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject(refreshConfig.KEY) private readonly refreshConfigConfiguration: ConfigType<typeof refreshConfig>
    ) {}

    async registerUser(body: CreateUserDto) {
        const user = await this.userService.findByEmail(body.email);
        if(user) throw new ConflictException('User already exists!');

        return this.userService.create(body);
    }

    async validateLocalUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if(!user) throw new UnauthorizedException('User not found');

        const isPasswordMatch = verify(user.password, password);
        if(!isPasswordMatch) throw new UnauthorizedException("Invalid Password");

        return { id: user.id, name: user.name };
    }

    async login(userId: number, name: string) {
        const { accessToken, refreshToken } = await this.generateTokens(userId);

        return {
            id: userId,
            name: name,
            accessToken,
            refreshToken
        }
    }

    async generateTokens(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshConfigConfiguration)
        ])

        return { accessToken, refreshToken };
    }

    async validateJwtUser(userId: number) {
        const user = await this.userService.findOne(userId);
        if(!user) throw new UnauthorizedException('User Not Found');
        const currentUser = { id: user.id };

        return currentUser;
    }

    async validateRefreshToken(userId: number) {
        const user = await this.userService.findOne(userId);
        if(!user) throw new UnauthorizedException('User Not Found');
        const currentUser = { id: user.id };

        return currentUser;
    }

    async refreshToken(userId: number, name: string) {
        const { accessToken, refreshToken } = await this.generateTokens(userId);

        return {
            id: userId,
            name: name,
            accessToken,
            refreshToken
        }
    }

    async validateGoogleUser(googleUser: CreateUserDto) {
        const user = await this.userService.findByEmail(googleUser.email);
        if(user) return user;
        return await this.userService.create(googleUser);
    }
}
