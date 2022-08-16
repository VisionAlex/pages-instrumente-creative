import { CustomerErrorCode } from "~/generated/graphql";

export const validateEmail = (email: FormDataEntryValue | null) => {
  if (!email) {
    return "Email-ul trebuie completat.";
  } else if (typeof email !== "string") {
    return "E-mailul nu este valid";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "E-mailul nu este valid";
  }
  return undefined;
};

export const validatePassword = (password: FormDataEntryValue | null) => {
  if (!password) {
    return "Parola trebuie completata.";
  } else if (typeof password !== "string") {
    return "Parola nu este valida.";
  } else if (password.length < 5) {
    return "Parola trebuie sa aiba minim 5 caractere.";
  }
  return undefined;
};

export const validateFirstName = (firstName: FormDataEntryValue | null) => {
  if (typeof firstName !== "string") {
    return "Prenumele nu este valid.";
  } else if (firstName.length > 30) {
    return "Maxim 30 de caractere";
  }
  return undefined;
};

export const validateLastName = (lastName: FormDataEntryValue | null) => {
  if (typeof lastName !== "string") {
    return "Numele de familie nu este valid.";
  } else if (lastName.length > 30) {
    return "Maxim 30 de caractere";
  }
  return undefined;
};

type CustomerUserError = Array<{
  __typename?: "CustomerUserError";
  code?: CustomerErrorCode | null;
  field?: Array<string> | null;
  message: string;
}>;

export type RegisterFieldErrors = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
};

export const formatRegisterErrors = (errors: CustomerUserError) => {
  let formError: string | undefined;
  let fieldErrors: RegisterFieldErrors = {};
  for (const error of errors) {
    if (error.field && error.field[1] === "email") {
      if (error.code === CustomerErrorCode.Taken) {
        fieldErrors.email = "Adresa de Email este deja folosita.";
      } else {
        fieldErrors.email = error.message;
      }
    } else if (error.field && error.field[1] === "password") {
      fieldErrors.password = error.message;
    } else if (error.field && error.field[1] === "firstName") {
      fieldErrors.firstName = error.message;
    } else if (error.field && error.field[1] === "lastName") {
      fieldErrors.lastName = error.message;
    } else {
      formError =
        "Unul sau mai multe câmpuri au o eroare. Vă rugăm să verificați și să încercați din nou.";
    }
  }
  return {
    formError,
    fieldErrors: Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
  };
};
