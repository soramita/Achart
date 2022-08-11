import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddFriend, CreateFriendGroupDto } from './dto/create-group.dto';
import { ChangeFriendGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}
  /**
   * @创建好友分组
   */
  createFriendGroup(createFriendGroupDto: CreateFriendGroupDto) {
    try {
      const groupData = {
        groupId: uuidv4(),
        groupName: createFriendGroupDto.group_name,
      };
      const query =
        'update `group` set `user_friend_group` = ' +
        `JSON_ARRAY_APPEND(user_friend_group,'$',CAST('{"groupId":"${groupData.groupId}", "groupList":[],"groupName":"${groupData.groupName}"}' AS JSON)) where user_id = ${createFriendGroupDto.user_id}`;
      this.groupRepository.query(query);
      return {
        code: 200,
        groupId: groupData.groupId,
        groupName: groupData.groupName,
        msg: '创建成功！',
      };
    } catch (error) {
      return {
        code: 400,
        msg: '出现未知错误！',
      };
    }
  }

  /**
   * @添加好友并放入好友分组中
   */
  async addFriend(addFriend: AddFriend) {
    const { user_id, group, ...groupData } = addFriend;
    try {
      const result = await this.groupRepository
        .createQueryBuilder('group')
        .where('user_id = :id', { id: addFriend.user_id })
        .getOne();
      result.user_friend_group.forEach((item: any, index: number) => {
        if (item.groupName === group) {
          const query =
            'update `group` set user_friend_group = JSON_ARRAY_APPEND(user_friend_group,' +
            `'$[${index}].groupList',CAST('{"friend_id":"${groupData.friend_id}","friend_name":"${addFriend.friend_name}","friend_avatar":"${addFriend.friend_avatar}","from_group":"${addFriend.group}"}' AS JSON))` +
            `where user_id = ${user_id}`;
          this.groupRepository.query(query);
          return;
        }
      });
      return {
        code: 200,
        msg: '添加成功！',
      };
    } catch (error) {
      return {
        code: 400,
        msg: '添加失败，出现未知错误...',
      };
    }
  }

  /**
   * @改变好友分组
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async changeFriendGroup(changeFriendGroupDto: ChangeFriendGroupDto) {
    try {
      const { user_id, to_group_name, from_group_name, ...friendData } =
        changeFriendGroupDto;
      friendData.from_group = to_group_name;
      const group = await this.groupRepository
        .createQueryBuilder('group')
        .where('user_id = :id', { id: user_id })
        .getOne();
      group.user_friend_group.forEach((groups: any) => {
        //从旧分组中删除
        if (groups.groupName === from_group_name) {
          const index = groups.groupList.findIndex((friendInfo: any) => {
            return +friendInfo.friend_id === +friendData.friend_id;
          });

          groups.groupList.splice(index, 1);
        }
        //添加到新分组
        if (groups.groupName === to_group_name) {
          groups.groupList.push(friendData);
        }
      });
      this.groupRepository
        .createQueryBuilder()
        .update(GroupEntity)
        .set(group)
        .where('user_id =:id', { id: changeFriendGroupDto.user_id })
        .execute();
      return {
        code: 200,
        msg: '修改成功！',
      };
    } catch (error) {
      return {
        code: 400,
        msg: '修改失败，未知错误！',
      };
    }
  }

  /**
   * @获取用户组群
   */
  async getGroup(id: number) {
    try {
      const group = await this.groupRepository
        .createQueryBuilder('group')
        .where('user_id = :id', { id: id })
        .getOne();
      return {
        code: 200,
        data: group,
      };
    } catch (error) {
      return {
        code: 400,
        msg: '未知错误！',
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
