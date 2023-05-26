import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacancyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVacancyDto: CreateVacancyDto) {
    const creatingResult = await this.prismaService.vacancy.create({ data: createVacancyDto });
    const authorObject = await this.prismaService.user.findUnique({ where: { authorId: createVacancyDto.authorId } });
    authorObject.vacanciesIds.push(creatingResult.vacancyId);
    await this.prismaService.user.update({ where: { authorId: createVacancyDto.authorId }, data: { vacanciesIds: authorObject.vacanciesIds } });
    return {messaage: "Vacancy created", created_object: creatingResult};
  }

  async findAll() {
    const allVacancies = await this.prismaService.vacancy.findMany();
    return allVacancies;
  }

  async findById(vacancyId: string) {
    const vacancy = await this.prismaService.vacancy.findUnique({ where: { vacancyId } });
    return {object: vacancy, id: vacancyId};
  }

  async update(vacancy_Id: string, updateVacancyDto: UpdateVacancyDto) {
    const updatingResult = await this.prismaService.vacancy.update({ where: { vacancyId: vacancy_Id }, data: updateVacancyDto });
    return {messaage: "Vacancy updated", updated_object: updatingResult};
  }

  async remove(vacancy_Id: string) {
    const removingResult = await this.prismaService.vacancy.delete({ where: { vacancyId: vacancy_Id } });
    return {messaage: "Vacancy removed", removed_object: removingResult};
  }
}
