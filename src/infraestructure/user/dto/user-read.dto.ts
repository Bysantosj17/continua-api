import { Role } from "src/domain/models/role.enum";
import { User } from "src/domain/models/user.model";

export class UserReadDto {
    id?: number;
    names: string;
    lastName: string;
    email: string;
    role: Role;
    code: number;
}