import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { SearchUserDto } from './dto/find-user-dto';
@Controller('user')
@ApiTags('用户登录与注册')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/userRegister')
  @ApiOperation({ summary: '创建用户' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '用户登录' })
  @Post('/userLogin')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @Get('/getUserInfo/:id/:uuid')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number) {
    return this.userService.getUserInfo(id);
  }

  @Post('/updateUserInfo')
  @ApiOperation({ summary: '修改用户信息' })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserInfo(updateUserDto);
  }

  @Post('/searchUser')
  @ApiOperation({ summary: '搜索用户' })
  searchUser(@Body() searchUserDto: SearchUserDto) {
    return this.userService.searchUser(searchUserDto);
  }
}
