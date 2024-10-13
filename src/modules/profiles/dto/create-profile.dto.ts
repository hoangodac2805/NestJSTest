import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { Gender } from "src/enum/index.enum";

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    @Length(4, 25)
    firstName:string
    
    @IsString()
    @IsNotEmpty()
    @Length(4, 25)
    lastName:string

    @IsEnum(Gender,{message:"Gender must be Male,Female"})
    @IsNotEmpty()
    gender: Gender
}
