import {
  Controller,
  Get,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  Body,
  Post,
  Put,
  Req,
  Delete,
  UseGuards
} from '@nestjs/common';
import { ServiceInterface } from 'src/interfaces/serviceInterface';
import { ServicesService } from './services.service';
import { JWTServiceGuard } from '../guards/services.guard';

@Controller('service')
export class ServiceController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('getAllServices')
  @UseGuards(JWTServiceGuard)
  @HttpCode(HttpStatus.OK)
  async getAllServices() {
    return await this.servicesService
      .getAllServices()
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
        throw new InternalServerErrorException();
      });
  }

  // @Get('getAllServicesById')
  // @HttpCode(HttpStatus.OK)
  // async getAllServicesById(@Req() req) {
  //   return await this.servicesService
  //     .getAllServicesById(req.query.id)
  //     .then((result) => {
  //       return result;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       throw new InternalServerErrorException();
  //     });
  // }

  @Post('createService')
  @UseGuards(JWTServiceGuard)
  @HttpCode(HttpStatus.OK)
  async createService(@Req() req) {
    const service: ServiceInterface = {
      product: req.query.products,
    };
    return this.servicesService.createService(service.product)
      .then((createdService) => {
        return createdService;
      })
      .catch((error) => {
        throw new Error(`Failed to create service: ${error.message}`);
      });
  }

  @Put('updateService')
  @UseGuards(JWTServiceGuard)
  @HttpCode(HttpStatus.OK)
  async updateService(@Req() req) {
    const service: ServiceInterface = {
      product: req.query.products,
    };
    return await this.servicesService.updateService(req.query.id, service)
    .then((result) => {
      return result;
    })
    .catch((e) => {
      console.log(e);
      throw new InternalServerErrorException();
    });
  }

  @Delete('deleteService')
  @UseGuards(JWTServiceGuard)
  @HttpCode(HttpStatus.OK)
  async deleteService(@Req() req) {
    return this.servicesService.deleteService(req.query.id)
    .then((result) => result)
    .catch((error) => {
        console.log(error);
        throw new InternalServerErrorException();
    })
  }

}
