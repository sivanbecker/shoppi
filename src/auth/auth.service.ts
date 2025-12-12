import { Injectable } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailNotFoundError, PasswordDontMatchError, EmailAlreadyExistsError } from './errors';
import { CreateUserInfoDTO } from './dto/create-user.dto';
import { UserResponse } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';


@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) { }

    async validateUser(dataPayload: AuthPayloadDTO): Promise<string> {
        const foundUser = await this.prisma.user.findUnique({ where: { email: dataPayload.email } })
        if (!foundUser) {
            throw new EmailNotFoundError(`Email ${dataPayload.email} does not exist.`);
        }
        const { password, ...user } = foundUser;
        if (await argon2.verify(foundUser.password, dataPayload.password)) {

            return this.jwtService.sign(user);
        }
        throw new PasswordDontMatchError('Password does not match.');
    }

    private async validateEmailIsUnique(email: string): Promise<void> {
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw new EmailAlreadyExistsError(`Email already exists ${email}`)
        }
    }

    private async hashPassword(password: string): Promise<string> {
        return await argon2.hash(password)
    }

    async register(createUserInfoDTO: CreateUserInfoDTO): Promise<UserResponse> {
        // validate email does not already exist
        await this.validateEmailIsUnique(createUserInfoDTO.email)
        // insert new User to DB
        const createdUser = await this.prisma.user.create({
            data: {
                email: createUserInfoDTO.email,
                password: await this.hashPassword(createUserInfoDTO.password)
            }
        })
        // return UserResponse 
        return {
            id: createdUser.id,
            email: createdUser.email,
            createdAt: createdUser.createdAt

        }
    }

}
