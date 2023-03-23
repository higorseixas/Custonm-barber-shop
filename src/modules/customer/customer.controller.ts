import { Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, Post, Put, Req } from "@nestjs/common";
import { CustomerInterface } from "../../interfaces/customerInterface";
import { CustomerService } from "./customer.service";

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('getAllCustomers')
    @HttpCode(HttpStatus.OK)
    async getAllCustomers() {
        return await this.customerService.getAllCustomers()
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Post('createCustomer')
    @HttpCode(HttpStatus.OK)
    async createCustomer(@Req() req) {
        const customer: CustomerInterface = {
            name: req.query.name,
            cpf: req.query.cpf,
            cellphone: req.query.cellphone,
            email: req.query.email
        }
        return await this.customerService.createCustomer(customer)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Get('getCustomer')
    @HttpCode(HttpStatus.OK)
    async getCustomer(@Req() req) {
        return await this.customerService.getCustomer(req.query.email)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Put('updateCustomer')
    @HttpCode(HttpStatus.OK)
    async updateCustomer(@Req() req) {
        const customer: CustomerInterface = {
            name: req.query.name,
            cpf: req.query.cpf,
            cellphone: req.query.cellphone,
            email: req.query.email
        }
        return await this.customerService.updateCustomer(customer)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }

    @Delete('deleteCustomer')
    @HttpCode(HttpStatus.OK)
    async deleteCustomer(@Req() req) {
        return await this.customerService.deleteCustomer(req.query.email)
            .then((result) => result)
            .catch((error) => {
                console.log(error);
                throw new InternalServerErrorException();
            })
    }
}