import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserInfoDTO {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(25, 50)
    password: string;

}