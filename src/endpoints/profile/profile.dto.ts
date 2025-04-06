import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class editProfileDTO {

    @IsString()
    @IsOptional()
    @MinLength(1, {message: 'Имя должно состоять минимум из 1-го символа.'})
    @MaxLength(30, {message: 'Фамилия не должна превышать длинну более чем на 30 символов.'})
    name:string

    @IsOptional()
    @IsString()
    @MinLength(1, {message: 'Имя должно состоять минимум из 1-го символа'})
    @MaxLength(30, {message: 'Фамилия не должна превышать длинну более чем на 30 символов.'})
    lastName:string


    @IsString()
    @IsOptional()
    @MinLength(6, { message: 'Пароль должен состоять минимум из 8 символов.' })
    @MaxLength(32, { message: 'Пароль не должен длиннее 32-ух символов.' })
    password:string

    @IsOptional()
    photo:string

    @IsString()
    @IsOptional()
    description:string

    @IsString()
   
    @IsOptional()
    @IsIn(['true', 'false'])
    public:string 
}

export class updateProfileDTO {

    @IsString()
    @IsOptional()
    @MinLength(1, {message: 'Имя должно состоять минимум из 1-го символа.'})
    @MaxLength(30, {message: 'Фамилия не должна превышать длинну более чем на 30 символов.'})
    name:string

    @IsOptional()
    @IsString()
    @MinLength(1, {message: 'Имя должно состоять минимум из 1-го символа'})
    @MaxLength(30, {message: 'Фамилия не должна превышать длинну более чем на 30 символов.'})
    lastName:string


    @IsString()
    @IsOptional()
    @MinLength(6, { message: 'Пароль должен состоять минимум из 8 символов.' })
    @MaxLength(32, { message: 'Пароль не должен длиннее 32-ух символов.' })
    password:string

    @IsOptional()
    photo:string

    @IsString()
    @IsOptional()
    description:string

    @IsString()
   
    @IsOptional()
    @IsBoolean()
    public:boolean 
}