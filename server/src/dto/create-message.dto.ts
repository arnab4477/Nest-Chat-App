import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  messageBody: string;

  @IsNotEmpty()
  sender: string;
}
