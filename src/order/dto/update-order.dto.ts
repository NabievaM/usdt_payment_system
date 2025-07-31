import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    example: 'paid',
    description: 'Статус заказа: new, paid, expired',
    required: false,
  })
  status?: string;

  @ApiProperty({
    example: '2024-07-30T12:00:00Z',
    description: 'Дата оплаты',
    required: false,
  })
  paid_at?: Date;
}
