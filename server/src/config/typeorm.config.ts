import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Message, User } from 'src/entities';

const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'chatappdb',
  entities: [User, Message],
  synchronize: true,
  logging: true,
};

export default typeOrmOptions;
