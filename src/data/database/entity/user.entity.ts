import { Role } from "src/domain/models/role.enum";
import { User } from "src/domain/models/user.model";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./course.entity";
import { Inscripcion } from "./enrollment.entity";


@Entity('usuarios')
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        nullable: false,
        length: 100,
    })
    nombres: string;

    @Column({
        nullable: false,
        length: 100,
    })
    apellidos: string;

    @Column({
        nullable: false,
        unique: true,
    })
    correo: string;

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        nullable: false,
        type: 'enum',
        default: Role.STUDENT,
        enum: Role,
    })
    rol: Role;

    @Column({
        nullable: false,
        unique: true,
        type: 'int',
    })
    codigo: number;

    @OneToMany(() => Curso, (curso: Curso) => curso.coordinador)
    cursosCoordinados: Curso[];
    
    @OneToMany(
        () => Inscripcion,
        (inscripcion: Inscripcion) => inscripcion.alumno)
    inscripciones: Inscripcion[];
    

    toDomain() {
        const model = new User();

        model.id = this.id;
        model.names = this.nombres;
        model.lastName = this.apellidos;
        model.email = this.correo;
        model.password = this.password;
        model.role = this.rol;
        model.code = this.codigo;

        return model;
    }
}