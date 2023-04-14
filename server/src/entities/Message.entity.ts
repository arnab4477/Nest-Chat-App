import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @OneToOne(() => User)
  @JoinTable()
  sender: User;
}
