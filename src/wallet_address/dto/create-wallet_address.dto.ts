import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateWalletAddressDto {
  @ApiProperty({
    example: 'TYM3M98rKGiMnckRLftKYz5FqFFB4n1piN',
    description: 'Уникальный адрес кошелька Tron (TRC20)',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: 1,
    description: 'ID пользователя, которому принадлежит данный кошелек',
  })
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @ApiProperty({
    example: 'USDT-TRC20',
    description: 'Тип токена, связанного с кошельком',
    default: 'USDT-TRC20',
    required: false,
  })
  @IsOptional()
  @IsString()
  token_type?: string;

  @ApiProperty({
    example: 'ORD-123456',
    description: 'ID связанного заказа (если имеется)',
    required: false,
  })
  @IsOptional()
  @IsString()
  order_id?: string;

  @ApiProperty({
    example: '2025-08-01T00:00:00.000Z',
    description: 'Дата и время истечения срока действия адреса',
    required: false,
  })
  @IsOptional()
  expires_at?: Date;
}
