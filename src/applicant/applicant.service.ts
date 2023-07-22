import { Injectable } from '@nestjs/common';
import { Applicant, ApplicantStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { SearchApplicantDto } from './dto/search-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Injectable()
export class ApplicantService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createApplicantDto: CreateApplicantDto) {
    const createdObject = await this.prismaService.applicant.create({ data: createApplicantDto });
    const appliedVacancyObject = await this.prismaService.vacancy.findUnique({ where: { vacancyId: createApplicantDto.appliedVacancyId } });
    appliedVacancyObject.responderIds.push(createdObject.applicantId);
    await this.prismaService.vacancy.update({ where: { vacancyId: createApplicantDto.appliedVacancyId }, data: { responderIds: appliedVacancyObject.responderIds } });
    return {message: 'Applicant created', createdApplicant: createdObject};
  }

  async createMany(applicantsArray: CreateApplicantDto[]) {
    for (var i = 0; i < applicantsArray.length; i++) {
      await this.create(applicantsArray[i]);
    }
    return {message: "Applicants created"};
  }

  async findAllByVacancyId(vacancyId: string) {
    const applicants = await this.prismaService.applicant.findMany({ where: { appliedVacancyId: vacancyId } });
    return applicants;
  }

  async getAll() {
    const allApplicantsList = await this.prismaService.applicant.findMany();
    return allApplicantsList;
  }

  async findByPage(vacancyId: string, page: number, status: ApplicantStatus) {
    const allApplicantsList = await this.prismaService.applicant.findMany({ where: { appliedVacancyId: vacancyId } });
    const statusFilteredList = allApplicantsList.filter((applicant) => applicant.status === status);
    let slicedApplicantsList: Applicant[];
    if (allApplicantsList.length >= 10 || allApplicantsList.length >= page * 10) {
      slicedApplicantsList = statusFilteredList.slice((page * 10) - 10, (page * 10) - 1);
    } else {
      slicedApplicantsList = statusFilteredList.slice((page * 10) - 10, allApplicantsList.length);
    }
    return slicedApplicantsList
  }

  async findOne(applicantId: string) {
    const applicant = await this.prismaService.applicant.findUnique({ where: { applicantId } });
    return applicant;
  }

  async update(applicantId: string, updateApplicantDto: UpdateApplicantDto) {
    const updatedObject = await this.prismaService.applicant.update({ where: { applicantId }, data: updateApplicantDto });
    return {message: 'Applicant updated', updatedApplicant: updatedObject};
  }

  async remove(applicantId: string) {
    const deletingApplicantObject = await this.prismaService.applicant.findUnique({ where: { applicantId: applicantId } });
    const parentVacancyObject = await this.prismaService.vacancy.findUnique({ where: { vacancyId: deletingApplicantObject.appliedVacancyId } });
    const applicantIndex = parentVacancyObject.responderIds.indexOf(applicantId);
    delete parentVacancyObject.responderIds[applicantIndex]
    await this.prismaService.vacancy.update({ where: { vacancyId: parentVacancyObject.vacancyId }, data: { responderIds: parentVacancyObject.responderIds } });
    const deletedObject = await this.prismaService.applicant.delete({ where: { applicantId } });
    return {message: 'Applicant deleted', deletedApplicant: deletedObject};
  }

  async changeStatus(applicantId: string, status: string) {
      const enumApplicantStatus = this.getEnumStatusFromString(status)
      const updatedObject = await this.prismaService.applicant.update({ where: { applicantId: applicantId }, data: { status: enumApplicantStatus } })
      return {message: "Applicant status updated", updated_object: updatedObject}
  }

  async search(query: string, city: string, wantedSalaryBottom: string, wantedSalaryTop: string, fullWorkDay?: boolean) {
    const allApplicantsList = await this.prismaService.applicant.findMany({ where: { status: ApplicantStatus.NEW }});
    const filteredByQuery = allApplicantsList.filter((applicant) => applicant.profession.includes(query));

    let finalFiltered: Applicant[] = filteredByQuery;

    if (city != "null") {
      finalFiltered = finalFiltered.filter((applicant) => applicant.city === city);
    } 
    
    if (fullWorkDay) {
      finalFiltered = finalFiltered.filter((applicant) => applicant.fullWorkDay === fullWorkDay);
    }
    
    if (wantedSalaryBottom != "null" && wantedSalaryTop != "null") {
      const numericBottom: number = Number(wantedSalaryBottom)
      const numericTop: number = Number(wantedSalaryTop)
      const filteredBottom = finalFiltered.filter((applicant) => (numericBottom < Number(applicant.wanted_salary)))
      const filteredTop = filteredBottom.filter((applicant) => (Number(applicant.wanted_salary) < numericTop))
      finalFiltered = filteredTop
    }

    return finalFiltered;

  };

  private getEnumStatusFromString(stringApplicantStatus: string): ApplicantStatus {
    const statusMap: { [key: string]: ApplicantStatus } = {
      NEW: ApplicantStatus.NEW,
      TEST_TASK: ApplicantStatus.TEST_TASK,
      PHONE_INTERVIEW: ApplicantStatus.PHONE_INTERVIEW,
      TECH_INTERVIEW: ApplicantStatus.TECH_INTERVIEW,
      OFFER: ApplicantStatus.OFFER,
      ONBOARDING: ApplicantStatus.ONBOARDING,
      APPLICANT_DECLINE: ApplicantStatus.APPLICANT_DECLINE,
      RECRUITER_DECLINE: ApplicantStatus.RECRUITER_DECLINE,
    };
  
    return statusMap[stringApplicantStatus] || null;
  }
}
