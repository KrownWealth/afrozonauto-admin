"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  htmlFor?: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  required?: boolean;
  reqValue?: string;
  disabled?: boolean;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  htmlFor,
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  isInvalid,
  errorMessage,
  required,
  reqValue,
  disabled,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="flex flex-col space-y-1 w-full" ref={dropdownRef}>
      {label && (
        <label htmlFor={htmlFor || id} className="text-base text-dark font-normal">
          {label} {required && <sup className="text-red-500">{reqValue || "*"}</sup>}
        </label>
      )}

      <div className="relative">
        {/* Main Select Button */}
        <button
          type="button"
          id={id}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full flex items-center justify-between border rounded-lg px-3 py-2 text-sm text-left bg-white transition-colors ${disabled
            ? "bg-gray-100 cursor-not-allowed opacity-60"
            : "hover:bg-gray-50 cursor-pointer"
            } ${isInvalid ? "border-red-500" : "border-gray-300"
            } ${className}`}
        >
          <span className={value ? "text-gray-900" : "text-gray-400"}>
            {displayText}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.length > 0 ? (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${value === option.value ? "bg-blue-50 text-blue-600" : "text-gray-900"
                    }`}
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="h-4 w-4" />}
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                No options available
              </div>
            )}
          </div>
        )}
      </div>

      {isInvalid && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};