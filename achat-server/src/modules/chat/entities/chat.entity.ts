import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chat' })
export class ChatEntity {
  @PrimaryGeneratedColumn()
  chat_id?: number;

  @Column()
  chat_uuid: string;

  @Column()
  chat_name: string;

  @Column()
  chat_avatar: string;

  @Column()
  chat_intro: string;

  @Column({ type: 'json' })
  chat_group_user: JSON[];

  @Column({ type: 'json' })
  chat_create_user: CreateUserDto;

  @Column({ type: 'json' })
  chat_msg: JSON[];
}
