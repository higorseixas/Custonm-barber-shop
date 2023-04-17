import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { compare } from 'bcryptjs';
import { IUserAuthenticated } from 'src/interfaces/IUserAuthenticated';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private readonly httpService: HttpService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    async signInUser(requestUser: IUserAuthenticated) {
        return await this.userService.getUser(requestUser.cpf)
        .then(async (user) => {
            if (!user) {
                throw new HttpException('Usuário não encontrado!', HttpStatus.UNAUTHORIZED);
            } else {
                const passwordConfirmed = await compare(requestUser.password, user.password);
                
                if (!passwordConfirmed) {
                    throw new HttpException('Senha invalida!', HttpStatus.UNAUTHORIZED);
                } else {

                    const userWithoutPassword = { ...user };
                    delete userWithoutPassword.password;

                    const payload = { usertype: user.typeId, sub: user.id };

                    const token = await this.jwtService.signAsync(payload)

                    return { userWithoutPassword, token };
                }
            }
        })
        .catch((error) => {
            throw new Error(error.message)
        })
    }

}