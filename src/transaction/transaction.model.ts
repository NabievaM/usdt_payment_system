import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../order/order.model';

@Table({ tableName: 'transactions' })
export class Transaction extends Model<Transaction> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор транзакции',
  })
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ApiProperty({ example: 5, description: 'ID связанного заказа (order)' })
  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ApiProperty({
    example: '0x123abc...',
    description: 'Хэш транзакции в блокчейне',
  })
  @Column
  txHash: string;

  @ApiProperty({
    example: 'pending',
    description: 'Статус транзакции (ожидание, успех, неудача)',
    enum: ['pending', 'success', 'failed'],
  })
  @Column(DataType.ENUM('pending', 'success', 'failed'))
  status: 'pending' | 'success' | 'failed';

  @ApiProperty({ example: '0xFromAddress', description: 'Адрес отправителя' })
  @Column
  fromAddress: string;

  @ApiProperty({ example: '0xToAddress', description: 'Адрес получателя' })
  @Column
  toAddress: string;

  @ApiProperty({ example: 100.5, description: 'Сумма перевода в USDT' })
  @Column(DataType.FLOAT)
  amount: number;

  @ApiProperty({
    example: 'ethereum',
    description: 'Сеть, по которой проходит транзакция',
  })
  @Column
  network: string;
}
