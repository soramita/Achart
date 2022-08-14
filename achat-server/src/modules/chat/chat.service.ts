import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  CreateChatGroupDto,
  JoinChatGroupDto,
  SendChatMsgDto,
} from './dto/create-chat.dto';
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
      const userChatGroup = {
        chat_id: createChatGroupDto.chat_id,
        chat_uuid: createChatGroupDto.chat_uuid,
        chat_avatar: createChatGroupDto.chat_avatar,
        chat_name: createChatGroupDto.chat_name,
      };
      queryRunner.manager.insert(ChatEntity, createChatGroupDto);
      const query =
        'update `group` set user_chat_group = ' +
        `JSON_ARRAY_APPEND(user_chat_group,'$',CAST('${JSON.stringify(
          userChatGroup,
        )}' AS JSON)) where user_id = ${
          createChatGroupDto.chat_create_user.user_id
        }`;
      queryRunner.manager.query(query);
      queryRunner.commitTransaction();
      return {
        code: 200,
        msg: '创建成功！',
      };
    } catch (error) {
      queryRunner.rollbackTransaction();
      console.log(error);
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
        .where('chat_id = :id OR chat_name = :name OR chat_uuid = :id', {
          id: findChatGroupDto.chat_group_key,
          name: findChatGroupDto.chat_group_key,
        })
        .getCount();
      const chatGroup: any = await this.chatRepository
        .createQueryBuilder()
        .where('chat_id = :id OR chat_name = :name OR chat_uuid = :id', {
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
        msg: '没有找到该群聊！',
      };
    } catch (error) {
      console.log(error);
      return {
        code: 400,
        msg: '出现未知错误！',
      };
    }
  }

  /**
   * @加入群聊
   */
  async joinChatGroup(joinChatGroup: JoinChatGroupDto) {
    let state = false;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await this.chatRepository
        .createQueryBuilder('chat')
        .where('chat_id = :chat_id', { chat_id: joinChatGroup.chat_id })
        .getOne();
      if (result.chat_group_user.length !== 0) {
        //判断当前用户是否加入过该群或者是否是群主
        result.chat_group_user.forEach((item: any) => {
          if (item.user_id == joinChatGroup.user_id) {
            state = true;
            return;
          }
          if (joinChatGroup.user_id == result.chat_create_user.user_id) {
            state = true;
            return;
          }
        });
      }
      if (!state) {
        const { chat_avatar, chat_id, chat_name, chat_uuid, ...user_info } =
          joinChatGroup;
        const userChatGroup = {
          chat_id,
          chat_uuid,
          chat_avatar,
          chat_name,
        };
        const setUserChatGroupQuery =
          'update `group` set user_chat_group = ' +
          `JSON_ARRAY_APPEND(user_chat_group,'$',CAST('${JSON.stringify(
            userChatGroup,
          )}' AS JSON)) where user_id = ${user_info.user_id}`;
        queryRunner.manager.query(setUserChatGroupQuery);
        const setChatGroupUserQuery =
          'update `chat` set chat_group_user = ' +
          `JSON_ARRAY_APPEND(chat_group_user,'$',CAST('${JSON.stringify(
            user_info,
          )}' AS JSON)) where chat_id = ${chat_id}`;
        queryRunner.manager.query(setChatGroupUserQuery);
        queryRunner.commitTransaction();
        return {
          code: 200,
          msg: '加入成功！',
        };
      } else {
        return {
          code: 400,
          msg: '你已经加入过此群了！',
        };
      }
    } catch (error) {
      queryRunner.rollbackTransaction();
      console.log(error);
      return {
        code: 400,
        msg: '出现未知错误！',
      };
    }
  }

  /**
   * @群聊发送消息
   */
  async sendChatMsg(sendChatMsgDto: SendChatMsgDto) {
    try {
      const { chat_id, ...chatMsg } = sendChatMsgDto;
      chatMsg.sender_msg = chatMsg.sender_msg.replace(/\n/g, '\\n');
      const query =
        'update `chat` set chat_msg = ' +
        `JSON_ARRAY_APPEND(chat_msg,'$',CAST('${JSON.stringify(
          chatMsg,
        )}' AS JSON)) where chat_id = ${chat_id}`;
      this.chatRepository.query(query);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
