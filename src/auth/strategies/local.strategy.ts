import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { isInstance } from "class-validator";
import { PasswordNotFoundError, UserNameNotFoundError } from "../errors";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    validate(username: string, password: string) {
        try {
            const user = this.authService.validateUser({ username, password });
            if (!user) throw new UnauthorizedException();
            return user;
        } catch (e) {
            if (isInstance(e, UserNameNotFoundError) || isInstance(e, PasswordNotFoundError)) {
                throw new UnauthorizedException(e.message)
            }
            throw e;
        }

    }
}