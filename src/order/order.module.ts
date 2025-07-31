import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { WalletAddress } from '../wallet_address/wallet_address.model';
import { User } from '../user/user.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [SequelizeModule.forFeature([Order, WalletAddress, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
