import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { WalletAddress } from '../wallet_address/wallet_address.model';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model<Order> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => WalletAddress)
  @Column({ type: DataType.INTEGER, allowNull: true })
  wallet_address_id: number;

  @BelongsTo(() => WalletAddress)
  wallet_address: WalletAddress;

  @Column({ type: DataType.DECIMAL(20, 6), allowNull: false })
  amount: number;

  @Column({
    type: DataType.ENUM('new', 'paid', 'expired'),
    allowNull: false,
    defaultValue: 'new',
  })
  status: 'new' | 'paid' | 'expired';

  @Column({ type: DataType.DATE, allowNull: true })
  paid_at: Date;
}
