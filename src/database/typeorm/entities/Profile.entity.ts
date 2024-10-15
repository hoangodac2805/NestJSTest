import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Gender } from 'src/enum/index.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 25)
  firstName: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 25)
  lastName: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
