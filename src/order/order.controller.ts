import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';

@ApiTags('Заказы')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Создать заказ' })
  @ApiResponse({
    status: 201,
    description: 'Заказ и кошелёк успешно созданы',
  })
  async create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Post('monitor')
  @ApiOperation({ summary: 'Подтвердить оплату (мок транзакции)' })
  @ApiResponse({
    status: 200,
    description: 'Платёж подтвержден и заказ обновлён',
  })
  @ApiQuery({ name: 'address', required: true, description: 'TRON адрес' })
  @ApiQuery({
    name: 'receivedAmount',
    required: true,
    description: 'Сумма полученного платежа',
  })
  @ApiQuery({
    name: 'confirmations',
    required: true,
    description: 'Количество подтверждений',
  })
  async monitorTransaction(
    @Query('address') address: string,
    @Query('receivedAmount') receivedAmount: number,
    @Query('confirmations') confirmations: number,
  ) {
    return this.orderService.monitorTransaction(
      address,
      receivedAmount,
      confirmations,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Получить все заказы пользователя' })
  @ApiQuery({ name: 'user_id', required: true, description: 'ID пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Список заказов пользователя',
    type: [Order],
  })
  async getAll(@Query('user_id', ParseIntPipe) user_id: number) {
    return this.orderService.getAll(user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить заказ по ID' })
  @ApiResponse({
    status: 200,
    description: 'Информация о заказе',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Заказ не найден' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findById(id);
  }
}
