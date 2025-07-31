import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  user_id: number;

  @ApiProperty({ example: 99.99, description: 'Сумма заказа' })
  amount: number;
}
