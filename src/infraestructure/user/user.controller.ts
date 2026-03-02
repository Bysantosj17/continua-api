import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { User } from "src/domain/models/user.model";
import { CreateUser } from "src/domain/usecases/user/create-user.usecase";
import { plainToInstance } from "class-transformer";
import { UserReadDto } from "./dto/user-read.dto";
import { UserWriteDto } from "./dto/user-write.dto";
import { dot } from "node:test/reporters";
import { GetUserById } from "src/domain/usecases/user/get-user-by-id.usecase";
import { GetAllUsers } from "src/domain/usecases/user/get-all-users.usecases";
import { UpdateUser } from "src/domain/usecases/user/update-user.usecase";
import { DeleteUser } from "src/domain/usecases/user/delete-user.usecase";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "../auth/role.guard";
import { Role } from "src/domain/models/role.enum";
import { Auth } from "../auth/auth-role.decorator";

@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('users')
@Auth(Role.ADMINISTRATOR)
export class UserController {
    constructor(
        private readonly createUser: CreateUser,
        // paso numero 41
        private readonly getUserById: GetUserById,
        //Paso numero 44
        private readonly getAllUsers: GetAllUsers,
        // paso numero 49
        private readonly updateUser: UpdateUser,
        //Paso numero 53
        private readonly deleteUser: DeleteUser,

        ) {}
    
    @Get()
    async getAll() {
        //Paso numero 44 despues de escribirlo en el constructor
        const users = await this.getAllUsers.execute()

        return users.map((user) => user.toRead())
    }

    @Post()
    async save(@Body() dto: UserWriteDto) {
        
        const user = await this.createUser.execute(dto.toDomain())

        return user.toRead()
    }

    // paso numero 37
    @Get(':id')
    async getById(@Param('id') id: number) {
        const user = await this.getUserById.execute(id)

        if (user === undefined) {
            throw new NotFoundException('Este usuario no existe');
        }

        return user?.toRead();
    }

    //Paso numero 45
    @Put(':id')
    async update(@Param('id') id: number, @Body() data: UserWriteDto) {
        //Paso numero 49{
        const user = await this.updateUser.execute(id, data.toDomain());
        //}paso 49

        if (!user) {
            throw new NotFoundException('Este usuario no existe');
        }

        return user?.toRead();
    } 

    //Paso numero 51

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const user = await this.deleteUser.execute(id)

        if (!user) {
            throw new NotFoundException('Usuario no encontrado')
        }

        return user.toRead()
    }
}