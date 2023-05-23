import { Role, Vacancy } from "@prisma/client"

export type UpdateUserDto = {
    name?:  string,
    role?: Role,
    login?: string,
    password?: string,
}