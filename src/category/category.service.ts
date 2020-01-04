import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Category } from './interfaces/categories.interface';
import { CreateCatDTO } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

    async getCategories(): Promise<Category[]> {
        const categories = await this.categoryModel.find().exec();
        return categories;
    }

    async getCat(catID): Promise<Category> {
        const category = await this.categoryModel
            .findById(catID)
            .exec();
        return category;
    }

    async addCat(createCatDTO: CreateCatDTO): Promise<Category> {
        const newCat = new this.categoryModel(createCatDTO);
        return newCat.save();
    }

    async editCat(catID, createCatDTO: CreateCatDTO): Promise<Category> {
        const editedCat = await this.categoryModel
            .findByIdAndUpdate(catID, createCatDTO, { new: true });
        return editedCat;
    }

    async deleteCat(catID): Promise<any> {
        const deletedCat = await this.categoryModel
            .findByIdAndRemove(catID);
        return deletedCat;
    }
}
