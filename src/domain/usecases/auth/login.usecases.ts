import { Injectable } from "@nestjs/common";
import { TokenService } from "src/core/auth/token.service";
import { EncrypterService } from "src/core/common/encrypter.service";
import { LoginCredentials } from "src/infraestructure/auth/dto/login-credentiales.dto";
import { GetUserByEmail } from "../user/get-user-by-email.usecase";

@Injectable()
export class Login{

    constructor(
        private readonly tokenService: TokenService,
        private readonly encryper: EncrypterService,
        private readonly getUserByEmail: GetUserByEmail,
    ){}

    async execute(credentials: LoginCredentials) {
        //paso numero 70
        const user = await this.getUserByEmail.execute(credentials.email);

        if (!user) {
            return null;
        }

        const passwordIsValid = await this.encryper.compare(credentials.password, user.password);

        if(!passwordIsValid){
            return null;
        }

        return this.tokenService.getToken(user);
    }
}