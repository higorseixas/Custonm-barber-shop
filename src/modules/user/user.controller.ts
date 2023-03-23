import {
    Controller,
    Get,
    InternalServerErrorException,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Req,
    Delete
} from '@nestjs/common';
import { UserInterface } from '../../interfaces/userInterface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('getAllUsers')
    @HttpCode(HttpStatus.OK)
    async getUsers() {
        return await this.userService.getAllUsers()
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Post('createUser')
    @HttpCode(HttpStatus.OK)
    async createUser(@Req() req) {
        const user: UserInterface = {
            name: req.query.name,
            cpf: req.query.cpf,
            cellphone: req.query.cellphone,
            password: req.query.password,
            typeId: req.query.typeId
        }
        return await this.userService.createUser(user)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Get('getUser')
    @HttpCode(HttpStatus.OK)
    async getUser(@Req() req) {
        return await this.userService.getUser(req.query.cpf)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Put('updateUser')
    @HttpCode(HttpStatus.OK)
    async updateUser(@Req() req) {
        const user: UserInterface = {
            name: req.query.name,
            cpf: req.query.cpf,
            cellphone: req.query.cellphone,
            password: req.query.password,
            typeId: req.query.typeId
        }
        return await this.userService.updateUser(user)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Delete('deleteUser')
    @HttpCode(HttpStatus.OK)
    async deteleUser(@Req() req) {
        return await this.userService.deleteUser(req.query.cpf)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }
}