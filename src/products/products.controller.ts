import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common"
import { ProductsService } from "./products.service"

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {} 

  @Get()
  all() {
    return this.productService.all()
  }

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number
  ) {
    return { id: this.productService.create(title, description, price) }
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.productService.read(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number
  ) {
    return this.productService.update(id, title, description, price)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.productService.delete(id)
  }
}