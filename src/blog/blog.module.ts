import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { CategorySchema } from './schemas/category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }, { name: 'Category', schema: CategorySchema}])],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
