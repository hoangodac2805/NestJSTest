import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

// export class UpdateUserDto extends PartialType(CreateUserDto) {

// }

export class UpdateUserDto{
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    userName: string;
  
 
}
