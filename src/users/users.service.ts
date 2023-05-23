import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userDto: User) {
    const createResult = await this.prismaService.user.create({ data: userDto }).catch((exception: any) => {
      console.log(exception);
    });
    return {message: "User created... maybe", user_data: createResult}
  }

  async findAll() {
    const allUsers = await this.prismaService.user.findMany()
    return allUsers
  }

  async findOne(id: number) {
    const result = await this.prismaService.user.findFirstOrThrow({ where: {id} });
    return result
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateOperation = await this.prismaService.user.update({where: {id}, data: updateUserDto})
    return {message: "User updated", updated_user: updateOperation}
  }

  async remove(id: number) {
    await this.prismaService.user.delete({where: {id}})
    return {message: "User deleted"}
  }
}
