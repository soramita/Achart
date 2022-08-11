import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatGroupDto } from './dto/create-chat.dto';
import { FindChatGroupDto } from './dto/find-chat-dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/createChatGroup')
  createChatGroup(@Body() createChatGroupDto: CreateChatGroupDto) {
    return this.chatService.createChatGroupDto(createChatGroupDto);
  }

  @Post('/findChatGroup')
  findChatGroup(@Body() findChatGroupDto: FindChatGroupDto) {
    return this.chatService.findChatGroup(findChatGroupDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
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
