import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WalletAddressService } from '../../wallet_address/wallet_address.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { OrderService } from '../../order/order.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly walletService: WalletAddressService,
    private readonly transactionService: TransactionService,
    private readonly orderService: OrderService,
  ) {}

  // Этот крон-задача будет выполняться каждые 20 секунд
  @Cron('*/20 * * * * *')
  async handleCron() {
    this.logger.debug('⏰ Крон-задача запущена');

    const wallets = await this.walletService.findAll();

    for (const wallet of wallets) {
      try {
        const { balance } = await this.walletService.checkBalance(wallet.id);

        if (balance > 0) {
          const existingTx = await this.transactionService.findByWallet(
            wallet.address,
          );

          if (!existingTx) {
            await this.transactionService.create({
              fromAddress: 'external',
              toAddress: wallet.address,
              amount: balance,
              txHash: 'generated_or_fetched',
              network: 'TRON',
              status: 'success',
              orderId: wallet.order_id,
            });

            await this.orderService.updateStatusByWalletAddress(
              wallet.address,
              'paid',
            );

            this.logger.log(
              `💸 Оплата получена для кошелька: ${wallet.address}`,
            );
          }
        }
      } catch (err) {
        this.logger.error(
          `❌ Ошибка при проверке кошелька ${wallet.address}:`,
          err.message,
        );
      }
    }
  }
}
