import { Body, Controller, Post, UseGuards, Get, Req, ConflictException } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local.guard';
import type { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserInfoDTO } from './dto/create-user.dto';
import { isInstance } from 'class-validator';
import { EmailAlreadyExistsError } from './errors';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // User registration
    @Post('register')
    register(@Body() createUserInfoDTO: CreateUserInfoDTO) {
        try {
            const user = this.authService.register(createUserInfoDTO);
            return user; // object with non sensitive info
        } catch (e) {
            if (isInstance(e, EmailAlreadyExistsError)) {
                throw new ConflictException(e.message)
            }
            throw e;
        }
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Req() req: Request) {
        return req.user
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
    }

}
