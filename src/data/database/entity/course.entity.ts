import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./user.entity";


@Entity('cursos')
export class Curso extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({nullable: true})
  nombre: string;

  @Column({ type: 'text',nullable: true})
  descripcionCorta: string;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @Column({ type: 'longtext', nullable: false })
  objetivos: string;

  @Column({ type: 'text',nullable: false})
  duracion: string;

  @Column({ type: 'text',nullable: false})
  inicio: Date;

  @Column({ type: 'text',nullable: false})
  fin: Date;

  costoInicio: number;

  costoFin: number;

  tema: string;

  nive: string;

  cupo: number;

  pago: string;

  doc: string;

  info: string;

  img: string;

  status: number;

  coordinador: Usuario;
}