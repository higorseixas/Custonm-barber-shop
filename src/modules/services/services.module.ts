import { Module } from '@nestjs/common';
import { ServiceController } from './services.controller';
import { ServicesService } from './services.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios/dist';

@Module({
  controllers: [ServiceController],
  providers: [ServicesService, PrismaService],
  exports: [ServicesService],
  imports: [HttpModule]
})
export class ServiceModule {}
