import { IsString, IsEmail, IsNotEmpty, Length, ValidateNested, MinLength } from 'class-validator';
import { CreateProfileDto } from 'src/modules/profiles/dto/create-profile.dto';
import { Type } from 'class-transformer';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ValidateNested()
  @Type(()=>CreateProfileDto)
  profile: CreateProfileDto;
}
