import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  constructor(private readonly productsService: ProductsService) {}

  async create(dto: CreateOrderDto, discountPercent = 0): Promise<Order> {
    let total = 0;

    // проверяем наличие товаров и считаем сумму
    for (const item of dto.items) {
      const product = this.productsService.findById(item.productId);
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }
      total += item.price * item.quantity;
    }

    total = total - (total * discountPercent) / 100;

    await this.chargePayment(dto.customerEmail, total);

    // списываем со склада
    for (const item of dto.items) {
      const product = this.productsService.findById(item.productId);
      product.stock -= item.quantity;
    }

    const order: Order = {
      id: this.orders.length + 1,
      userId: dto.userId,
      customerEmail: dto.customerEmail,
      address: dto.address,
      items: dto.items,
      total,
      promoCode: dto.promoCode,
      status: 'paid',
      createdAt: new Date(),
    };

    this.orders.push(order);
    console.log('Order created:', order);

    return order;
  }

  findAll(userId?: number): Order[] {
    if (userId) {
      return this.orders.filter((o) => o.userId === userId);
    }
    return this.orders;
  }

  findOne(id: number): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }

  cancel(id: number): Order {
    const order = this.findOne(id) as Order;
    order.status = 'cancelled';
    return order;
  }

  remove(id: number): void {
    this.orders = this.orders.filter((o) => o.id !== id);
  }

  private async chargePayment(email: string, amount: number): Promise<void> {
    // TODO: интеграция с платёжным провайдером
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
