import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrductsModule } from './products/products.module';

@Module({
  imports: [PrductsModule, MongooseModule.forRoot('mongodb+srv://humayunkabir:nestjs-intro@nestjsintro-innxu.mongodb.net/nestjs-intro-db?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
