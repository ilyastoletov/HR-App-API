import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { ApplicantModule } from './applicant/applicant.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [PrismaModule, UsersModule, VacancyModule, ApplicantModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
