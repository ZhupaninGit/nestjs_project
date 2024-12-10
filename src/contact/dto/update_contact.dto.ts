import { IsEmail, IsEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class UpdateContactDto{
    @IsOptional()
    @IsString()
    readonly name: string;


    @IsOptional()
    @IsPhoneNumber()
    readonly phone: string;

    @IsOptional()
    @IsEmail()
    readonly email: string;

    @IsEmpty()
    readonly user: User
}