import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/database/typeorm/entities/User.entity';
import { HandleDBError } from 'src/common/decorators/handleDBErrors.decorator';
import { FirebaseService } from 'src/firebase/firebase.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private firebaseService: FirebaseService,
  ) {}

  @HandleDBError()
  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.usersRepository.create({
      ...rest,
      password: hashedPassword,
    });
    let { profile, email, userName } = await this.usersRepository.save(newUser);

    return { profile, email, userName };
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        profile: true,
        refreshTokens: true,
      },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: {
        profile:true
      },
    });
  }

  async uploadAvatar(avatar: Express.Multer.File, userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        profile:true
      },
    });

    let avatarUrl = await this.firebaseService.uploadFile(avatar);
    console.log(avatarUrl)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
