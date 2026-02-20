import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { GetUserByCode } from "src/domain/usecases/user/get-user-by-code.usecase";

@Injectable()
@ValidatorConstraint( {name: "UniqueCode"})
export class UniqueCodeValidator implements ValidatorConstraintInterface {
    constructor(private readonly getUserByCode: GetUserByCode){}

    async validate(code: number, args?: ValidationArguments): Promise<boolean> {
        const user = await this.getUserByCode.execute(code);

        return user == undefined;
    }
    defaultMessage?(args?: ValidationArguments): string {
        return `Ya exite un usuario con el codigo "${args?.value}" .`
    }

}

export function UniqueCode(options?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            constraints: [],
            validator: UniqueCodeValidator,
        })
    }
}