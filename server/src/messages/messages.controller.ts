import { Controller, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  fetchAll() {
    return this.messagesService.fetchAllMessages();
  }
}
