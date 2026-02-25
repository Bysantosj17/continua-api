import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { JwtModule } from "@nestjs/jwt";
import { TokenService } from "src/core/auth/token.service";
import { Login } from "src/domain/usecases/auth/login.usecases";
import { CommonModule } from "./common.module";
import { AuthController } from "src/infraestructure/auth/auth.controller";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: 'secreto',
            signOptions: {
                expiresIn: '1h',
            },
        }),
        //paso numero 68
        CommonModule,
    ],
    //paso numero 63
    providers: [
        TokenService,
        Login,
    ],
    //paso numero 73
    controllers: [
        AuthController,
    ]
})
export class AuthModule {}