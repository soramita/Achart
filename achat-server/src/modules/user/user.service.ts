import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { decrypt, encrypt } from 'src/utils/bcrypt.util';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { jwtDecrypt, jwtEncrypt } from '../../utils/jwt.util';
import { v4 as uuidv4 } from 'uuid';
import { GroupEntity } from '../group/entities/group.entity';
import { CreateGroupDto } from '../group/dto/create-group.dto';
import { SearchUserDto } from './dto/find-user-dto';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}
  /**
   * 创建用户
   */
  async create(createUserDto: CreateUserDto) {
    createUserDto.user_password = await encrypt(createUserDto.user_password);
    createUserDto.uuid = uuidv4();
    const jwt_token = jwtEncrypt(createUserDto.uuid);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.insert(UserEntity, createUserDto);
      const groupData: CreateGroupDto = {
        user_id: createUserDto.user_id,
        user_friend_group: [
          { groupName: '我的好友', groupList: [], groupId: uuidv4() },
        ],
        user_chat_group: [],
      };
      await queryRunner.manager.insert(GroupEntity, groupData);
      await queryRunner.commitTransaction();
      return {
        msg: '注册成功！',
        code: 200,
        data: createUserDto,
        token: jwt_token,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        msg: '注册失败,出现未知错误...',
        code: 400,
      };
    }
  }
  /**
   * 用户登录
   */
  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user_email = :email OR user_mobile = :mobile', {
          email: loginUserDto.user_email,
          mobile: loginUserDto.user_mobile,
        })
        .getOne();
      if (!user) {
        return {
          code: 400,
          msg: '该账户不存在！',
        };
      }
      const decryptPwd = await decrypt(
        loginUserDto.user_password,
        user.user_password,
      );
      const token = jwtEncrypt(user.uuid);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user_password, ...userData } = user;
      jwtDecrypt(token, userData.uuid);
      if (decryptPwd) {
        return {
          data: userData,
          token,
        };
      } else {
        return '账号或密码错误！';
      }
    } catch (error) {
      return {
        msg: '参数错误！',
        code: 400,
      };
    }
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(id: number) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where(`user.user_id = :id`, { id: id })
        .getOne();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user_password, ...newUserObj } = user;
      if (user !== null) {
        return {
          code: 200,
          data: newUserObj,
        };
      }
      return {
        code: 400,
        msg: '没有找到该用户！',
      };
    } catch (error) {
      return {
        code: 400,
        msg: '出现未知错误！',
      };
    }
  }
  /**
   * 修改用户信息
   */
  updateUserInfo(updateUserDto: UpdateUserDto) {
    const { user_id, ...userData } = updateUserDto;
    try {
      this.userRepository
        .createQueryBuilder()
        .update(UserEntity)
        .set(userData)
        .where('user_id = :id', { id: user_id })
        .execute();
      return {
        code: 200,
        msg: '修改完成！',
      };
    } catch (error) {
      return {
        code: 400,
        msg: '修改失败，发生未知错误！',
      };
    }
  }

  /**
   * 搜索用户
   */
  async searchUser(searchUserDto: SearchUserDto) {
    searchUserDto.page_start = +searchUserDto.page_start;
    searchUserDto.page_end = +searchUserDto.page_end;
    try {
      const count = await this.userRepository
        .createQueryBuilder()
        .where('user_id = :id OR user_name = :name', {
          id: searchUserDto.user_param,
          name: searchUserDto.user_param,
        })
        .getCount();
      const user = await this.userRepository
        .createQueryBuilder()
        .where('user_id = :id OR user_name = :name', {
          id: searchUserDto.user_param,
          name: searchUserDto.user_param,
        })
        .skip(searchUserDto.page_start)
        .take(searchUserDto.page_end)
        .getMany();
      if (user.length !== 0) {
        const newList = user.map((item: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { user_password, uuid, ...user } = item;
          return user;
        });
        return {
          code: 200,
          data: newList,
          total: count,
        };
      }
      return {
        code: 400,
        msg: '没有找到该用户！',
      };
    } catch (error) {
      return {
        code: 400,
        msg: '出现未知错误！',
      };
    }
  }
}
