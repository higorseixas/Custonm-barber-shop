import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceModule } from './modules/services/services.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ProdctModule } from './modules/product/product.module';
import { OsModule } from './modules/os/os.module';
import { UserModule } from './modules/user/user.module';
import { UserTypeModule } from './modules/userTypes/userTypes.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ServiceModule, 
    ConfigModule.forRoot(), 
    UserModule, 
    ProdctModule, 
    CustomerModule, 
    UserTypeModule, 
    OsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, UserModule, ProdctModule, OsModule, CustomerModule, UserTypeModule, AuthModule],
})
export class AppModule { }
