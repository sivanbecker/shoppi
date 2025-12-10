import { Injectable } from '@nestjs/common';
import { AuthPayloadDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserNameNotFoundError, PasswordNotFoundError } from './errors';

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

    constructor(private jwtService: JwtService) { }

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
}
