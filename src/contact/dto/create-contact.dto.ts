import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

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
}