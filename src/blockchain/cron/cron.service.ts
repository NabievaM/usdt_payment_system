import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WalletAddressService } from '../../wallet_address/wallet_address.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { OrderService } from '../../order/order.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  // Храним последний timestamp для каждого адреса
  private lastTimestamps = new Map<string, number>();

  constructor(
    private readonly walletService: WalletAddressService,
    private readonly transactionService: TransactionService,
    private readonly orderService: OrderService,
  ) {}

  @Cron('*/20 * * * * *')
  async handleCron() {
    this.logger.debug('⏰ Крон-задача запущена');

    const wallets = await this.walletService.findAll();

    for (const wallet of wallets) {
      try {
        const since = this.lastTimestamps.get(wallet.address) || 0;

        const recentTxs = await this.walletService.getRecentTransactions(
          wallet.address,
          since,
        );

        if (recentTxs.length) {
          for (const tx of recentTxs) {
            const txHash = tx.txID;

            const exists = await this.transactionService.findByHash(txHash);
            if (exists) continue;

            const contractParam = tx.raw_data.contract[0].parameter.value;
            const amount = Number(contractParam.amount) / 1_000_000;

            const fromAddress = this.walletService
              .getTronWeb()
              .address.fromHex(contractParam.owner_address);

            await this.transactionService.create({
              fromAddress,
              toAddress: wallet.address,
              amount,
              txHash,
              network: 'TRON',
              status: 'success',
              orderId: wallet.order_id,
            });

            await this.orderService.updateStatusByWalletAddress(
              wallet.address,
              'paid',
            );

            this.logger.log(`💸 Транзакция зафиксирована: ${txHash}`);
          }

          // Обновляем последний timestamp
          const latest = Math.max(
            ...recentTxs.map((t: any) => t.raw_data.timestamp),
          );
          this.lastTimestamps.set(wallet.address, latest);
        }
      } catch (err) {
        this.logger.error(
          `❌ Ошибка при проверке транзакций ${wallet.address}:`,
          err.message,
        );
      }
    }
  }
}
