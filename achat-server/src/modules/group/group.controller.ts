import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { AddFriend, CreateFriendGroupDto } from './dto/create-group.dto';
import { ChangeFriendGroupDto } from './dto/update-group.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/createFriendGroup')
  @ApiOperation({ summary: '添加好友分组' })
  createFriendGroup(@Body() createFriendGroupDto: CreateFriendGroupDto) {
    return this.groupService.createFriendGroup(createFriendGroupDto);
  }

  @Post('/addFriend')
  addFriend(@Body() addFriend: AddFriend) {
    return this.groupService.addFriend(addFriend);
  }

  @Get('/getGroup/:id/:uuid')
  @UseGuards(AuthGuard)
  getGroup(@Param('id') id: string) {
    return this.groupService.getGroup(+id);
  }

  @Post('/changeFriendGroup')
  changeFriendGroup(@Body() changeFriendGroup: ChangeFriendGroupDto) {
    return this.groupService.changeFriendGroup(changeFriendGroup);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
