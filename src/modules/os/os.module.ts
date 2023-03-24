import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { OsService } from './os.service';
import { OsController } from './os.controller';

@Module({
  controllers: [OsController],
  providers: [OsService, PrismaService],
  exports: [OsService],
  imports: [HttpModule]
})
export class OsModule {}