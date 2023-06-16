import { Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, Post, Put, Req, UseGuards } from "@nestjs/common";
import { UserTypeInterface } from "../../interfaces/userTypeInterface";
import { UserTypeService } from "./userTypes.service";
import { JWTServiceGuard } from "../guards/services.guard";

@Controller('userTypes')
export class UserTypesController {
    constructor(private readonly userTypeService: UserTypeService) { }

    @Get('getAllTypes')
    @UseGuards(JWTServiceGuard)
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
    @UseGuards(JWTServiceGuard)
    @HttpCode(HttpStatus.OK)
    async createType(@Req() req) {
        const userType: UserTypeInterface = {
            type: req.query.type
        }
        return await this.userTypeService.createType(userType)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Get('getType')
    @UseGuards(JWTServiceGuard)
    @HttpCode(HttpStatus.OK)
    async getType(@Req() req) {
        return await this.userTypeService.getType(req.query.type)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Put('updateType')
    @UseGuards(JWTServiceGuard)
    @HttpCode(HttpStatus.OK)
    async updateType(@Req() req) {
        const type: UserTypeInterface = {
            type: req.query.type
        }
        return await this.userTypeService.updateType(type)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }
    @Delete('deleteType')
    @UseGuards(JWTServiceGuard)
    @HttpCode(HttpStatus.OK)
    async deteleUser(@Req() req) {
        return await this.userTypeService.deleteUserType(req.query.type)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }
}