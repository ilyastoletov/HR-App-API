import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MetricsService {
    constructor(private readonly prismaService: PrismaService) {}

    async build(dateFrom: string, dateto: string) {
        const datesInRange = this.getDatesInRange(dateFrom, dateto);
        //formattedDates.forEach((dateStr) => dateStr.replaceAll("/", "."))
        var metricsMap: Map<String, Number> = new Map();
        for (var i = 0; i < datesInRange.length; i++) {
            metricsMap.set(datesInRange[i], this.generateRandomNumber(10, 120))
        }
        const metricsObject = Object.fromEntries(metricsMap);
        return metricsObject;
    }

    private getDatesInRange(dateStartStr: string, dateEndStr: string) {
        const startDate = new Date(dateStartStr);
        const endDate = new Date(dateEndStr);
        const dateInRange: string[] = []

        while(startDate <= endDate) {
            const formattedDate = startDate.toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year:'numeric'});
            dateInRange.push(formattedDate)
            startDate.setDate(startDate.getDate() + 1);
        }

        return dateInRange;
    }

    private generateRandomNumber(min: number, max: number): number {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
}
