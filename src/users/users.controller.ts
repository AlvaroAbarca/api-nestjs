import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    // Get Users
    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getProducts(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    // GET single user: /product/5c9d46100e2e5c44c444b2d1
    @Get('/:userID')
    async getProduct(@Res() res, @Param('userID') userID) {
        const user = await this.userService.getUser(userID);
        if (!user) { throw new NotFoundException('User does not exist!'); }
        return res.status(HttpStatus.OK).json(user);
    }

    // Create a User
    @Post('/')
    async createProduct(@Res() res, @Body() userDto: UserDto) {
        const user = await this.userService.createUser(userDto);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            user,
        });
    }

    // Delete Product: /delete?productID=5c9d45e705ea4843c8d0e8f7
    @Delete('/:userID')
    async deleteProduct(@Res() res, @Param('userID') userID) {
        const userDeleted = await this.userService.deleteUser(userID);
        if (!userDeleted) { throw new NotFoundException('Product does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            userDeleted,
        });
    }

    // Update Product: /update?productID=5c9d45e705ea4843c8d0e8f7
    @Put('/:userID')
    async updateProduct(@Res() res, @Body() userDto: UserDto, @Param('userID') userID) {
        const updateUser = await this.userService.updateUser(userID, userDto);
        if (!updateUser) { throw new NotFoundException('Product does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            updateUser,
        });
    }
}
