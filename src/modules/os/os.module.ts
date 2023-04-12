import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { OsService } from './os.service';
import { OsController } from './os.controller';
import { ProdctModule } from '../product/product.module';
import { ServiceModule } from '../services/services.module';
import { ServicesService } from '../services/services.service';
import { ProductService } from '../product/product.service';

@Module({
  controllers: [OsController],
  providers: [OsService, PrismaService, ServicesService, ProductService],
  exports: [OsService],
  imports: [HttpModule]
})
export class OsModule { }