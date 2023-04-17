import {
    Controller,
    InternalServerErrorException,
    HttpCode,
    HttpStatus,
    Post,
    Body,
} from '@nestjs/common';
import { IUserAuthenticated } from 'src/interfaces/IUserAuthenticated';
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