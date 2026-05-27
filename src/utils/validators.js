/* ──────────────────────────────────────────
   validators.js — Pure validation helpers
   ────────────────────────────────────────── */

export const isRequired = (value) =>
  value !== undefined && value !== null && value.toString().trim().length > 0;

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim());

export const isValidPassword = (password) =>
  typeof password === 'string' && password.length >= 8;

export const isStrongPassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

export const isValidPhone = (phone) =>
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);

export const isValidDate = (date) => {
  if (!date) return false;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

export const isAdult = (dob) => {
  if (!dob) return false;
  const today = new Date();
  const birth = new Date(dob);
  const age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  return m < 0 || (m === 0 && today.getDate() < birth.getDate())
    ? age - 1 >= 18
    : age >= 18;
};

/* ── Registration Step Validators ─────── */

/** Step 1 — Company credentials */
export const validateStep1 = ({ companyName, companyPassword }) => {
  const errors = {};

  if (!isRequired(companyName))
    errors.companyName = 'Company name is required.';
  else if (companyName.trim().length < 2)
    errors.companyName = 'Company name must be at least 2 characters.';

  if (!isRequired(companyPassword))
    errors.companyPassword = 'Password is required.';
  else if (!isValidPassword(companyPassword))
    errors.companyPassword = 'Password must be at least 8 characters.';

  return errors;
};

/** Step 2 — Admin / contact details */
export const validateStep2 = ({ firstName, lastName, email, phone }) => {
  const errors = {};

  if (!isRequired(firstName))
    errors.firstName = 'First name is required.';
  else if (firstName.trim().length < 2)
    errors.firstName = 'First name must be at least 2 characters.';

  if (!isRequired(lastName))
    errors.lastName = 'Last name is required.';
  else if (lastName.trim().length < 2)
    errors.lastName = 'Last name must be at least 2 characters.';

  if (!isRequired(email))
    errors.email = 'Email is required.';
  else if (!isValidEmail(email))
    errors.email = 'Enter a valid email address.';

  if (!isRequired(phone))
    errors.phone = 'Phone number is required.';
  else if (!isValidPhone(phone))
    errors.phone = 'Enter a valid phone number.';

  return errors;
};

/** Login form */
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
