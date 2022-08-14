import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entities/chat.entity';
import { WsModule } from '../ws/ws.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity]), WsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
