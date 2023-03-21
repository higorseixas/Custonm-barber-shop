import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { CustomerInterface } from "../interfaces/customerInterface";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CustomerService {
    constructor(
        private prisma: PrismaService,
        private readonly httpService: HttpService
    ) { }

    async getAllCustomers() {
        return await this.prisma.customer.findMany({
            select: {
                id: true,
                name: true,
                cpf: true,
                email: true,
                cellphone: true,
                os: true,
                scheduling: true,
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

    async createCustomer(requestCustomer: CustomerInterface) {
        const newCustomer: CustomerInterface = {
            name: requestCustomer.name,
            cpf: requestCustomer.cpf,
            cellphone: requestCustomer.cellphone,
            email: requestCustomer.email
        }
        return await this.getCustomer(requestCustomer.email)
            .then(async (customer) => {
                if (!customer) {
                    return this.prisma.customer.create({ data: newCustomer })
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

    async getCustomer(email: string) {
        return await this.prisma.customer.findUnique({ where: { email: email } })
            .then((result) => result)
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
    }

    async updateCustomer(requestCustomer: CustomerInterface) {
        const newCustomer: CustomerInterface = {
            name: requestCustomer.name,
            cpf: requestCustomer.cpf,
            cellphone: requestCustomer.cellphone,
            email: requestCustomer.email
        }
        return await this.getCustomer(newCustomer.email)
            .then(async (customer) => {
                if (!customer) {
                    throw new Error('Customer não encontrado!')
                } else {
                    return await this.prisma.customer.update({
                        where: { email: newCustomer.email },
                        data: newCustomer
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

    async deleteCustomer(email: string) {
        return await this.getCustomer(email)
            .then(async (customer) => {
                if (!customer) {
                    throw new Error('Customer não encontrado!')
                } else {
                    return await this.prisma.customer.delete({ where: { email: email } })
                        .then()
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