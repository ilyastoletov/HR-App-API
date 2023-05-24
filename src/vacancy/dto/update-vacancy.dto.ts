import { User, VacancyStatus } from "@prisma/client"

export type UpdateVacancyDto = {
    department?: string,
    title?: string,
    experience?: string,
    salary?: string,
    requirements?: string,
    conditions?: string,
    job_duties?: string,
    authorId?: string
}
