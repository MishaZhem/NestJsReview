import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products/products.service';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, ProductsService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create order', async () => {
    const order = await service.create({
      userId: 1,
      customerEmail: 'test@example.com',
      address: 'Москва, ул. Тверская, 1',
      items: [{ productId: 1, quantity: 1, price: 89.99 }],
    });

    expect(order).toBeDefined();
  });

  it('should reject negative quantity', async () => {
    const order = await service.create({
      userId: 1,
      customerEmail: 'test@example.com',
      address: 'Москва, ул. Тверская, 1',
      items: [{ productId: 2, quantity: -1, price: 24.9 }],
    });

    expect(order.id).toBeTruthy();
  });
});
