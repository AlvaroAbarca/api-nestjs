import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put, UseGuards, HttpCode, Req } from '@nestjs/common';
import { UsersService } from './users.service';

import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

import {
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiConflictResponse,
    ApiUnauthorizedResponse,
    ApiOkResponse,
    ApiForbiddenResponse,
    ApiTags,
    } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('User')
@Controller('users')
@UseGuards(RolesGuard)
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
    @Post('/new_user')
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

    // ╔═╗╦ ╦╔╦╗╦ ╦╔═╗╔╗╔╔╦╗╦╔═╗╔═╗╔╦╗╔═╗
    // ╠═╣║ ║ ║ ╠═╣║╣ ║║║ ║ ║║  ╠═╣ ║ ║╣
    // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝╝╚╝ ╩ ╩╚═╝╩ ╩ ╩ ╚═╝
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({description: 'The record has been successfully created.'})
    @ApiBadRequestResponse({description: 'email address most be unique.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request..'})
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Post('verify-email')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'User has been successfully verified.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request..'})
    async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
        return await this.userService.verifyEmail(req, verifyUuidDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'User has been successfully logged in and tokens generated.'})
    @ApiNotFoundResponse({description: 'User not found wrong email or password.'})
    @ApiConflictResponse({description: 'User blocked try later.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request.'})
    async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
        return await this.userService.login(req, loginUserDto);
    }

    @Post('refresh-access-token')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({description: 'Access token has been generated successfully.'})
    @ApiUnauthorizedResponse({description: 'User has been Logged out.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request.'})
    async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
        return await this.userService.refreshAccessToken(refreshAccessTokenDto);
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'Verification has been sent.'})
    @ApiNotFoundResponse({description: 'User not found.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request.'})
    async forgotPassword(@Req() req: Request, @Body() createForgotPasswordDto: CreateForgotPasswordDto) {
        return await this.userService.forgotPassword(req, createForgotPasswordDto);
    }

    @Post('forgot-password-verify')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'Now user can reset his/her password.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request.'})
    async forgotPasswordVerify(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
        return await this.userService.forgotPasswordVerify(req, verifyUuidDto);
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'Password has been successfully changed.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request.'})
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return await this.userService.resetPassword(resetPasswordDto);
    }

    @Get('data')
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'Data recieved'})
    @ApiUnauthorizedResponse({ description: 'Not authorized.'})
    @ApiForbiddenResponse({description: 'User has not permitted to this api.'})
    findAll() {
        return this.userService.findAll();
    }
}
