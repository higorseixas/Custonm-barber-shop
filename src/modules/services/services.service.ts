import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ServiceInterface } from 'src/interfaces/serviceInterface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ProductService } from '../product/product.service';
import ProductWhereUniqueInput from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService,
  ) {}

  async getAllServices() {
    return this.prisma.service
      .findMany({
        select: {
          id: true,
          product: true,
          os: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      .then((result) => result)
      .catch((error) => {
        console.log(error);
        throw new Error();
      });
  }

  async getAllServicesById(serviceId: number) {
    return this.prisma.service
      .findMany({
        where: { id: serviceId },
        select: { product: true, os: true },
      })
      .then((result) => result)
      .catch((error) => {
        console.log(error);
        throw new Error(error.message);
      });
  }

  async createService(product: number[]) {
    const productPromises: Promise<Product>[] = product.map(async (element) => {
      return await this.productService.getProduct(element)
    });
    const products: Product[] = await Promise.all(productPromises)
    const productIds = products.map(product => ({ id: product.id }));
    return await this.prisma.service
      .create({
        data: {
          product: {
            connect: productIds,
          },
        },
        include: { product: true },
      })
      .then((createdService) => {
        return createdService;
      })
      .catch((error: Error) => {
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
          throw new Error('Service does not exist.');
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
                `Product with ID ${productId} does not belong to service with ID ${serviceId}`,
              );
            }
            return { id: existingProduct.id };
          }),
        );

        return this.prisma.service.update({
          where: { id: serviceId },
          data: { product: { set: productIds } },
          include: { product: true },
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  async deleteService(serviceId: number) {
    return this.prisma.service
      .delete({
        where: {
          id: serviceId,
        },
      })
      .then((result) => result)
      .catch((error) => {
        console.log(error);
        throw new Error();
      });
  }
}
