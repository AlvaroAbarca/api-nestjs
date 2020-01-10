import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Request, Query, Put, Delete, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
import { AuthGuard } from '@nestjs/passport';

import { CreateCategoryDTO } from './dto/create-category.dto';

@Controller('blog')
export class BlogController {

    constructor(private blogService: BlogService) { }

    /* Posts */
    @Get('post')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    @Get('post/:postID')
    async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
        const post = await this.blogService.getPost(postID);
        if (!post) { throw new NotFoundException('Post does not exist!'); }
        return res.status(HttpStatus.OK).json(post);

    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/post')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.blogService.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Post has been submitted successfully!',
            post: newPost,
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('post/:postID')
    async editPost(@Res() res, @Param('postID', new ValidateObjectId()) postID, @Body() createPostDTO: CreatePostDTO) {
        const editedPost = await this.blogService.editPost(postID, createPostDTO);
        if (!editedPost) { throw new NotFoundException('Post does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost,
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('post/:postID')
    async deletePost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
        const deletedPost = await this.blogService.deletePost(postID);
        if (!deletedPost) { throw new NotFoundException('Post does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedPost,
        });
    }

    /* Categories */
    @Get('categories')
    async getCategories(@Res() res) {
        const categories = await this.blogService.getCategories();
        return res.status(HttpStatus.OK).json(categories);
    }

    @Get('categories/:categoryID')
    async getCategory(@Res() res, @Param('categoryID', new ValidateObjectId()) categoryID) {
        const category = await this.blogService.getCategory(categoryID);
        if (!category) { throw new NotFoundException('Category does not exist!'); }
        return res.status(HttpStatus.OK).json(category);

    }

    @UseGuards(AuthGuard('jwt'))
    @Post('categories')
    async addCategory(@Request() req, @Res() res, @Body() createCategoryDTO: CreateCategoryDTO) {
        const id = await (await this.blogService.getCategories()).length + 1;
        createCategoryDTO.id = id;
        // const author = `${req.user.firstname} ${req.user.lastname}`;
        // createCategoryDTO.author = author;
        const newCategory = await this.blogService.addCategory(createCategoryDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Category has been submitted successfully!',
            category: newCategory,
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('categories/:categoryID')
    async editCategory(@Res() res, @Param('categoryID', new ValidateObjectId()) categoryID, @Body() createCategoryDTO: CreateCategoryDTO) {
        const editedCategory = await this.blogService.editCategory(categoryID, createCategoryDTO);
        if (!editedCategory) { throw new NotFoundException('Category does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'Category has been successfully updated',
            category: editedCategory,
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('categories/:categoryID')
    async deleteCategory(@Res() res, @Param('categoryID', new ValidateObjectId()) categoryID) {
        const deletedCategory = await this.blogService.deleteCategory(categoryID);
        if (!deletedCategory) { throw new NotFoundException('Category does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'Category has been deleted!',
            category: deletedCategory,
        });
    }
}
