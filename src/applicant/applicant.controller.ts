import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post("create")
  async create(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantService.create(createApplicantDto);
  }

  @Get("getAll")
  async findAll(@Query('vacancyId') vacancyId: string) {
    return this.applicantService.findAll(vacancyId);
  }

  @Get('getById')
  async findOne(@Query('applicantId') applicantId: string) {
    return this.applicantService.findOne(applicantId);
  }

  @Patch('update')
  async update(@Query('applicantId') applicantId: string, @Body() updateApplicantDto: UpdateApplicantDto) {
    return this.applicantService.update(applicantId, updateApplicantDto);
  }

  @Delete('remove')
  async remove(@Query('applicantId') applicantId: string) {
    return this.applicantService.remove(applicantId);
  }
}
