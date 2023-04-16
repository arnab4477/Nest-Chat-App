import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async createNewMessage(createChatDto: CreateChatDto) {
    const { message, sender } = createChatDto;

    const newMessage = this.messageRepository.create({ message, sender });
    const savedMessage = await this.messageRepository.save(newMessage);

    return {
      message: { body: savedMessage.message, sender: savedMessage.sender },
    };
  }
}
