import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto implements UserEntity {
  uuid: string;

  @ApiProperty({ description: '用户邮箱' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({ message: '邮箱格式错误' })
  user_email: string;

  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名称不能为空' })
  @IsString({ message: '用户名称为字符串' })
  user_name: string;

  @ApiProperty({ description: '用户手机号' })
  @IsNotEmpty({ message: '用户手机号不能为空' })
  @IsString({ message: '用户手机号为字符串' })
  @Length(11, 11, { message: '手机号长度为11位' })
  user_mobile: string;

  @ApiProperty({ description: '用户简介' })
  @IsNotEmpty({ message: '用户简介不能为空' })
  @Length(0, 100, { message: '简介长度在100个字符之内' })
  user_intro: string;

  @ApiProperty({ description: '用户邮箱' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString({ message: '性别为字符串' })
  @IsEnum(
    {
      user_gender: 'male' || 'female' || 'other',
    },
    { message: '性别在male,female,other之间选择' },
  )
  user_gender: string;

  @ApiProperty({ description: '用户年龄' })
  @IsInt({ message: '年龄为数字' })
  @Max(100, { message: '年龄最大为100' })
  @Min(0, { message: '年龄最小为0' })
  user_age: number;

  @ApiProperty({ description: '用户密码' })
  @IsNotEmpty({ message: '用户密码不能为空' })
  @Length(8, 16, { message: '密码的长度在8-16位之间' })
  user_password: string;
}
