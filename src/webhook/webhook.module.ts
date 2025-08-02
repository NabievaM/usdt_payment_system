import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { TransactionModule } from '../transaction/transaction.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [TransactionModule, OrderModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
