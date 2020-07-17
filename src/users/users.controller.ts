import {
  Controller,
  Get,
  Body,
  Post,
  Patch,
  UseGuards,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAll(undefined, undefined);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() userDto: UserDTO): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param() params): Promise<User> {
    return this.usersService.findById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param() params, @Body() userDto: UserDTO): Promise<User> {
    return this.usersService.updateUser(params.id, userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params): Promise<any> {
    return this.usersService.remove(params.id);
  }
}
