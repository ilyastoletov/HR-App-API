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

  @Get("getAllUsers")
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('getById')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('updateUser')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('deleteUser')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
