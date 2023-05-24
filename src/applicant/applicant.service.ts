import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Injectable()
export class ApplicantService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createApplicantDto: CreateApplicantDto) {
    const createdObject = await this.prismaService.applicant.create({ data: createApplicantDto });
    return {message: 'Applicant created', createdApplicant: createdObject};
  }

  async findAll() {
    const applicants = await this.prismaService.applicant.findMany();
    return applicants;
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
    const deletedObject = await this.prismaService.applicant.delete({ where: { applicantId } });
    return {message: 'Applicant deleted', deletedApplicant: deletedObject};
  }
}
