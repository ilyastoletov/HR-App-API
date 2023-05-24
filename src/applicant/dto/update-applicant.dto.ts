import { ApplicantStatus } from "@prisma/client";

export type UpdateApplicantDto = {
    applicantId?: string
    vacancyId?: string,
    name?: string,
    experience?: string,
    education?: string,
    wanted_salary?: string,
    city?: string,
    status?: ApplicantStatus,
    photo_url?: string,
    resume_url?: string,
    social_media_links?: string[]
};
