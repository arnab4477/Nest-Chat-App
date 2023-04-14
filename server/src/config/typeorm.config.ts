import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Message, User } from 'src/entities';

const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass',
  database: 'chatdb',
  entities: [User, Message],
  synchronize: true,
  logging: true,
};

export default typeOrmOptions;
