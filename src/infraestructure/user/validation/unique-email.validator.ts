import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Request } from "express";
import { GetUserByEmail } from "src/domain/usecases/user/get-user-by-email.usecase";
import { UserWriteDto } from "../dto/user-write.dto";

@Injectable()
@ValidatorConstraint( {name: "UniqueCode"})
export class UniqueEmailValidator implements ValidatorConstraintInterface {
    constructor(
        private readonly getUserByEmail: GetUserByEmail,
    ){ }

    async validate(email: string, args?: ValidationArguments): Promise<boolean> {
        const user = await this.getUserByEmail.execute(email);

        const body: UserWriteDto = args?.object as any;

        console.log(body)
        console.log(user )

        if (user?.id === body.id) {
            return true;
        }

        return user == undefined;
    }
    defaultMessage?(args?: ValidationArguments): string {
        return `Ya exite un usuario con el correo "${args?.value}" .`
    }

}

export function UniqueEmail(options?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            constraints: [],
            validator: UniqueEmailValidator,
        })
    }
}