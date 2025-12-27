import { z } from "zod";

export const createSchema = (
  validationFn: (value: string) => boolean,
  errorMessage: string
) => {
  return z.string().refine(validationFn, { message: errorMessage });
};
