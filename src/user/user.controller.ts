import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { User } from './user.model';

@ApiTags('Пользователи')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiOperation({ summary: 'Создание нового пользователя' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
 