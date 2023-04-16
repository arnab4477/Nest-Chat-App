import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  async create(@MessageBody() createChatDto: CreateChatDto) {
    const newMessage = await this.chatService.createNewMessage(createChatDto);

    this.server.emit('newMessage', newMessage);

    return newMessage;
  }
}
