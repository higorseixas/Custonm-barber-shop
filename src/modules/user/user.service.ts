import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UserInterface } from '../../interfaces/userInterface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private readonly httpService: HttpService
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
                    return this.prisma.user.create({
                        data: {
                            name: requestUser.name,
                            cpf: requestUser.cpf.replace(/[^a-zA-Z0-9]/g, ''),
                            password: requestUser.password,
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
                            password: requestUser.password,
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
}