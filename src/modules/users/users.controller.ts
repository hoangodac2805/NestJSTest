import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  FileTypeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post()

  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Request() req) {
    console.log(req.user)
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }


  @Post('uploadAvatar')
  @UseInterceptors(FileInterceptor('avatar', {
    limits: { fileSize: 1 * 1024 * 1024 },
  }))
  uploadAvatar(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: "(png|jpeg|jpg)$", })
    ]
  })) avatar: Express.Multer.File, @Body() body: { name: string, age: number }) {
    console.log(avatar)
    console.log(+body.age)
  }
}
