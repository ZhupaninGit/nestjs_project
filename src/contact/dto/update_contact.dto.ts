import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

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
}