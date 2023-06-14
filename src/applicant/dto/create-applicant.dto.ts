import { ApplicantStatus } from "@prisma/client"

export type CreateApplicantDto = {
    applicantId?: string
    appliedVacancyId: string,
    appliedAtDate: string,
    name: string,
    experience: string,
    education: string,
    wanted_salary: string,
    city: string,
    status?: ApplicantStatus,
    photo_url: string,
    resume_url: string,
    social_media_links: string[]
}
