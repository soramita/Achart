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
