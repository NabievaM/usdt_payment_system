import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  DefaultScope,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Order } from '../order/order.model';

@Table({ tableName: 'wallet_addresses', timestamps: true })
export class WalletAddress extends Model<WalletAddress> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  address: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'USDT-TRC20',
  })
  token_type: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: true })
  order_id: number;

  @BelongsTo(() => Order)
  order: Order;

  @Column({ type: DataType.DATE, allowNull: true })
  expires_at: Date;

  @Column({
    type: DataType.ENUM('active', 'expired', 'used'),
    defaultValue: 'active',
  })
  status: 'active' | 'expired' | 'used';

  @Column({ type: DataType.DECIMAL(20, 6), allowNull: true, defaultValue: 0 })
  received_amount: number;

  @Column({ type: DataType.DATE, allowNull: true })
  last_transaction_at: Date;
}
