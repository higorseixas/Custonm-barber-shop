import { Injectable } from '@nestjs/common';
import { OsInterface } from 'src/interfaces/osInterface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ServicesService } from '../services/services.service';

@Injectable()
export class OsService {
  constructor(
    private prisma: PrismaService,
    private servicesService: ServicesService
  ) {}

  async getAllOs() {
    return this.prisma.os
      .findMany({
        select: {
          id: true,
          price: true,
          pay_method: true,
          userId: true,
          customerId: true,
          serviceId: true,
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

  async getOsById(osId: number) {
    return await this.prisma.os
      .findUnique({
        where: { id: osId } })
      .then((result) => result)
      .catch((error) => {
        console.log(error);
        throw new Error(error.message);
      });
  }

  async validateUniqueData(userId: number, customerId: number, serviceId: number) {
    return this.prisma.customer.findUnique({
      where: { id: userId },
    })
    .then((user) => {
      if (!user) {
        throw new Error(`User with id ${userId} does not exist.`);
      }
      return this.prisma.customer.findUnique({
        where: { id: customerId },
      })
    })
    .then((customer) => {
      if (!customer) {
        throw new Error(`Customer with id ${customerId} does not exist.`);
      }
      return this.servicesService.getServiceById(serviceId);
    })
    .then((service) => {
      if (!service) {
        throw new Error(`Service with id ${serviceId} does not exist.`);
      }
      return true;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });
  }
  
  
  async createOs(osInterface: OsInterface) {
    return await this.validateUniqueData(
      osInterface.userId, 
      osInterface.customerId, 
      osInterface.serviceId)
    .then(async(vaidate)=>{
      if (!vaidate){
        throw new Error('Erro')
      }
      return this.prisma.os
        .create({
          data: {
            price: osInterface.price,
            pay_method: osInterface.pay_method,
            userId: osInterface.userId,
            customerId: osInterface.customerId,
            serviceId: osInterface.serviceId,
          },
        })
        .catch((error) => {
          console.log(error);
          throw new Error('Error creating OS!');
        });
      })
      .catch((error) => {
        console.log(error)
        throw new Error(error.message)
      });
  }

  async updateOs(osId: number, osInterface: OsInterface) {
    return await this.getOsById(osId)
    .then(async (existingOs) => {
      if (!existingOs) {
        throw new Error('Os não encontrada!')
      } else {
        
        const isUniqueData = await this.validateUniqueData(
          osInterface.userId, 
          osInterface.customerId, 
          osInterface.serviceId)
        if (!isUniqueData) {
          throw new Error('Erro nas validações')
        }

        const { price, pay_method, userId, customerId, serviceId } = osInterface;
        const {
          price: existingPrice,
          pay_method: existingPayMethod,
          userId: existingUserId,
          customerId: existingCustomerId,
          serviceId: existingServiceId,
        } = existingOs;
  
        if (
          price === existingPrice &&
          pay_method === existingPayMethod &&
          userId === existingUserId &&
          customerId === existingCustomerId &&
          serviceId === existingServiceId
        ) {
          throw new Error('New data is same as current data, no update is needed');
        }
  
        return await this.prisma.os.update({
          where: { id: osId },
          data: osInterface,
        })
        .then((result) => result)
        .catch((error) => {
          console.log(error)
          throw new Error(error.message)
        });
      }
    })
    .catch((error) => {
      console.log(error)
      throw new Error(error.message)
    });
  }

  async deleteOs(osId: number) {
    return await this.getOsById(osId)
    .then(async (existingOs) => {
      if (!existingOs) {
          throw new Error('Os não encontrada!')
      } else {
          return await this.prisma.os.delete({ where: { id: osId } })
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
