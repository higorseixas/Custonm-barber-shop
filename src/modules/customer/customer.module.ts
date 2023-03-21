import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
    controllers: [CustomerController],
    providers: [CustomerService, PrismaService],
    exports: [CustomerService],
    imports: [HttpModule]
})
export class UserModule { }