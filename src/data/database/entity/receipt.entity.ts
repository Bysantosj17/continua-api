import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pagos } from "./payment.entity";
import { Receipt } from "src/domain/models/receipt.model";

@Entity('comprobante')
export class Comprobante extends BaseEntity{
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({name: 'nombre_archivo'})
  nombreArchivo: string;

  @Column({name: 'tipo_archivo',length: 45})
  tipoArchivo: string;

  @Column({ type: 'longtext'})
  contenido: string;

  @OneToOne(() => Pagos, (pagos: Pagos) => pagos.comprobante)
  @JoinColumn({name: 'pago_id'})
  pagos: Pagos;

  toDomain() {
    const model = new Receipt();

    model.id = this.id;
    model.fileName = this.nombreArchivo;
    model.fileType = this.tipoArchivo;
    model.content = this.contenido;
    model.payment = this.pagos.toDomain();

    return model;
  }
}