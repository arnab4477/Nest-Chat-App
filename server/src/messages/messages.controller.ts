import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from 'src/dto';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async fetchAll() {
    return await this.messagesService.fetchAllMessages();
  }

  @Post()
  async createNewMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.createNewMessage(createMessageDto);
  }
}
