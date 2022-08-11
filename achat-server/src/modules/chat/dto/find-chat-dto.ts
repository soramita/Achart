import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class FindChatGroupDto {
  @ApiProperty({ description: '群聊名称/ID' })
  @IsNotEmpty({ message: '群聊名称/ID不能为空' })
  chat_group_key: string | number;

  @ApiProperty({ description: '开始页' })
  @IsNotEmpty({ message: '开始页不能为空' })
  @IsInt({ message: '开始页为整数' })
  page_start: number;

  @ApiProperty({ description: '结束页' })
  @IsNotEmpty({ message: '结束页不能为空' })
  @IsInt({ message: '结束页为整数' })
  page_end: number;
}
