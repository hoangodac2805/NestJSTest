import { Injectable } from '@nestjs/common';
import { CreateChatrealtimeDto } from './dto/create-chatrealtime.dto';
import { UpdateChatrealtimeDto } from './dto/update-chatrealtime.dto';

@Injectable()
export class ChatrealtimeService {
  create(createChatrealtimeDto: CreateChatrealtimeDto) {
    return 'This action adds a new chatrealtime';
  }

  findAll() {
    return `This action returns all chatrealtime`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatrealtime`;
  }

  update(id: number, updateChatrealtimeDto: UpdateChatrealtimeDto) {
    return `This action updates a #${id} chatrealtime`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatrealtime`;
  }
}
