import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { decrypt, encrypt } from 'src/utils/bcrypt.util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.user_password = await encrypt(createUserDto.user_password);
    try {
      this.userRepository
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values(createUserDto)
        .execute();
      console.log(createUserDto);
      return '创建成功！';
    } catch (error) {
      return '用户创建失败';
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where(`user.user_id = :id`, { id: id })
        .getOne();
      return user;
    } catch (error) {
      return '未找到该用户';
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
        .select('user.user_password')
        .where('user_email = :email OR user_mobile = :mobile', {
          email: loginUserDto.user_email,
          mobile: loginUserDto.user_mobile,
        })
        .getOne();
      const decryptPwd = await decrypt(
        loginUserDto.user_password,
        user.user_password,
      );
      if (decryptPwd) {
        return '登录成功！';
      } else {
        return '账号或密码错误！';
      }
    } catch (error) {
      return new HttpException('参数错误！', 400);
    }
  }
}
