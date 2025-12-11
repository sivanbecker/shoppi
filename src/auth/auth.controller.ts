import { Body, Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local.guard';
import type { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

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
