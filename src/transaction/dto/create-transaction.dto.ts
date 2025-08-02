import { IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 1, description: 'ID заказа' })
  @IsNumber()
  orderId: number;

  @ApiProperty({ example: 's...', description: 'Хеш транзакции' })
  @IsString()
  txHash: string;

  @ApiProperty({ example: 'pending', enum: ['pending', 'success', 'failed'], description: 'Статус' })
  @IsEnum(['pending', 'success', 'failed'])
  status: 'pending' | 'success' | 'failed';

  @ApiProperty({ example: '0xabc...', description: 'Отправитель (from)' })
  @IsString()
  fromAddress: string;

  @ApiProperty({ example: '0xdef...', description: 'Получатель (to)' })
  @IsString()
  toAddress: string;

  @ApiProperty({ example: 100.5, description: 'Сумма перевода' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'tron', description: 'Сеть (TRON, ETH и т.д.)' })
  @IsString()
  network: string;
}
