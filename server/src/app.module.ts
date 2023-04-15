import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import typeOrmOptions from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmOptions), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
