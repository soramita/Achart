import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from '../chat/entities/chat.entity';

@Injectable()
export class WsService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatGroupRepository: Repository<ChatEntity>,
  ) {}

  async findAll() {
    return await this.chatGroupRepository.createQueryBuilder('chat').getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} w`;
  }

  remove(id: number) {
    return `This action removes a #${id} w`;
  }
}
