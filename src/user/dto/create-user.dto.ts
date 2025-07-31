import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email, на который будет зарегистрирован пользователь',
  })
  email: string;

  @ApiProperty({
    example: 'Иван Иванов',
    description: 'Имя пользователя (необязательно)',
    required: false,
  })
  name?: string;
}
