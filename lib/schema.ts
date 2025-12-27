import { createSchema } from "./zodValidator";

export const EmailSchema = createSchema((value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}, "Please enter a valid email address");

export const PasswordSchema = createSchema(
  (value) => value.length >= 4,
  "Password must be at least 4 characters"
);
