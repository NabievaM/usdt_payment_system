import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from '../transaction/transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Order } from 'src/order/order.model';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction)
    private transactionRepository: typeof Transaction,
  ) {}

  async create(dto: CreateTransactionDto) {
    return this.transactionRepository.create(dto as any);
  }

  async findAll() {
    return this.transactionRepository.findAll({ include: [Order] });
  }

  async findByWallet(address: string) {
    return this.transactionRepository.findOne({
      where: { toAddress: address },
    });
  }

  async findOne(id: number) {
    return this.transactionRepository.findByPk(id);
  }

  async remove(id: number) {
    const tx = await this.transactionRepository.findByPk(id);
    if (tx) {
      await tx.destroy();
    }
    return { message: 'Удалено' };
  }

  async findByHash(txHash: string) {
    return this.transactionRepository.findOne({
      where: { txHash },
    });
  }
}
