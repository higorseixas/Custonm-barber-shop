import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ProductInterface } from '../interfaces/productInterface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService,
        private readonly httpService: HttpService
    ) { }

    async getAllProducts() {
        return await this.prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                serviceId: true,
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

    async createProduct(requesProduct: ProductInterface) {
        return await this.getProduct(requesProduct.id)
            .then(async (product) => {
                if (!product) {
                    return this.prisma.product.create({
                        data: {
                            name: requesProduct.name,
                            price: requesProduct.price,
                            serviceId: requesProduct.serviceId,
                        }
                    })
                        .then((result) => result)
                        .catch((error) => {
                            console.log(error)
                            throw new Error('Erro ao criar produto!')
                        })
                } else {
                    throw new Error('Produto já existe na base de dados!')
                }
            })
            .catch((error) => {
                console.log(error)
                throw new Error(error.message)
            })
    }

    async getProduct(id: string) {
        return await this.prisma.product.findUnique({ where: { id } })
            .then((result) => result)
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
    }

    async updateUser(requesProduct: ProductInterface) {
        return await this.getProduct(requesProduct.id)
            .then(async (product) => {
                if (!product) {
                    throw new Error('Produto não encontrado!')
                } else {
                    return await this.prisma.product.update({
                        where: { name: requesProduct.name },
                        data: {
                            name: requesProduct.name,
                            price: requesProduct.price,
                            serviceId: requesProduct.serviceId,
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

    async deleteProduct(id: string) {
        return await this.getProduct(id)
            .then(async (product) => {
                if (!product) {
                    throw new Error('Usuário não encontrado!')
                } else {
                    return await this.prisma.product.delete({ where: { id } })
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