import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

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
}
