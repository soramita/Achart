import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateChatGroupDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatEntity } from './entities/chat.entity';
import { v4 as uuidv4 } from 'uuid';
import { FindChatGroupDto } from './dto/find-chat-dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) {}
  /**
   * @创建群聊
   */
  async createChatGroupDto(createChatGroupDto: CreateChatGroupDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      createChatGroupDto.chat_msg = [];
      createChatGroupDto.chat_group_user = [];
      createChatGroupDto.chat_uuid = uuidv4();
      await queryRunner.manager.insert(ChatEntity, createChatGroupDto);
      const query =
        'update `group` set user_chat_group = ' +
        `JSON_ARRAY_APPEND(user_chat_group,'$',CAST('{"chat_id":"${createChatGroupDto.chat_id}","chat_uuid":"${createChatGroupDto.chat_uuid}","chat_avatar":"${createChatGroupDto.chat_avatar}","chat_name":"${createChatGroupDto.chat_name}"}' AS JSON)) where user_id = ${createChatGroupDto.chat_create_user.user_id}`;
      await queryRunner.manager.query(query);
      queryRunner.commitTransaction();
      return {
        code: 200,
        msg: '创建成功！',
      };
    } catch (error) {
      queryRunner.rollbackTransaction();
      return {
        code: 400,
        msg: '创建失败，出现未知错误',
      };
    }
  }

  /**
   * @查找群聊
   */
  async findChatGroup(findChatGroupDto: FindChatGroupDto) {
    try {
      const count = await this.chatRepository
        .createQueryBuilder()
        .where('chat_id = :id OR chat_name = :name', {
          id: findChatGroupDto.chat_group_key,
          name: findChatGroupDto.chat_group_key,
        })
        .getCount();
      const chatGroup: any = await this.chatRepository
        .createQueryBuilder()
        .where('chat_id = :id OR chat_name = :name', {
          id: findChatGroupDto.chat_group_key,
          name: findChatGroupDto.chat_group_key,
        })
        .skip(findChatGroupDto.page_start)
        .take(findChatGroupDto.page_end)
        .getMany();
      if (chatGroup.length !== 0) {
        return {
          code: 200,
          data: chatGroup,
          total: count,
        };
      }
      return {
        code: 400,
        msg: '没有找到该用户！',
      };
    } catch (error) {
      console.log(error);
      return {
        code: 400,
        msg: '出现未知错误！',
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
