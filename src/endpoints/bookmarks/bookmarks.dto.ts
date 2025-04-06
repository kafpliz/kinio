import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MAX, MaxLength, Min, MinLength } from "class-validator"

export class BookmarkDTO {
 
    @IsNotEmpty()
    @IsNumber()
    film_id:number
    
    @IsString()
    @IsNotEmpty()
    @IsIn(['watching', "planned", "watched", "cast"])
    type:string
}

export class createBookmarkDTO {
 
    @IsNotEmpty()
    @IsNumber()
    film_id:number
    
    @IsString()
    @IsNotEmpty()
    @IsIn(['watching', "planned", "watched", "cast"])
    type:string

    @IsNotEmpty()
    user_id:number
}

export class deleteBookmarkDTO {
 
    @IsNotEmpty()
    @IsNumber()
    film_id:number

    @IsOptional()
    @IsNotEmpty()
    user_id:number
}
