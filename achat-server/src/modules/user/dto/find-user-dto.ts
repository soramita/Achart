import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SearchUserDto {
  @ApiProperty({ description: '用户id' })
  @IsNotEmpty({ message: '用户ID/昵称不能为空' })
  user_param: any;

  @ApiProperty({ description: '起始页' })
  @IsNotEmpty({ message: '起始页不能为空' })
  page_start: number;

  @ApiProperty({ description: '结束页' })
  @IsNotEmpty({ message: '结束页不能为空' })
  page_end: number;
}
