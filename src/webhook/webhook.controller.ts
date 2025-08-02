import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('transaction')
  async handleWebhook(@Body() data: any) {
    return this.webhookService.processTransaction(data);
  }
}
