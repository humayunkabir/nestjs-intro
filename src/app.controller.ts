import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { name: string, age: number } {
    // return this.appService.getHello();
    return {
      name: 'Humayun kabir',
      age: 27
    }
  }
}
