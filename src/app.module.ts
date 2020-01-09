import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BlogModule } from './blog/blog.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule,
    BlogModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs?', { useUnifiedTopology: true, useNewUrlParser: true }),
    // root:example@ authSource=admin
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
