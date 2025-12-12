import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { isInstance } from "class-validator";
import { PasswordDontMatchError, EmailNotFoundError } from "../errors";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super(
            {
                usernameField: 'email',
                passwordField: 'password'

            }
        );
    }

    async validate(email: string, password: string) {
        try {
            const user = await this.authService.validateUser({ email, password });
            if (!user) throw new UnauthorizedException();
            return user;
        } catch (e) {
            if (isInstance(e, EmailNotFoundError) || isInstance(e, PasswordDontMatchError)) {
                throw new UnauthorizedException(e.message)
            }
            throw e;
        }

    }
}