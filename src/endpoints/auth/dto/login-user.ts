import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class loginData {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Пароль должен состоять минимум из 8 символов' })
    @MaxLength(32, { message: 'Пароль не должен длиннее 32-ух символов' })
    password: string
}

export class generateToken {
    email: string
    id:number
}