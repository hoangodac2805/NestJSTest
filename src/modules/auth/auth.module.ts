import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/typeorm/entities/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from 'src/database/typeorm/entities/Refresh-token.entity';
import { AuthGuard } from './jwt-auth.guard';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard],
  exports: [AuthService]
})
export class AuthModule { }
