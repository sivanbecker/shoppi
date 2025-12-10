import { IsNotEmpty, IsString } from 'class-validator';

export class AuthPayloadDTO {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}