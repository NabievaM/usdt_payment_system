import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { WalletAddressService } from './wallet_address.service';
import { CreateWalletAddressDto } from './dto/create-wallet_address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet_address.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { WalletAddress } from './wallet_address.model';

@ApiTags('Кошельки пользователей')
@Controller('wallet-address')
export class WalletAddressController {
  constructor(private readonly service: WalletAddressService) {}

  @ApiOperation({ summary: 'Создать новый Tron-кошелек для пользователя' })
  @ApiResponse({ status: 201, type: WalletAddress })
  @Post()
  create(@Body() dto: CreateWalletAddressDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Получить список всех кошельков' })
  @ApiResponse({ status: 200, type: [WalletAddress] })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Получить кошелек по ID' })
  @ApiResponse({ status: 200, type: WalletAddress })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновить информацию о кошельке' })
  @ApiResponse({ status: 200, type: WalletAddress })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWalletAddressDto) {
    return this.service.update(+id, dto);
  }

  @ApiOperation({ summary: 'Удалить кошелек' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @ApiOperation({ summary: 'Проверить баланс USDT на кошельке' })
  @Get(':id/balance')
  checkBalance(@Param('id') id: string) {
    return this.service.checkBalance(+id);
  }

  @Get('recent-transactions')
  @ApiOperation({
    summary: 'Получить транзакции по адресу после определённого времени',
  })
  @ApiQuery({
    name: 'address',
    type: String,
    description: 'TRON-адрес получателя',
  })
  @ApiQuery({
    name: 'since',
    type: Number,
    description: 'Timestamp в миллисекундах',
  })
  async getRecentTransactions(
    @Query('address') address: string,
    @Query('since') since: string,
  ) {
    const sinceTimestamp = parseInt(since, 10);
    return this.service.getRecentTransactions(address, sinceTimestamp);
  }
}
