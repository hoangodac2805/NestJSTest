import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import { UserRole } from 'src/enum/index.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from './Profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(4, 25)
  userName: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    nullable:true
  })
  refreshToken: string

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
