import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserInterface } from '../../interfaces/userInterface';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private readonly httpService: HttpService,
        private readonly jwtService: JwtService,
    ) { }

    async getAllUsers() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                cpf: true,
                cellphone: true,
                userType: true,
                typeId: true,
                scheduling: true,
                os: true,
                createdAt: true,
                updatedAt: true,
            }
        })
            .then((result) => result)
            .catch((error) => {
                console.log(error)
                throw new Error(error.message)
            })
    }

    async createUser(requestUser: UserInterface) {
        return await this.getUser(requestUser.cpf)
            .then(async (user) => {
                if (!user) {
                    const hashedPassword = await hash(requestUser.password, 10)

                    return this.prisma.user.create({
                        data: {
                            name: requestUser.name,
                            cpf: requestUser.cpf.replace(/[^a-zA-Z0-9]/g, ''),
                            password: hashedPassword,
                            cellphone: requestUser.cellphone,
                            typeId: requestUser.typeId
                        }
                    })
                        .then((result) => result)
                        .catch((error) => {
                            console.log(error)
                            throw new Error('Erro ao criar usuário!')
                        })
                } else {
                    throw new Error('Usuário já existe na base de dados!')
                }
            })
            .catch((error) => {
                console.log(error)
                throw new Error(error.message)
            })
    }

    async getUserById(id: number) {
        return await this.prisma.user.findUnique({ where: { id: id } })
            .then((result) => result)
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
    }

    async getUser(cpf: string) {
        return await this.prisma.user.findUnique({ where: { cpf: cpf } })
            .then((result) => result)
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
    }

    async updateUser(requestUser: UserInterface) {
        return await this.getUser(requestUser.cpf)
            .then(async (user) => {
                if (!user) {
                    throw new Error('Usuário não encontrado!')
                } else {
                    return await this.prisma.user.update({
                        where: { cpf: requestUser.cpf },
                        data: {
                            name: requestUser.name,
                            cellphone: requestUser.cellphone,
                            typeId: requestUser.typeId
                        }
                    })
                        .then((result) => result)
                        .catch((error) => {
                            console.log(error)
                            throw new Error(error.message)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
                throw new Error(error.message)
            })
    }

    async deleteUser(cpf: string) {
        return await this.getUser(cpf)
            .then(async (user) => {
                if (!user) {
                    throw new Error('Usuário não encontrado!')
                } else {
                    return await this.prisma.user.delete({ where: { cpf: cpf } })
                        .then((result) => result)
                        .catch((error) => {
                            console.log(error)
                            throw new Error(error.message)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
                throw new Error(error.message)
            })
    }

    async getUserFromToken(token: string): Promise<UserInterface> {
        console.log(token)
        return this.jwtService.verifyAsync(token)
            .then(async (payload) => {
            const user = await this.getUserById(payload.sub)
    
            if (user) {
                const userWithoutPassword = { ...user };
                delete userWithoutPassword.password;

                return userWithoutPassword;
    
            } else {
                throw new HttpException('Usuário não encontrado!', HttpStatus.UNAUTHORIZED);
            }
    
            })
            .catch((error) => {
            console.log(error);
            throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
            });
    }

}