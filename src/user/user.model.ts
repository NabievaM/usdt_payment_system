import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { WalletAddress } from '../wallet_address/wallet_address.model';
import { Order } from '../order/order.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'Уникальный идентификатор пользователя',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'Иван Иванов',
    description: 'Имя пользователя (необязательно)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @HasMany(() => WalletAddress)
  walletAddresses: WalletAddress[];

  @HasMany(() => Order)
  orders: Order[];
}
