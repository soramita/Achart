import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'group' })
export class GroupEntity {
  @PrimaryColumn()
  user_id: number;

  @Column({ type: 'json' })
  user_friend_group: JSON[];

  @Column({ type: 'json' })
  user_chat_group: JSON[];
}
