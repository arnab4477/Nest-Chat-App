import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateMessageDto } from 'src/dto';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  async emitNewMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    this.server.emit('newMessage', { ...createMessageDto });
  }
}
