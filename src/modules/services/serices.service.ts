import { Injectable } from '@nestjs/common';
import { ServiceInterface } from 'src/interfaces/serviceInterface';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getAllServices() {
    return this.prisma.service
      .findMany({ select: { products: true, os: true } })
      .then((result) => result)
      .catch((error) => {
        console.log(error)
        throw new Error();
      });
  }

  async getAllServicesById(serviceId: string) {
    return this.prisma.service
    .findMany({ were: {id: serviceId},
      select: { products: true, os: true } })
    .then((result) => result)
    .catch((e) => {
      console.log(e);
    });
  }

  async createService(service: ServiceInterface) {
    return this.prisma.service
      .create({
        data: {
          product: { create: service.product.map((productId) => ({ id: productId })) },
        },
        include: { product: true },
      })
      .then((createdService) => {
        return createdService;
      })
      .catch((error) => {
        throw new Error(`Failed to create service: ${error.message}`);
      });
  }
  

  async updateService(serviceId: number, service: ServiceInterface) {
    return this.prisma.service
    .findUnique({
      where: { id: serviceId },
    })
    .then(async (existingService) => {
      if (!existingService) {
        throw new Error("Service does not exist.");
      }

      const productIds = await Promise.all(
        service.product.map(async (productId) => {
          const existingProduct = await this.prisma.product.findUnique({
            where: { id: Number(productId) },
          });
          if (!existingProduct) {
            throw new Error(`Product with ID ${productId} not found`);
          }
          if (existingProduct.serviceId !== serviceId) {
            throw new Error(
              `Product with ID ${productId} does not belong to service with ID ${serviceId}`
            );
          }
          return existingProduct.id;
        })
      );

      return this.prisma.service.update({
        where: { id: serviceId },
        data: { products: { set: productIds } },
        include: { product: true },
      });
    })
    .catch((error) => {
      throw error;
    });
  }

   
  async deleteService(serviceId: number) {
    return this.prisma.service.delete({
      where: {
        id: serviceId,
      },
    })
    .then((result) => result)
    .catch((error) => {
      console.log(error)
      throw new Error();
    })
  }   

}
