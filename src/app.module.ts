import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrductsModule } from './products/products.module';

@Module({
  imports: [PrductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
