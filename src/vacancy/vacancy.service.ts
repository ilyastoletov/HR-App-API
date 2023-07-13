import { Injectable } from '@nestjs/common';
import { ApplicantStatus, VacancyStatus } from '@prisma/client';
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

  async findAll(authorId: string) {
    const allVacancies = await this.prismaService.vacancy.findMany({where: { authorId: authorId }, orderBy: [{createdAt: 'desc'}, {vacancyStatus: 'asc'}] });
    for (var i = 0; i < allVacancies.length; i++) {
      let newApplicantsCount = 0;
      for (var j = 0; j < allVacancies[i].responderIds.length; j++) {
          const applicantObject = await this.prismaService.applicant.findUnique({ where: { applicantId: allVacancies[i].responderIds[j] } });
          if (applicantObject.status === ApplicantStatus.NEW) {
            newApplicantsCount++;
          }
      }
      allVacancies[i].newApplicantsCount = newApplicantsCount;
    }
    return allVacancies;
  }

  async findById(vacancyId: string) {
    const vacancy = await this.prismaService.vacancy.findUnique({ where: { vacancyId } });
    return vacancy;
  }

  async update(vacancy_Id: string, updateVacancyDto: UpdateVacancyDto) {
    const updatingResult = await this.prismaService.vacancy.update({ where: { vacancyId: vacancy_Id }, data: updateVacancyDto });
    return {messaage: "Vacancy updated", updated_object: updatingResult};
  }

  async remove(vacancy_Id: string) {
    const deletingVacancy = await this.prismaService.vacancy.findUnique({ where: { vacancyId: vacancy_Id } });
    const vacancyAuthorObject = await this.prismaService.user.findUnique({ where: { authorId: deletingVacancy.authorId } });
    const deletingVacancyIndex = vacancyAuthorObject.vacanciesIds.indexOf(vacancy_Id);
    delete vacancyAuthorObject.vacanciesIds[deletingVacancyIndex]
    await this.prismaService.user.update({ where: { authorId: vacancyAuthorObject.authorId }, data: { vacanciesIds: vacancyAuthorObject.vacanciesIds } });
    const removingResult = await this.prismaService.vacancy.delete({ where: { vacancyId: vacancy_Id } });
    return {messaage: "Vacancy removed", removed_object: removingResult};
  }

  async changeStatus(vacancyId: string, status: string) {
    let enumValueVacancyStatus: VacancyStatus;
    if (status === "OPEN") {
      enumValueVacancyStatus = VacancyStatus.OPEN;
    } else if (status == "PAUSED") {
      enumValueVacancyStatus = VacancyStatus.PAUSED;
    } else {
      enumValueVacancyStatus = VacancyStatus.STOPPED;
    }
    const updatedObject = await this.prismaService.vacancy.update({ where: { vacancyId: vacancyId }, data: { vacancyStatus: enumValueVacancyStatus } });
    return { message: "Vacancy status updated", updated_object: updatedObject };
  }
}
