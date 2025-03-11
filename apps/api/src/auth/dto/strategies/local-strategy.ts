import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email'
        })
    }

    validate(email: string, password: string) {
        return this.authService.validateLocalUser(email, password);
    }
}