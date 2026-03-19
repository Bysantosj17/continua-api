import { Injectable } from "@nestjs/common";
import { User } from "src/domain/models/user.model";
import { Usuario } from "./database/entity/user.entity";

@Injectable()
export class UserRepository {

    //Esta parte es la numero 21
    async create(user: User) {
        const entity = user.toDatabase()

        await entity.save() // INSERT INTO usuario VALUES (?, ? ...)

        return entity.toDomain()
    }

    // paso numero 32

    async findBycode(code: number) {
        return (await Usuario.findOneBy({ codigo: code}))?.toDomain()
    }

    // paso numero 32

    async findByEmail(email: string) {
        return (await Usuario.findOneBy({ correo: email}))?.toDomain() // SELECT * FROM usuario WHERE correo = ?
    }

    //Paso numero 38
    async findById(id: number) {
        return (await Usuario.findOneBy( { id } ))?.toDomain() // SELECT * FROM usuario WHERE id = ?
    }

    //Paso numero 42

    async findAll() {
        const users = await Usuario.find() // SELECT * FROM usuario;

        return users.map((user) => user.toDomain())
    }

    //Paso numero 46

    async update(user: User) {
        const entity = user.toDatabase();

        await entity.save();  // UPDATE SET correo 2 ... WHERE id = ?
    }

    //Paso numero 51

    async delete(user: User) {
        const entity = user.toDatabase();

        await entity.remove() // DELETE FROM usuario where id = ?
    }
}