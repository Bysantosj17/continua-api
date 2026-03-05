import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/domain/models/role.enum";
import { User } from "src/domain/models/user.model";

export class UserReadDto {

    @ApiProperty({ example: 1})
    id?: number;
    @ApiProperty({ example: "Nombres"})
    names: string;
    @ApiProperty({ example: "Apellidos"})
    lastName: string;
    @ApiProperty({ example: "El correo electronico"})
    email: string;
    @ApiProperty({ example: Role.STUDENT})
    role: Role;
    @ApiProperty({ example: "Codigo del estudiante"})
    code: number;
}