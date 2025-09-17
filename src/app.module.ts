import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
     ConfigModule.forRoot({ isGlobal: true }),
    CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
