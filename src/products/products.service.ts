import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Механическая клавиатура', price: 89.99, stock: 10 },
    { id: 2, name: 'Беспроводная мышь', price: 24.9, stock: 25 },
    { id: 3, name: 'Монитор 27"', price: 319.1, stock: 3 },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findById(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}
