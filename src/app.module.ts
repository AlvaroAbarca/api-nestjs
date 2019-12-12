import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule,
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/nestjs?authSource=admin', { useUnifiedTopology: true, useNewUrlParser: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
