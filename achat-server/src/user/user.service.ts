import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { decrypt, encrypt } from 'src/utils/bcrypt.util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { jwtDecrypt, jwtEncrypt } from '../utils/jwt.util';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.user_password = await encrypt(createUserDto.user_password);
    createUserDto.uuid = uuidv4();
    const jwt_token = jwtEncrypt(createUserDto.uuid);
    try {
      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values(createUserDto)
        .execute();
      return {
        msg: '注册成功！',
        code: 200,
        data: createUserDto,
        token: jwt_token,
      };
    } catch (error) {
      return {
        msg: '注册失败...',
        code: 400,
      };
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where(`user.user_id = :id`, { id: id })
        .getOne();
      return {
        code: 200,
        data: user,
      };
    } catch (error) {
      return {
        code: 200,
        msg: '没用找到该用户',
      };
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user_email = :email OR user_mobile = :mobile', {
          email: loginUserDto.user_email,
          mobile: loginUserDto.user_mobile,
        })
        .getOne();
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
}
