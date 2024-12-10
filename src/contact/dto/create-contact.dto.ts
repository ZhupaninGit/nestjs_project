import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class CreateContactDto{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phone: string;

    @IsOptional()
    @IsEmail()
    readonly email: string;

    @IsEmpty()
    readonly user: User
}