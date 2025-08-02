import { Injectable } from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service';
import { OrderService } from '../order/order.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly orderService: OrderService,
  ) {}

  async processTransaction(data: any) {
    const { txHash, fromAddress, toAddress, amount } = data;

    const exists = await this.transactionService.findByHash(txHash);
    if (exists) return { message: 'Транзакция уже существует' };

    const order = await this.orderService.findByWalletAddress(toAddress);
    if (!order) return { message: 'Заказ не найден' };

    const orderId = order.id;

    await this.transactionService.create({
      orderId,
      txHash,
      fromAddress,
      toAddress,
      amount,
      network: 'TRON',
      status: 'success',
    });

    await this.orderService.updateStatusByWalletAddress(toAddress, 'paid');

    return { message: 'Транзакция сохранена, заказ обновлён' };
  }
}
