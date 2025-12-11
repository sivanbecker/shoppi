import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { AuthService } from './auth.service'
import { isInstance } from 'class-validator';
import { PasswordNotFoundError, UserNameNotFoundError } from './errors';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Body() dataPayload: AuthPayloadDTO) {
        return this.authService.validateUser(dataPayload)
    }
}
