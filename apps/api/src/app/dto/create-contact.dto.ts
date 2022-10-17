import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly address: string;
    
    @IsString()
    @IsNotEmpty()    
    readonly phone: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}

