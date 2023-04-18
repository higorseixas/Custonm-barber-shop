import {
    Controller,
    Get,
    InternalServerErrorException,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Req,
    Body,
    Delete,
    HttpException
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
    async createUser(@Body() body) {
        const user: UserInterface = {
            name: body.name,
            cpf: body.cpf,
            cellphone: body.cellphone,
            password: body.password,
            typeId: body.typeId
        }
        return await this.userService.createUser(user)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Get('getUserById')
    @HttpCode(HttpStatus.OK)
    async getUserById(@Body() body) {
        return await this.userService.getUserById(body.id)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Get('getUser')
    @HttpCode(HttpStatus.OK)
    async getUser(@Body() body) {
        return await this.userService.getUser(body.cpf)
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

    
    @Get('getUserFromToken')
    @HttpCode(HttpStatus.OK)
    async getUserFromToken(@Req() req): Promise<UserInterface> {
        console.log(req.query.token)
        return this.userService.getUserFromToken(req.query.token)
          .then((result) => {
            return result;
          })
          .catch((error) => {
            throw new HttpException(error.message, error.status);
          });
    }

}