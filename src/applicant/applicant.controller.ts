import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApplicantStatus } from '@prisma/client';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { SearchApplicantDto } from './dto/search-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post("create")
  async create(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantService.create(createApplicantDto);
  }

  @Get("getAllByVacancyId")
  async findAll(@Query('vacancyId') vacancyId: string) {
    return this.applicantService.findAllByVacancyId(vacancyId);
  }

  @Get("getAll")
  async getAll() {
    return this.applicantService.getAll();
  }

  @Get('getByPage')
  async findByPage(@Query('vacancyId') vacancyId: string, @Query('page') page: number = 1, @Query('status') status: ApplicantStatus) {
    return this.applicantService.findByPage(vacancyId, page, status)
  }

  @Get('getById')
  async findOne(@Query('applicantId') applicantId: string) {
    return this.applicantService.findOne(applicantId);
  }

  @Post('createMany')
  async createMany(@Body() createApplicantDtoArray: CreateApplicantDto[]) {
    return this.applicantService.createMany(createApplicantDtoArray);
  }

  @Patch('update')
  async update(@Query('applicantId') applicantId: string, @Body() updateApplicantDto: UpdateApplicantDto) {
    return this.applicantService.update(applicantId, updateApplicantDto);
  }

  @Delete('remove')
  async remove(@Query('applicantId') applicantId: string) {
    return this.applicantService.remove(applicantId);
  }

  @Patch('changeStatus')
  async changeStatus(@Query('applicantId') applicantId: string, @Query('status') status: string) {
    return this.applicantService.changeStatus(applicantId, status)
  }

  @Get('search')
  async search(@Query('query') searchQuery: string,
   @Query("city") city: string = "",
    @Query("fullWorkDay") fullWorkDay: string = "true",
     @Query("wantedSalaryBottom") wantedBot: string = "", @Query("wantedSalaryTop") wantedTop: string = "") {
    return this.applicantService.search(searchQuery, city, wantedBot, wantedTop, fullWorkDay)
  }
}
