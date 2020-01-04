import { Controller, Get, Res, Post, HttpStatus, Param, NotFoundException, Body, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCatDTO } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}

    @Get()
    async getCategories(@Res() res){
        const cat = await this.categoryService.getCategories();
        return res.status(HttpStatus.OK).json(cat);
    }
    @Get(':catId')
    async getCategory(@Res() res, @Param('catId') id: string){
        const cat = await this.categoryService.getCat(id);
        if (!cat) { throw new NotFoundException('Category does not exist!'); }
        return res.status(HttpStatus.OK).json(cat);
    }

    @Post()
    async addCat(@Res() res, @Body() createCatDTO: CreateCatDTO) {
        const newCat = await this.categoryService.addCat(createCatDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Cat has been submitted successfully!',
            post: newCat,
        });
    }

    @Put(':catID')
    async editCat(@Res() res, @Param('catID') catID, @Body() createCatDTO: CreateCatDTO) {
        const editedCat = await this.categoryService.editCat(catID, createCatDTO);
        if (!editedCat) { throw new NotFoundException('Cat does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'Cat has been successfully updated',
            cat: editedCat,
        });
    }

    @Delete(':catID')
    async deletePost(@Res() res, @Param('catID') catID) {
        const deletedCat = await this.categoryService.deleteCat(catID);
        if (!deletedCat) { throw new NotFoundException('Cat does not exist!'); }
        return res.status(HttpStatus.OK).json({
            message: 'Cat has been deleted!',
            cat: deletedCat,
        });
    }
}
