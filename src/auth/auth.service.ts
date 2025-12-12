import { Injectable } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserNameNotFoundError, PasswordNotFoundError, EmailAlreadyExistsError } from './errors';
import { CreateUserInfoDTO } from './dto/create-user.dto';
import { UserResponse } from './types';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';

const users = [{
    id: 1,
    username: 'sivan',
    password: 'sivanpass'
},
{
    id: 2,
    username: 'Benny',
    password: 'bennypass'
}
]
@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) { }

    validateUser(dataPayload: AuthPayloadDTO) {
        const foundUser = users.find((user) => user.username === dataPayload.username);
        if (!foundUser) {
            throw new UserNameNotFoundError(`Username ${dataPayload.username} does not exist.`);
        }
        const { password, ...user } = foundUser;
        if (dataPayload.password === foundUser.password) {
            return this.jwtService.sign(user);
        }
        throw new PasswordNotFoundError('Password does not match.');
    }
    private async emailIsUnique(email: string): Promise<Boolean> {
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw new EmailAlreadyExistsError(`Email already exists ${email}`)
        }
        return true;
    }
    async register(createUserInfoDTO: CreateUserInfoDTO): Promise<UserResponse | undefined> {
        // validate email does not already exist
        if (await this.emailIsUnique(createUserInfoDTO.email)) {
            try {
                // hash password
                const hash = await argon2.hash(createUserInfoDTO.password);
                // insert new User to DB
                const createdUser = await this.prisma.user.create({
                    data: { email: createUserInfoDTO.email, password: hash }
                })
                // return UserResponse 
                return {
                    id: createdUser.id,
                    email: createdUser.email,
                    createdAt: createdUser.createdAt
                }
            } catch (e) {
                throw new Error(`Failed creating new user ${e.message}`)
            }
        }
    }

}
