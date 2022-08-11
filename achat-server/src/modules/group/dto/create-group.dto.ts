import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  user_id: number;
  user_chat_group: Array<object>;
  user_friend_group: Array<object>;
}
export class CreateFriendGroupDto {
  @ApiProperty({ description: '用户ID' })
  @IsInt({ message: '用户ID为整数' })
  @IsNotEmpty({ message: '用户ID不能为空' })
  user_id: number;

  @ApiProperty({ description: '分组名称' })
  @IsString({ message: '分组名称为字符串' })
  @IsNotEmpty({ message: '分组名称不能为空' })
  group_name: string;
}
export class AddFriend {
  @ApiProperty({ description: '用户ID' })
  @IsInt({ message: '用户ID为整数' })
  @IsNotEmpty({ message: '用户ID不能为空' })
  user_id: number;

  @ApiProperty({ description: '分组名称' })
  @IsString({ message: '分组名称为字符串' })
  @IsNotEmpty({ message: '分组名称不能为空' })
  group: string;

  @ApiProperty({ description: '好友ID' })
  @IsInt({ message: '好友ID为整数' })
  @IsNotEmpty({ message: '好友ID不能为空' })
  friend_id: number;

  @ApiProperty({ description: '好友头像' })
  @IsString({ message: '好友头像为url字符串' })
  @IsNotEmpty({ message: '好友头像不能为空' })
  friend_avatar: string;

  @ApiProperty({ description: '好友名称' })
  @IsString({ message: '好友名称为字符串' })
  @IsNotEmpty({ message: '好友名称不能为空' })
  friend_name: string;
}
