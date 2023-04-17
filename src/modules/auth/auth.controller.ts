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
    Delete
} from '@nestjs/common';
import { IUserAuthenticated } from 'src/interfaces/IUserAuthenticated';
import { UserInterface } from '../../interfaces/userInterface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signInUser')
    @HttpCode(HttpStatus.OK)
    async signInUser(@Body() body) {
        const user: IUserAuthenticated = {
            cpf: body.cpf,
            password: body.password,
        }
        return await this.authService.signInUser(user)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }
}