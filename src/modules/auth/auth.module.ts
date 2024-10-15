import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/typeorm/entities/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RefreshToken } from 'src/database/typeorm/entities/Refresh-token.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User,RefreshToken]),
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
