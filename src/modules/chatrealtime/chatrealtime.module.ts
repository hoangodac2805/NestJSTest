import { Module } from '@nestjs/common';
import { ChatrealtimeService } from './chatrealtime.service';
import { ChatrealtimeGateway } from './chatrealtime.gateway';
import { AuthService } from '../auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/typeorm/entities/User.entity';
import { RefreshToken } from 'src/database/typeorm/entities/Refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
  ],
  providers: [ChatrealtimeGateway, ChatrealtimeService, AuthService],
})
export class ChatrealtimeModule { }
