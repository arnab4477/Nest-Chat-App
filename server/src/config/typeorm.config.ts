import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Message, User } from 'src/entities';

require('dotenv').config();

const ENV = process.env;

const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: parseInt(ENV.PORT),
  username: ENV.POSTGRES_USERNAME,
  password: ENV.POSTGRES_PASSWORD,
  database: ENV.DATABASE,
  entities: [User, Message],
  synchronize: true,
  logging: true,
};

export default typeOrmOptions;
