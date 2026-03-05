import { Role } from "src/domain/models/role.enum";
import { User } from "src/domain/models/user.model";
import { IsNotEmpty, IsOptional } from "class-validator";
import { PasswordMatch } from "../validation/password.validator";
import { UniqueCode } from "../validation/unique-code.validator";
import { UniqueEmail } from "../validation/unique-email.validator";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class UserWriteDto{
    @ApiHideProperty()
    @IsOptional()
    id?: number;

    @ApiProperty({example: "Nombres"})
    @IsNotEmpty()
    names: string;

    @ApiProperty({ example: "Apellidos" })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({example: "El correo"})
    @IsNotEmpty()
    @UniqueEmail()
    email: string;

    @ApiProperty({example: "contrasena"})
    @IsNotEmpty()
    @PasswordMatch()
    password: string;

    @ApiProperty({example: "Confirmar contrasena"})
    @IsNotEmpty()
    confirmPassword: string;

    @ApiProperty({example: Role.STUDENT})
    @IsNotEmpty()
    role: Role;

    @ApiProperty({example: "El codigo del estudiante"})
    @IsNotEmpty()
    @UniqueCode()
    code: number;

    toDomain() {
        const model = new User();

        model.names = this.names;
        model.lastName = this.lastName;
        model.email = this.email;
        model.password = this.password;
        model.role = this.role;
        model.code = this.code;

        return model;
    }
}