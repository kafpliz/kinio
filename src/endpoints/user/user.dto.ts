import { IsEmail, IsNotEmpty, IsOptional, IsString, Max, MAX, MaxLength, Min, MinLength } from "class-validator"

export class userDTO {
    @IsString()
    name?: string
    @IsString()
    lastName?: string
    @IsOptional()
    @IsString()
    photoUrl?: string
    @IsString()
    public?:string
    @IsNotEmpty()
    @IsEmail()
    email?:string

    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'Пароль должен состоять минимум из 8 символов'})
    @MaxLength(32, {message: 'Пароль не должен длиннее 32-ух символов'})
    password?:string

    photo?:File


}