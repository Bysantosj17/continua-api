import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { Login } from "src/domain/usecases/auth/login.usecases";
import { Token } from "./dto/token.dto";
import { LoginCredentials } from "./dto/login-credentials.dto";

@Controller('auth')
export class AuthController {

    //paso numero 72
    constructor ( private readonly login: Login) { }
    
    @Post('login')
    async logIn(@Body() credentials: LoginCredentials) {
        console.log('BODY:', credentials);  
        const token = await this.login.execute(credentials);

        if (!token) {
            throw new UnauthorizedException('Credenciales invalidas. ')
        }

        return new Token(token);
    }
}