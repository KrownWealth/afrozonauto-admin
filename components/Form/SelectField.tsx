"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  className?: string;
  width?: string; // e.g. "w-[180px]" or "w-full"
  borderColor?: string; // e.g. "border-red-500"
  onChange?: (value: string) => void;
}

export function CustomSelect({
  label,
  placeholder = "Select an option",
  options,
  className = "",
  width = "w-[180px]",
  borderColor = "border-border",
  onChange,
}: CustomSelectProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={`${width} ${borderColor} ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}

          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
