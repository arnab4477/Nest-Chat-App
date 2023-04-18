import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateMessageDto } from 'src/dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async fetchAllMessages() {
    return await this.messageRepository.find();
  }

  async createNewMessage(createMessageDto: CreateMessageDto) {
    const { messageBody, sender } = createMessageDto;

    const newMessage = this.messageRepository.create({ messageBody, sender });
    await this.messageRepository.save(newMessage);
  }
}
