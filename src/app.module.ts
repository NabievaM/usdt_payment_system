import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './user/user.module';
import { User } from './user/user.model';
import { WalletAddressModule } from './wallet_address/wallet_address.module';
import { WalletAddress } from './wallet_address/wallet_address.model';
import { OrderModule } from './order/order.module';
import { Order } from './order/order.model';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/transaction.model';
import { CronService } from './blockchain/cron/cron.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT!,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, WalletAddress, Order, Transaction],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    WalletAddressModule,
    OrderModule,
    TransactionModule,
  ],
  providers: [CronService],
})
export class AppModule {}
