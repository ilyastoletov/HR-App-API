import { Applicant, User } from "@prisma/client";

export type Vacancy = {
    department: string,
    title: string,
    experience: string,
    salary: string,
    requirements: string,
    conditions: string,
    job_duties: string,
    authorId: string
};
