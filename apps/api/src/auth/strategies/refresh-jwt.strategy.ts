import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import type { AuthJwtPayload } from "../types/auth-jwt";
import { AuthService } from "../auth.service";
import refreshConfig from "../config/refresh.config";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
    constructor(
        @Inject(refreshConfig.KEY) private refreshJwtConfiguration: ConfigType<typeof refreshConfig>,
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            secretOrKey: refreshJwtConfiguration.secret!,
            ignoreExpiration: false
        })
    }

    validate(payload: AuthJwtPayload) {
        const userId = payload.sub;
        return this.authService.validateRefreshToken(userId);
    }
}