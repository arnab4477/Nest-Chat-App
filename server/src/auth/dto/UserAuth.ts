import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
