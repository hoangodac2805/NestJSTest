import { PartialType } from '@nestjs/mapped-types';
import { CreateChatrealtimeDto } from './create-chatrealtime.dto';

export class UpdateChatrealtimeDto extends PartialType(CreateChatrealtimeDto) {
  id: number;
}
