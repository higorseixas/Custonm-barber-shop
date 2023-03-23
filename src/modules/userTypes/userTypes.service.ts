import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { UserTypeInterface } from "../../interfaces/userTypeInterface";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserTypeService {
    constructor(
        private prisma: PrismaService,
        private readonly httpService: HttpService
    ) { }

    async getAllTypes() {
        return await this.prisma.userTypes.findMany({
            select: {
                id: true,
                type: true,
                createdAt: true,
                updatedAt: true
            }
        })
            .then((result) => result)
            .catch((error) => {
                console.log(error)
                throw new Error(error.message)
            })
    }

    async createType(requestType: UserTypeInterface) {
        return await this.getType(requestType.type)
            .then(async (type) => {
                if (!type) {
                    return this.prisma.userTypes.create({
                        data: {
                            type: requestType.type
                        }
                    })
                        .then((result) => result)
                        .catch((error) => {
                            console.log(error)
                            throw new Error('Erro ao criar usuário!')
                        })
                } else {
                    throw new Error('Tipo de usário já existe na base de dados!')
                }
            })
            .catch((error) => {
                console.log(error)
                throw new Error(error.message)
            })
    }

    async getType(type: string) {
        return await this.prisma.userTypes.findUnique({ where: { type: type } })
            .then((result) => result)
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
    }

    async updateType(requestType: UserTypeInterface) {
        return await this.getType(requestType.type)
            .then(async (type) => {
                if (!type) {
                    throw new Error('Tipo de usuário não encontrado!')
                } else {
                    return await this.prisma.userTypes.update({
                        where: { type: requestType.type },
                        data: {
                            type: requestType.type
                        }
                    })
                        .then((result) => result)
                        .catch((error) => {
                            console.error(error)
                            throw new Error(error.message)
                        })
                }
            })
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
    }

    async deleteUserType(type: string) {
        return await this.getType(type)
            .then(async (userType) => {
                if (!type) {
                    throw new Error('Tipo de usuário não encontrado!')
                } else {
                    return await this.prisma.userTypes.delete({ where: { type: userType.type } })
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