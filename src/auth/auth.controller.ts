import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { AuthService } from './auth.service'
import { isIn, isInstance } from 'class-validator';
import { PasswordNotFoundError, UserNameNotFoundError } from './errors';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    // login
    @Post('login')
    login(@Body() dataPayload: AuthPayloadDTO) {
        try {
            return this.authService.validateUser(dataPayload)
        } catch (e) {
            if (isInstance(e, UserNameNotFoundError) || isInstance(e, PasswordNotFoundError)) {
                throw new UnauthorizedException(e.message)
            }

        }

    }
    //
}
