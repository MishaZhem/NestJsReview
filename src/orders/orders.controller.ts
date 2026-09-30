import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../common/admin.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { PROMO_CODES } from './promo-codes';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    try {
      let discount = 0;

      if (dto.promoCode) {
        const promo = PROMO_CODES.find((p) => p.code === dto.promoCode);
        if (promo && promo.usedCount <= promo.maxUses && new Date(promo.expiresAt) > new Date()) {
          discount = promo.discountPercent;
          promo.usedCount++;
        }
      }

      return await this.ordersService.create(dto, discount);
    } catch (e) {
      return { error: e.message };
    }
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.ordersService.findAll(userId ? +userId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.ordersService.cancel(+id);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    this.ordersService.remove(+id);
  }
}
