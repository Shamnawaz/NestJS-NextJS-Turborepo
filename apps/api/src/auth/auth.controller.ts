import { 
  Body,
  Controller, 
  Post, 
  Req, 
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registerUser(@Body() body: CreateUserDto) {
    return this.authService.registerUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Req() req) {
    return this.authService.login(req.user.id, req.user.name);
  }

}
