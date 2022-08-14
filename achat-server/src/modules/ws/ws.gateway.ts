import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { Server } from 'http';

@WebSocketGateway({ cors: true })
export class WsGateway {
  constructor(private readonly wsService: WsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('getChatMsg')
  async getChatMsg() {
    return await this.wsService.findAll();
  }

  @SubscribeMessage('findOneW')
  findOne(@MessageBody() id: number) {
    return this.wsService.findOne(id);
  }

  @SubscribeMessage('removeW')
  remove(@MessageBody() id: number) {
    return this.wsService.remove(id);
  }
}
