import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Transaction } from '../transaction/transaction.model';

@ApiTags('Транзакции')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую транзакцию' })
  @ApiResponse({ status: 201, type: Transaction })
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех транзакций' })
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить транзакцию по ID' })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить транзакцию' })
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
