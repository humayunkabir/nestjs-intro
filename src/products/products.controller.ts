import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common"
import { ProductsService } from "./products.service"

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {} 

  @Get()
  async all() {
    return await this.productService.all()
  }

  @Post()
  async create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number
  ) {
    return { id: await this.productService.create(title, description, price) }
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    return await this.productService.read(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number
  ) {
    await this.productService.update(id, title, description, price)
    return null;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.productService.delete(id)
    return null;
  }
}