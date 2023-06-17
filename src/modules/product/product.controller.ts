import {
    Controller,
    Get,
    InternalServerErrorException,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Req,
    Delete,
    UseGuards
} from '@nestjs/common';
import { ProductInterface } from '../../interfaces/productInterface';
import { ProductService } from './product.service';
import { JWTServiceGuard } from '../guards/services.guard';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get('getAllProducts')
    @UseGuards(JWTServiceGuard)
    @HttpCode(HttpStatus.OK)
    async getUsers() {
        return await this.productService.getAllProducts()
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Post('createProduct')
    @UseGuards(JWTServiceGuard)
    @HttpCode(HttpStatus.OK)
    async createProduct(@Req() req) {
        const prduct: ProductInterface = {
            name: req.query.name,
            price: req.query.price,
            serviceId: req.query.serviceId,
        }
        return await this.productService.createProduct(req.query.id, prduct)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Get('getProduct')
    @UseGuards(JWTServiceGuard)
    @HttpCode(HttpStatus.OK)
    async getProduct(@Req() req) {
        return await this.productService.getProduct(req.query.id)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Put('updateUser')
    @UseGuards(JWTServiceGuard)
    @HttpCode(HttpStatus.OK)
    async updateUser(@Req() req) {
        const prduct: ProductInterface = {
            name: req.query.name,
            price: req.query.price,
            serviceId: req.query.serviceId,
        }
        return await this.productService.updateUser(req.query.id, prduct)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Delete('deleteProduct')
    @UseGuards(JWTServiceGuard)
    @HttpCode(HttpStatus.OK)
    async deleteProduct(@Req() req) {
        return await this.productService.deleteProduct(req.query.id)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }
}