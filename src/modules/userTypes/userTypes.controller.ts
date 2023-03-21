import { Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, Post, Put, Req } from "@nestjs/common";
import { UserTypeInterface } from "../interfaces/userTypeInterface";
import { UserTypeService } from "./userTypes.service";

@Controller('userTypes')
export class UserTypesController {
    constructor(private readonly userTypeService: UserTypeService) { }

    @Get('getAllTypes')
    @HttpCode(HttpStatus.OK)
    async getAllTypes() {
        return await this.userTypeService.getAllTypes()
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Post('createType')
    @HttpCode(HttpStatus.OK)
    async createType(@Req() req) {
        const userType: UserTypeInterface = {
            type: req.type
        }
        return await this.userTypeService.createType(userType)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Get('getType')
    @HttpCode(HttpStatus.OK)
    async getType(@Req() req) {
        return await this.userTypeService.getType(req.type)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Put('updateType')
    @HttpCode(HttpStatus.OK)
    async updateType(@Req() req) {
        const type: UserTypeInterface = {
            type: req.type
        }
        return await this.userTypeService.updateType(type)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }
    @Delete('deleteType')
    @HttpCode(HttpStatus.OK)
    async deteleUser(@Req() req) {
        return await this.userTypeService.deleteUserType(req.type)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }
}