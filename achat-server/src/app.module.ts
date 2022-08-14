import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './modules/chat/chat.module';
import { FileModule } from './modules/file/file.module';
import { GroupModule } from './modules/group/group.module';
import { UserModule } from './modules/user/user.module';
import { WsModule } from './modules/ws/ws.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zs8501203',
      database: 'achat',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    FileModule,
    GroupModule,
    ChatModule,
    WsModule,
  ],
})
export class AppModule {}
