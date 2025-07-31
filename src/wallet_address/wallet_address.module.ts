import { Module } from '@nestjs/common';
import { WalletAddressService } from './wallet_address.service';
import { WalletAddressController } from './wallet_address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WalletAddress } from './wallet_address.model';
import { User } from '../user/user.model';
import { Order } from '../order/order.model';

@Module({
  imports: [SequelizeModule.forFeature([WalletAddress, User, Order])],
  controllers: [WalletAddressController],
  providers: [WalletAddressService],
})
export class WalletAddressModule {}
