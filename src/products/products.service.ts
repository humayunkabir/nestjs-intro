import { Injectable, NotFoundException } from "@nestjs/common"
import { Product } from "./product.model"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async all() {
    const products = await this.productModel.find().exec();
    return products.map(({ id, title, description, price }) => (({ id, title, description, price }))) as Product[]
  }

  async create(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price })
    const product = await newProduct.save()

    return product.id as string
  }

  async read(id: string) {
    const product = await this.find(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price
    }
  }

  async update(id: string, title: string, description: string, price: number) {
    const product = await this.find(id);

    if(title) product.title = title
    if(description) product.description = description
    if(price) product.price = price
    
    product.save();
  }

  async delete(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec()
    if (result.n === 0) throw new NotFoundException('Could not found the product.')
  }

  private async find(id: string): Promise<Product> {
    let product;

    try {
      product = await this.productModel.findById(id).exec()
    } catch(error) {
      throw new NotFoundException('Could not found the product.')
    }

    if(!product) throw new NotFoundException('Could not found the product.')

    return product 
  }
}