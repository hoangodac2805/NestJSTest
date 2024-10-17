import { Module } from '@nestjs/common';
import { ChatrealtimeService } from './chatrealtime.service';
import { ChatrealtimeGateway } from './chatrealtime.gateway';

@Module({
  providers: [ChatrealtimeGateway, ChatrealtimeService],
})
export class ChatrealtimeModule {}
