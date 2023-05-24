import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  async create(@Body() userDto: User) {
    console.log(userDto);
    return this.usersService.create(userDto);
  }

  @Get("getAll")
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('getById')
  async findOne(@Param('authorId') authorId: string) {
    return this.usersService.findOne(authorId);
  }

  @Patch('update')
  async update(@Param('authorId') authorId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(authorId, updateUserDto);
  }

  @Delete('delete')
  async remove(@Param('authorId') authorId: string) {
    return this.usersService.remove(authorId);
  }
}
