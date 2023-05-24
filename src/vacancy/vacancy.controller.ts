import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post("create")
  create(@Body() createVacancyDto: Vacancy) {
    return this.vacancyService.create(createVacancyDto);
  }

  @Get("getAll")
  findAll() {
    return this.vacancyService.findAll();
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
}
