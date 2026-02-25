import { DataSourceOptions } from 'typeorm';
import { Usuario } from './entity/user.entity';

export const DataSourceConfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost', //host: 'mysql',
    port: 3306,
    username: 'root',
    password: 'hola123',
    database: 'continua',
    synchronize: true,
    entities: [Usuario]
}