import { Injectable, NotFoundException } from "@nestjs/common"
import { Product } from "./product.model"
import { v1 as uuid } from 'uuid'

@Injectable()
export class ProductsService {
  private products: Product[] = []

  all() {
    return [...this.products]
  }

  create(title: string, description: string, price: number) {
    const id = uuid();
    const product = new Product(id, title, description, price)
    this.products.push(product)

    return id
  }

  read(id: string) {
    const [product] = this.find(id)
    return {...product}
  }

  update(id: string, title: string, description: string, price: number) {
    const [product, index] = this.find(id) 
    this.products[index] = {...product, ...{ title, description, price } }
    
    return this.products[index]
  }

  delete(id: string) {
    const [, index] = this.find(id)
    this.products.splice(index, 1)
  }

  private find(id: string): [Product, number] {
    const index = this.products.findIndex(product => product.id === id)
    const product = this.products[index]

    if(!product) throw new NotFoundException('Could not found the product.')

    return [product, index]
  }
}