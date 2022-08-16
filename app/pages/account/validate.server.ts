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
