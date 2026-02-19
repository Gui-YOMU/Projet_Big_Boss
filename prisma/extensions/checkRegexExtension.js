import { Prisma } from "../../generated/prisma/client.js";
import {
  checkCeo,
  checkFirstName,
  checkLastName,
  checkMail,
  checkPassword,
  checkPlate,
  checkSiret,
  checkZipCode,
} from "../../src/services/regex.js";

export const checkRegexExtension = Prisma.defineExtension({
  name: "checkRegex",
  query: {
    company: {
      create: ({ args, query }) => {
        checkSiret(args);
        checkCeo(args);
        checkPassword(args);
        return query(args);
      },
      update: ({ args, query }) => {
        checkSiret(args);
        checkCeo(args);
        checkPassword(args);
        return query(args);
      },
    },
    employee: {
      create: ({ args, query }) => {
        checkLastName(args);
        checkFirstName(args);
        checkMail(args);
        checkPassword(args);
        return query(args);
      },
      update: ({ args, query }) => {
        if (args.lastName) {
          checkLastName(args);
        }
        if (args.firstName) {
          checkFirstName(args);
        }
        if (args.mail) {
          checkMail(args);
        }
        if (args.password) {
          checkPassword(args);
        }
        return query(args);
      },
    },
    car: {
      create: ({ args, query }) => {
        checkPlate(args);
        return query(args);
      },
      update: ({ args, query }) => {
        if (args.plate) {
          checkPlate(args);
        }
        return query(args);
      },
    },
    patient: {
      create: ({ args, query }) => {
        checkLastName(args);
        checkFirstName(args);
        checkZipCode(args);
        return query(args);
      },
      update: ({ args, query }) => {
        checkLastName(args);
        checkFirstName(args);
        checkZipCode(args);
        return query(args);
      },
    },
  },
});
