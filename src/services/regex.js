export const lastNameRegex = new RegExp(
  /^[A-ZÀ-Ý]([A-ZÀ-Ý]|\'[A-ZÀ-Ý]+|\-[A-ZÀ-Ý]+|\ [A-ZÀ-Ý]+)*$/,
  "m",
);
export const firstNameRegex = new RegExp(
  /^[A-ZÀ-Ý]([a-zà-ÿ]|\-[A-ZÀ-Ý][a-zà-ÿ]+|\ [A-ZÀ-Ý][a-zà-ÿ]+)*$/,
  "m",
);
export const mailRegex = new RegExp(
  /^([a-z0-9_])(([a-z0-9_\-]*)|(\.(?!\.)))@([a-z0-9])(([a-z0-9])|(\-[a-z0-9]+)|(\.(?!\.)[a-z0-9]+))*(\.([a-z0-9])(([a-z0-9])|(\-[a-z0-9]+))*)+$/,
  "m",
);
export const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{12,}$/,
  "m",
);
export const ceoRegex = new RegExp(
  /^[A-ZÀ-Ý]([A-ZÀ-Ý]|\'[A-ZÀ-Ý]+|\-[A-ZÀ-Ý]+|\ [A-ZÀ-Ý]+)*\ [A-ZÀ-Ý]([a-zà-ÿ]|\-[A-ZÀ-Ý][a-zà-ÿ]+|\ [A-ZÀ-Ý][a-zà-ÿ]+)*$/,
  "m",
);
export const siretRegex = new RegExp(/^\d{14}$/, "m");
export const plateRegex = new RegExp(
  /^((?!SS|WW)[A-HJ-NP-TV-Z]{2})[0-9]{2}([1-9]|((?<!00)0)){1}((?!SS)[A-HJ-NP-TV-Z]{2})$/,
  "m",
);

export function checkCompany(args) {
  if (!siretRegex[Symbol.match](args.data.siret)) {
    throw new Error("Le SIRET n'est pas valide.");
  }
  if (!ceoRegex[Symbol.match](args.data.ceo)) {
    throw new Error("Le nom du directeur n'est pas valide.");
  }
  if (!passwordRegex[Symbol.match](args.data.password)) {
    throw new Error(
      "Le mot de passe n'est pas valide (au moins 12 caractères avec majuscule(s), minuscule(s) et chiffre(s).",
    );
  }
  return args;
}

export function checkEmployee(args) {
  if (!lastNameRegex[Symbol.match](args.data.lastName)) {
    throw new Error("Le nom de famille n'est pas valide.");
  }
  if (!firstNameRegex[Symbol.match](args.data.firstName)) {
    throw new Error("Le prénom n'est pas valide.");
  }
  if (!mailRegex[Symbol.match](args.data.mail)) {
    throw new Error("Le mail n'est pas valide.");
  }
  if (!passwordRegex[Symbol.match](args.data.password)) {
    throw new Error(
      "Le mot de passe n'est pas valide (au moins 12 caractères avec majuscule(s), minuscule(s) et chiffre(s).",
    );
  }
  return args;
}

export function checkCar(args) {
  if (!plateRegex[Symbol.match](args.data.plate)) {
    throw new Error("L'immatriculation n'est pas valide.");
  }
  return args
}
