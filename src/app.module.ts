import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

// import { ConfigModule } from './config/config.module';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }),
    AuthModule,
    UsersModule,
    // ConfigModule,
    BlogModule,
    CategoryModule,
    // ?authSource=admin
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
