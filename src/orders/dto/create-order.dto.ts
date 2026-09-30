import { IsArray, IsEmail, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsEmail()
  customerEmail: string;

  @IsString()
  address: string;

  @IsArray()
  items: OrderItemDto[];

  @IsOptional()
  @IsString()
  promoCode?: string;
}
