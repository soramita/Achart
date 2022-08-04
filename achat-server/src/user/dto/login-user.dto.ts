import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: '用户手机号' })
  user_mobile: string;

  @ApiProperty({ description: '用户邮箱' })
  user_email: string;

  @ApiProperty({ description: '用户密码' })
  @IsNotEmpty({ message: '用户密码不能为空' })
  @Length(8, 16, { message: '密码的长度在8-16位之间' })
  user_password: string;
}
