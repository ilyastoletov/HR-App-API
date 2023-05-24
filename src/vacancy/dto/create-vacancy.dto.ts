import { User } from "@prisma/client"

export type CreateVacancyDto = {
    department: string,
    title: string,
    experience: string,
    salary: string,
    requirements: string,
    conditions: string,
    job_duties: string,
    authorId: string
};