/* ──────────────────────────────────────────
   validators.js — Pure validation helpers
   ────────────────────────────────────────── */

export const isRequired = (value) =>
  value !== undefined && value !== null && value.toString().trim().length > 0;

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim());

export const isValidName = (name) =>
  typeof name === 'string' && /^[A-Za-z ]+$/.test(name.trim());

export const isValidPassword = (password) =>
  typeof password === 'string' && password.length >= 8;

export const isValidPhone = (phone) =>
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);

/* ── Password rule checkers (exported so UI can show live hints) ── */
export const passwordRules = {
  minLength:   (p) => typeof p === 'string' && p.length >= 8,
  hasUppercase:(p) => /[A-Z]/.test(p),
  hasNumber:   (p) => /[0-9]/.test(p),
};

/* ── Step 1 — Verify company credentials ─── */
export const validateStep1 = ({ companyName, password }) => {
  const errors = {};

  if (!isRequired(companyName))
    errors.companyName = 'Company name is required.';
  else if (companyName.trim().length < 2)
    errors.companyName = 'Company name must be at least 2 characters.';

  if (!isRequired(password)) {
    errors.password = 'Password is required.';
  } else if (!passwordRules.minLength(password)) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (!passwordRules.hasUppercase(password)) {
    errors.password = 'Password must contain at least 1 uppercase letter.';
  } else if (!passwordRules.hasNumber(password)) {
    errors.password = 'Password must contain at least 1 number.';
  }

  return errors;
};

/* ── Step 2 — Admin / contact details ─────── */
export const validateStep2 = ({ firstName, lastName, email, companyName }) => {
  const errors = {};

  if (!isRequired(firstName)) {
    errors.firstName = 'First name is required.';
  } else if (firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters.';
  } else if (!isValidName(firstName)) {
    errors.firstName = 'First name may only contain letters and spaces.';
  }

  if (!isRequired(lastName)) {
    errors.lastName = 'Last name is required.';
  } else if (lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.';
  } else if (!isValidName(lastName)) {
    errors.lastName = 'Last name may only contain letters and spaces.';
  }

  if (!isRequired(email)) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!isRequired(companyName)) {
    errors.companyName = 'Company name is required.';
  } else if (companyName.trim().length < 2) {
    errors.companyName = 'Company name must be at least 2 characters.';
  }

  return errors;
};

/* ── Login ───────────────────────────────── */
export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!isRequired(email))
    errors.email = 'Email is required.';
  else if (!isValidEmail(email))
    errors.email = 'Enter a valid email address.';

  if (!isRequired(password))
    errors.password = 'Password is required.';
  else if (!isValidPassword(password))
    errors.password = 'Password must be at least 8 characters.';

  return errors;
};
