import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id?: number;

  @Column()
  uuid: string;

  @Column()
  user_email: string;

  @Column('char', { length: 11 })
  user_name: string;

  @Column('char', { length: 11 })
  user_mobile: string;

  @Column('varchar', { length: 100 })
  user_intro: string;

  @Column({ name: 'user_gender' })
  user_gender: string;

  @Column('varchar', { length: 100 })
  user_password: string;

  @Column({ default: 'http://localhost:3001/static/image/test1.jpg' })
  user_avatar?: string;
}
