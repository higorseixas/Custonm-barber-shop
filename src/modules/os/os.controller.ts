import {
  Controller,
  Get,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Delete,
  UseGuards
} from '@nestjs/common';
import { OsInterface } from 'src/interfaces/osInterface';
import { OsService } from './os.service';
import { JWTServiceGuard } from '../guards/services.guard';

@Controller('os')
export class OsController {
  constructor(private readonly osService: OsService) { }

  @Get('getAllServices')
  @UseGuards(JWTServiceGuard)
  @HttpCode(HttpStatus.OK)
  async getAllOs() {
    return await this.osService.getAllOs()
    .then((result) => result)
    .catch((error) => {
      console.log(error);
      throw new InternalServerErrorException();
    })
  }

  @Get('getOsById')
  @UseGuards(JWTServiceGuard)
  @HttpCode(HttpStatus.OK)
  async getOsById(@Req() req) {
    return await this.osService.getOsById(req.query.id)
    .then((result) => result)
    .catch((error) => {
      console.log(error);
      throw new InternalServerErrorException();
    })
  }

  @Post('createOs')
  @UseGuards(JWTServiceGuard)
  @HttpCode(HttpStatus.OK)
  async createOs(@Req() req) {
    const os: OsInterface = {
      price: req.query.name,
      pay_method: req.query.pay_method,
      userId: req.query.userId,
      customerId: req.query.customerId,
      serviceId: req.query.serviceId,
    }
    return await this.osService.createOs(os)
    .then((result) => result)
    .catch((error) => {
      console.log(error);
      throw new InternalServerErrorException();
    })
  }

  @Put('updateOs')
  @UseGuards(JWTServiceGuard)
  @HttpCode(HttpStatus.OK)
  async updateOs(@Req() req) {
    const os: OsInterface = {
      price: req.query.name,
      pay_method: req.query.pay_method,
      userId: req.query.userId,
      customerId: req.query.customerId,
      serviceId: req.query.serviceId,
    }
    return await this.osService.updateOs(req.query.id, os)
    .then((result) => result)
    .catch((error) => {
      console.log(error);
      throw new InternalServerErrorException();
    })
  }

  @Delete('deleteOs')
  @UseGuards(JWTServiceGuard)
  @HttpCode(HttpStatus.OK)
  async deteleUser(@Req() req) {
    return await this.osService.deleteOs(req.query.cpf)
    .then((result) => result)
    .catch((error) => {
      console.log(error);
      throw new InternalServerErrorException();
    })
  }
}