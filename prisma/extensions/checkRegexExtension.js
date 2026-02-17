import { Prisma } from "../../generated/prisma/client.js";
import { checkCar, checkCompany, checkEmployee, checkPatient } from "../../src/services/regex.js"

export const checkRegexExtension = Prisma.defineExtension({
    name: "checkRegex",
    query: {
        company: {
            create: ({args, query}) => {
                checkCompany(args);
                return query(args);
            },
            update: ({args, query}) => {
                checkCompany(args);
                return query(args);
            }
        },
        employee: {
            create: ({args, query}) => {
                checkEmployee(args);
                return query(args);
            },
            update: ({args, query}) => {
                checkEmployee(args);
                return query(args);
            }
        },
        car: {
            create: ({args, query}) => {
                checkCar(args);
                return query(args);
            },
            update: ({args, query}) => {
                checkCar(args);
                return query(args);
            }
        },
        patient: {
            create: ({args, query}) => {
                checkPatient(args);
                return query(args);
            },
            update: ({args, query}) => {
                checkPatient(args);
                return query(args);
            }
        }
    }
})