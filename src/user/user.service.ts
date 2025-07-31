import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(dto as any);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException(
          'Пользователь с таким email уже существует',
        );
      }
      throw error; 
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}
