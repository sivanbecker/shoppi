import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthPayloadDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}