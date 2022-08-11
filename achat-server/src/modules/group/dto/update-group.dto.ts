import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ChangeFriendGroupDto {
  @ApiProperty({ description: '来自什么分组' })
  @IsNotEmpty({ message: '来自的分组不能为空' })
  @IsString()
  from_group_name: string;

  @ApiProperty({ description: '去往什么分组' })
  @IsNotEmpty({ message: '去往的分组不能为空' })
  @IsString()
  to_group_name: string;

  @ApiProperty({ description: '好友ID' })
  @IsNotEmpty({ message: '好友ID不能为空' })
  @IsInt()
  friend_id: number;

  @ApiProperty({ description: '好友名称' })
  @IsNotEmpty({ message: '好友名称不能为空' })
  @IsString()
  friend_name: string;

  @ApiProperty({ description: '好友头像' })
  @IsNotEmpty({ message: '好友头像不能为空' })
  @IsString()
  friend_avatar: string;

  from_group: string;

  @ApiProperty({ description: '用户ID' })
  @IsNotEmpty({ message: '用户ID不能为空' })
  @IsInt()
  user_id: number;
}
