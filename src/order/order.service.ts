import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { WalletAddress } from '../wallet_address/wallet_address.model';
import { User } from '../user/user.model';
import { v4 as uuidv4 } from 'uuid';
// import * as moment from 'moment';
import moment from 'moment';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderRepository: typeof Order,
    @InjectModel(WalletAddress)
    private readonly walletAddressRepository: typeof WalletAddress,
  ) {}

  async create(dto: CreateOrderDto) {
    const { user_id, amount } = dto;

    const walletAddress = await this.walletAddressRepository.create({
      address: this.generateTronAddress(),
      user_id,
      expires_at: moment().add(10, 'minutes').toDate(),
    } as any);

    const order = await this.orderRepository.create({
      user_id,
      wallet_address_id: walletAddress.id,
      amount,
      status: 'new',
    } as any);

    return {
      order_id: order.id,
      wallet_address: walletAddress.address,
      expires_at: walletAddress.expires_at,
    };
  }

  generateTronAddress(): string {
    return 'T' + uuidv4().replace(/-/g, '').slice(0, 33);
  }

  async monitorTransaction(
    address: string,
    receivedAmount: number,
    confirmations: number,
  ) {
    const wallet = await this.walletAddressRepository.findOne({
      where: { address },
      include: [Order],
    });

    if (!wallet) {
      throw new NotFoundException('Кошелёк не найден');
    }

    if (wallet.expires_at && new Date() > wallet.expires_at) {
      throw new Error('Срок действия адреса истёк');
    }

    const order = wallet.order;
    if (!order) {
      throw new NotFoundException('Заказ для данного кошелька не найден');
    }

    if (confirmations < 1) {
      throw new Error('Недостаточно подтверждений');
    }

    if (receivedAmount < parseFloat(order.amount.toString())) {
      throw new Error('Недостаточная сумма платежа');
    }

    order.status = 'paid';
    order.paid_at = new Date();
    await order.save();

    console.log(`💰 Заказ ${order.id} успешно оплачен.`);

    return {
      message: 'Платёж подтверждён и заказ обновлён.',
    };
  }

  async getAll(user_id: number) {
    return this.orderRepository.findAll({
      where: { user_id },
      include: [WalletAddress],
    });
  }

  async findById(id: number) {
    const order = await this.orderRepository.findByPk(id, {
      include: [WalletAddress, User],
    });

    if (!order) {
      throw new NotFoundException('Заказ не найден');
    }

    return order;
  }
}
