import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  async create(@Body() userDto: User) {
    console.log(userDto);
    return this.usersService.create(userDto);
  }

  @Post("login")
  async login(@Body() userDto: UserLoginDto) {
    console.log(userDto);
    return this.usersService.login(userDto);
  }

  @Get("getAll")
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('getById')
  async findOne(@Query('authorId') authorId: string) {
    return this.usersService.findOne(authorId);
  }

  @Patch('update')
  async update(@Query('authorId') authorId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(authorId, updateUserDto);
  }

  @Delete('delete')
  async remove(@Query('authorId') authorId: string) {
    return this.usersService.remove(authorId);
  }
}
