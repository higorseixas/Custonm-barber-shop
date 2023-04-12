import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { OsService } from './os.service';
import { OsController } from './os.controller';
import { ServicesService } from '../services/services.service';
import { ProdctModule } from '../product/product.module';
import { ServiceModule } from '../services/services.module';

@Module({
  controllers: [OsController],
  providers: [OsService, PrismaService, ServiceModule, ProdctModule],
  exports: [OsService],
  imports: [HttpModule]
})
export class OsModule {}