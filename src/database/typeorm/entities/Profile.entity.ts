import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Gender } from 'src/enum/index.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Message } from './Message.entity';
import { Avatar } from './Avatar.entity';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
  })
  @IsString()
  @Length(1, 25)
  firstName: string;

  @Column()
  @IsString()
  @Length(1, 25)
  lastName: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToOne(() => Avatar, { cascade: true })
  @JoinColumn()
  currentAvatar: Avatar;

  @OneToMany(() => Avatar, (avatar) => avatar.profile, { cascade: true })
  usedAvatars: Avatar[];

  @OneToMany(() => Message, (message) => message.profile, {
    cascade: true,
  })
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
