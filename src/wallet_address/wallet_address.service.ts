import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WalletAddress } from './wallet_address.model';
import { CreateWalletAddressDto } from './dto/create-wallet_address.dto';
import { UpdateWalletAddressDto } from './dto/update-wallet_address.dto';
import * as process from 'process';
import { TronWeb } from 'tronweb';

@Injectable()
export class WalletAddressService {
  private tronWeb: any;

  constructor(
    @InjectModel(WalletAddress)
    private walletModel: typeof WalletAddress,
  ) {
    this.tronWeb = new TronWeb({
      fullHost: process.env.TRON_NODE_URL || 'https://api.trongrid.io',
    });
  }

  async create(dto: CreateWalletAddressDto) {
    const account = await this.tronWeb.createAccount();
    return this.walletModel.create({
      address: account.address.base58,
      user_id: dto.user_id,
    } as any);
  }

  async findAll() {
    return this.walletModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const wallet = await this.walletModel.findByPk(id);
    if (!wallet) throw new NotFoundException('Адрес кошелька не найден');
    return wallet;
  }

  async update(id: number, dto: UpdateWalletAddressDto) {
    const wallet = await this.findOne(id);
    return wallet.update(dto as any);
  }

  async remove(id: number) {
    const wallet = await this.findOne(id);
    return wallet.destroy();
  }

  async checkBalance(id: number) {
    const wallet = await this.findOne(id);
    const usdtContract = await this.tronWeb
      .contract()
      .at('TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj');

    const balance = await usdtContract.methods.balanceOf(wallet.address).call();

    return {
      address: wallet.address,
      balance: Number(balance) / 1_000_000,
    };
  }
}
