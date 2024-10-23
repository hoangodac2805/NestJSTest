import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatrealtimeService } from './chatrealtime.service';
import { CreateChatrealtimeDto } from './dto/create-chatrealtime.dto';
import { UpdateChatrealtimeDto } from './dto/update-chatrealtime.dto';
import { Server, Socket } from "socket.io"
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { extractToken } from 'src/common/utilities';

@WebSocketGateway(3002, {
  cors: {
    allowedHeaders: "*",
    origin: "*"
  }
})
export class ChatrealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatrealtimeService: ChatrealtimeService, private authService: AuthService) { }
  @WebSocketServer() server: Server

  @SubscribeMessage('newMessage')
  handleNewMessage(client: Socket, message: any) {
    this.server.emit("message", client.id + ":" + message)
  }

  async handleConnection(client: Socket) {
    const token =  extractToken(client.handshake.headers.authorization);
    if (!token) {
      client.disconnect(); return;
    }

    try {
      const user = await this.authService.verifyToken(token);
      client.data.user = user;
    } catch (error) {
      client.disconnect()
    }
    // client.broadcast.emit("user-joined", {
    //   message: "New User joined the chat :" + client.id
    // })
  }
  handleDisconnect(client: Socket) {
    console.log("a user disconnection" + client.id)

    client.broadcast.emit("user-left", {
      message: "One user left the chat :" + client.id
    })
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client:Socket,room:string) {
    client.join(room);
    this.server.to(room).emit('message',`${client.data.user.email} has joined the room ${room}`)
  }
  
  @SubscribeMessage('createChatrealtime')
  create(@MessageBody() createChatrealtimeDto: CreateChatrealtimeDto) {
    return this.chatrealtimeService.create(createChatrealtimeDto);
  }

  @SubscribeMessage('findAllChatrealtime')
  findAll() {
    return this.chatrealtimeService.findAll();
  }

  @SubscribeMessage('findOneChatrealtime')
  findOne(@MessageBody() id: number) {
    return this.chatrealtimeService.findOne(id);
  }

  @SubscribeMessage('updateChatrealtime')
  update(@MessageBody() updateChatrealtimeDto: UpdateChatrealtimeDto) {
    return this.chatrealtimeService.update(updateChatrealtimeDto.id, updateChatrealtimeDto);
  }

  @SubscribeMessage('removeChatrealtime')
  remove(@MessageBody() id: number) {
    return this.chatrealtimeService.remove(id);
  }


}
