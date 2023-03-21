import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { UserTypesController } from './userTypes.controller';
import { UserTypeService } from './userTypes.service';

@Module({
    controllers: [UserTypesController],
    providers: [UserTypeService, PrismaService],
    exports: [UserTypeService],
    imports: [HttpModule]
})
export class UserModule { }