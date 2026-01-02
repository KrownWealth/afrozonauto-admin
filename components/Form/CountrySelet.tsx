"use client";

import React, { useState, useEffect } from "react";

interface CountrySelectProps {
  label?: string;
  value: string;
  onChange: (country: string) => void;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  required?: boolean;
  reqValue?: string;
  className?: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  label,
  value,
  onChange,
  placeholder = "Select country",
  isInvalid,
  errorMessage,
  required,
  reqValue,
  className,
}) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await res.json();
        const countryNames = data
          .map((c: any) => c.name.common)
          .sort((a: string, b: string) => a.localeCompare(b));
        setCountries(countryNames);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      }
    };
    fetchCountries();
  }, []);

  const filtered = countries.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor="country" className="text-base text-dark font-normal">
          {label} {required && <sup className="text-red-500">{reqValue || "*"}</sup>}
        </label>
      )}

      <input
        id="country"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        list="country-list"
        className={`border rounded px-3 py-2 text-sm w-full ${className} ${isInvalid ? "border-red-500" : "border-gray-300"
          }`}
      />

      <datalist id="country-list">
        {filtered.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      {isInvalid && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};
