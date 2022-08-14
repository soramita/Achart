import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WsGateway } from '../ws/ws.gateway';
import { ChatService } from './chat.service';
import {
  CreateChatGroupDto,
  JoinChatGroupDto,
  SendChatMsgDto,
} from './dto/create-chat.dto';
import { FindChatGroupDto } from './dto/find-chat-dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { v4 as uuidv4 } from 'uuid';
import { ApiOperation } from '@nestjs/swagger';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly ws: WsGateway,
  ) {}

  @Post('/createChatGroup')
  @ApiOperation({ summary: '创建群聊' })
  createChatGroup(@Body() createChatGroupDto: CreateChatGroupDto) {
    return this.chatService.createChatGroupDto(createChatGroupDto);
  }

  @Post('/findChatGroup')
  @ApiOperation({ summary: '查找群聊' })
  findChatGroup(@Body() findChatGroupDto: FindChatGroupDto) {
    return this.chatService.findChatGroup(findChatGroupDto);
  }

  @Post('/joinChatGroup')
  joinChatGroup(@Body() joinChatGroup: JoinChatGroupDto) {
    return this.chatService.joinChatGroup(joinChatGroup);
  }

  @Post('/sendChatMsg')
  @ApiOperation({ summary: '群聊发送消息' })
  sendChatMsg(@Body() sendChatMsgDto: SendChatMsgDto) {
    sendChatMsgDto.msg_id = uuidv4();
    const result = this.chatService.sendChatMsg(sendChatMsgDto);
    this.ws.server.emit('getChatMsg', sendChatMsgDto);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
