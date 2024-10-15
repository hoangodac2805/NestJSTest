import { HttpException, HttpStatus } from "@nestjs/common";
import { throwError } from "rxjs";
import { QueryFailedError } from "typeorm";

export function HandleDBError() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            try {
                return await originalMethod.apply(this, args);
            } catch (error) {
                if (error instanceof QueryFailedError && (error as any).code === 'ER_DUP_ENTRY') {
                    throw new HttpException(
                        {
                            status: HttpStatus.CONFLICT,
                            error: error.message,
                        },
                        HttpStatus.CONFLICT,
                    );
                }

                throwError(() => error)
            }
        }
    }
}