"use client";

import React, { ChangeEvent, ReactElement } from "react";
import { Input } from "@nextui-org/react";

interface InputFieldProps {
  type?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  startContent?: string | ReactElement;
  disabled?: boolean;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  height?: string;
  placeholderOffset?: number;
}

export const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  id,
  placeholder,
  value,
  onChange,
  startContent,
  disabled,
  onKeyPress,
  className,
  height = "h-20",
  placeholderOffset
}) => {
  return (
    <Input
      type={type}
      id={id}
      variant="bordered"
      placeholder={placeholder}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
      startContent={startContent}
      disabled={disabled}
      onKeyDown={onKeyPress}
      className={className}
      classNames={{
        inputWrapper: [
          "border border-gray-300 rounded-lg text-sm",
          "bg-transparent",
          "shadow-none",
          "focus-within:border-orange-500",
          height,
        ],
        input: [
          "bg-transparent",
          "text-black",
          "placeholder:text-gray-500",
          "text-start",
          "focus:ring-0 focus:outline-none",
          placeholderOffset ? "phone-input-field" : "",
        ],
      }}
      style={
        placeholderOffset
          ? {
            "--ph-offset": `${placeholderOffset}px`,
          } as React.CSSProperties
          : undefined
      }
    />
  );
};