import { Controller, Get, Post, Query } from "@nestjs/common";
import { MetricsService } from "./metrics.service";

@Controller('metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Get('build')
    async buildMetrics(@Query("dateFrom") dateFrom: string, @Query("dateTo") dateTo: string) {
        return this.metricsService.build(dateFrom, dateTo);
    }

}