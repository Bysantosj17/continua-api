import { NestFactory } from '@nestjs/core';
import { AppModule } from './di/app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { CreateUser } from './domain/usecases/user/create-user.usecase';
import { GetAllUsers } from './domain/usecases/user/get-all-users.usecases';
import { User } from './domain/models/user.model';
import { Role } from './domain/models/role.enum';
import { create } from 'domain';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  // paso numero 60 {
  app.setGlobalPrefix('api')
  //}paso numero 60

  // Paso numero 35

  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  
  //paso numero 79
  const createUser = app.get(CreateUser)
  const getAllUsers = app.get(GetAllUsers)

  const users = await getAllUsers.execute()

  if (users.length === 0) {
    const user = new User()

    user.email = "santos@gmail.com"
    user.names = "Santos"
    user.lastName = "Barbosa Sandoval"
    user.password = "hola123"
    user.role = Role.ADMINISTRATOR
    user.code = 217024876

    await createUser.execute(user)
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();