import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { Order } from '../order/order.model';
import { WalletAddress } from '../wallet_address/wallet_address.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Order, WalletAddress])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [SequelizeModule],
})
export class UsersModule {}
