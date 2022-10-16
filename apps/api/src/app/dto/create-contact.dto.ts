import { IsNotEmpty, IsString, IsEmail, MaxLength } from "class-validator";

export class CreateContactDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly address: string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    readonly phone: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}

