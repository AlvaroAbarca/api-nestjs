import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

import { Category } from './interfaces/category.interface';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Injectable()
export class BlogService {

    constructor(
        @InjectModel('Post') private readonly postModel: Model<Post>,
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
    ) { }

    /*
        Posts Service
    */
    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().exec();
        return posts;
    }

    async getPost(postID): Promise<Post> {
        const post = await this.postModel
            .findById(postID)
            .exec();
        return post;
    }

    async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const newPost = new this.postModel(createPostDTO);
        return newPost.save();
    }

    async editPost(postID, createPostDTO: CreatePostDTO): Promise<Post> {
        const editedPost = await this.postModel
            .findByIdAndUpdate(postID, createPostDTO, { new: true });
        return editedPost;
    }

    async deletePost(postID): Promise<any> {
        const deletedPost = await this.postModel.findByIdAndRemove(postID);
        return deletedPost;
    }

    /*
        Category Service
    */
   async getCategories(): Promise<Category[]> {
        const categories = await this.categoryModel.find().exec();
        return categories;
    }

    async getCategory(categoryID): Promise<Category> {
        const category = await this.categoryModel
            .findById(categoryID)
            .exec();
        return category;
    }

    async addCategory(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        const newCategory = new this.categoryModel(createCategoryDTO);
        return newCategory.save();
    }

    async editCategory(categoryID, createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        const editedCategory = await this.categoryModel
            .findByIdAndUpdate(categoryID, createCategoryDTO, { new: true });
        return editedCategory;
    }

    async deleteCategory(categoryID): Promise<any> {
        const deletedCategory = await this.categoryModel.findByIdAndRemove(categoryID);
        return deletedCategory;
    }
}
