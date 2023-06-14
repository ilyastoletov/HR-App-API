import { Role, Vacancy } from "@prisma/client";

export type User = {
    name:  string,
    role: Role,
    login: string,
    createdAtDate: string,
    password: string,
    vacanciesId: string[]
}
