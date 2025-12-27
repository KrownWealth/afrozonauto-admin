"use client";

import { useState } from "react";
import { ZodError, ZodType } from "zod";

export const useField = (
  initialValue: string,
  validationSchema?: ZodType<any>
) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const validate = () => {
    if (!validationSchema) return true;

    try {
      validationSchema.parse(value);
      setError("");
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.issues[0]?.message || "Validation error");
      }
      return false;
    }
  };

  const handleChange = (
    e: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = typeof e === "string" ? e : e.target.value;
    setValue(newValue);
  };

  const handleBlur = () => {
    setTouched(true);
    validate();
  };

  const reset = () => {
    setValue(initialValue);
    setError("");
    setTouched(false);
  };

  return {
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    setValue, // ✅ needed for uploads & selects
    validate, // ✅ used in submit logic
    reset,
  };
};
