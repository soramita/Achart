import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { ChatEntity } from '../entities/chat.entity';

export class CreateChatGroupDto implements ChatEntity {
  chat_id?: number;
  chat_group_user: JSON[];
  chat_msg: JSON[];
  chat_uuid: string;
  @ApiProperty({ description: '群聊名称' })
  @IsNotEmpty({ message: '群聊名称不能为空' })
  chat_name: string;

  @ApiProperty({ description: '群聊头像(url链接)' })
  @IsNotEmpty({ message: '群聊头像不能为空' })
  @IsString({ message: '群聊头像为url链接' })
  chat_avatar: string;

  @ApiProperty({ description: '群聊简介' })
  @IsNotEmpty({ message: '群聊简介不能为空' })
  chat_intro: string;

  @ApiProperty({ description: '群聊创建者' })
  @IsNotEmpty({ message: '群聊创建者不能为空' })
  chat_create_user: CreateUserDto;
}
export class SendChatMsgDto {
  chat_id: string;
  msg_id: string;
  sender_id: number;
  sender_name: string;
  sender_avatar: string;
  sender_msg: string;
  sender_time: string;
}

export class JoinChatGroupDto {
  chat_id: number;
  chat_uuid: string;
  chat_name: string;
  chat_avatar: string;
  user_id: number;
  user_name: string;
  user_age: number;
  user_avatar: string;
  user_gender: string;
  user_join_time: string;
}
