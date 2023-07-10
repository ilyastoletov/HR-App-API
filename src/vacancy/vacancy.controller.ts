import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { VacancyStatus } from '@prisma/client';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post("create")
  create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacancyService.create(createVacancyDto);
  }

  @Get("getAll")
  findAll(@Query('user_id') userId: string) {
    return this.vacancyService.findAll(userId);
  }

  @Get("getById")
  findOne(@Query('vacancyId') id: string) {
    return this.vacancyService.findById(id);
  }

  @Patch("update")
  update(@Query('vacancyId') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacancyService.update(id, updateVacancyDto);
  }

  @Delete("delete")
  remove(@Query('vacancyId') id: string) {
    return this.vacancyService.remove(id);
  }

  @Patch("changeStatus")
  changeStatus(@Query('vacancyId') id: string, @Query("status") status: VacancyStatus) {
    return this.vacancyService.changeStatus(id, status);
  }

}
