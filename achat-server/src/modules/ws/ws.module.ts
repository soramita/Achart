import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { WsGateway } from './ws.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from '../chat/entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity])],
  providers: [WsGateway, WsService],
  exports: [WsGateway, WsService],
})
export class WsModule {}
