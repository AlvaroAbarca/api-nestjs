import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    // Get all Users
    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }

    // Get a single User
    async getUser(userID: string): Promise<User> {
        const user = await this.userModel.findById(userID);
        return user;
    }

    // Post a single User
    async createUser(createUserDTO: UserDto): Promise<User> {
        const newUser = new this.userModel(createUserDTO);
        return newUser.save();
    }

    // Delete User
    async deleteUser(userID: string): Promise<any> {
        const deletedUser = await this.userModel.findOneAndDelete(userID);
        return deletedUser;
    }

    // Put a single User
    async updateUser(userID: string, createUserDTO: UserDto): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(userID, createUserDTO, {new: true});
        return updatedUser;
    }

    async getUserName(username: string): Promise<User> {
        const user = await this.userModel.findOne({ username });
        return user;
    }
}
