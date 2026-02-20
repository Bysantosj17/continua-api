import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserWriteDto } from "../dto/user-write.dto";

@ValidatorConstraint( {name: "PasswordMatch"})
export class PasswordMatchValidator implements ValidatorConstraintInterface {
    validate(password: string, args?: ValidationArguments): boolean {
        const user: any = args?.object;

        return password == user.confirmPassword
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "Las contraseñas no coinciden"
    }

}

export function PasswordMatch(options?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options,
            constraints: [],
            validator: PasswordMatchValidator,
        })
    }
}