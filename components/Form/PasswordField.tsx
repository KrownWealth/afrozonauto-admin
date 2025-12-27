"use client";
import React, { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PasswordInputProps {
  PasswordText: string;
  placeholderText: string;
  passwordError: string | null;
  handlePasswordChange: (value: string) => void;
  showForgotPassword?: boolean;
  forgotPasswordLink?: string;
}

const PasswordField: React.FC<PasswordInputProps> = ({
  passwordError,
  handlePasswordChange,
  PasswordText,
  placeholderText,
  showForgotPassword = false,
  forgotPasswordLink,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <label htmlFor={PasswordText}
          className={cn(`text-base text-dark font-normal`,)}>
          {PasswordText} <sup className="text-red-500">*</sup>
        </label>

        {showForgotPassword && (
          <Link
            href={forgotPasswordLink || "/forgot-password"}
            className="ml-auto inline-block text-sm text-muted-foreground underline"
          >
            Forgot password?
          </Link>
        )}
      </div>

      <Input
        placeholder={placeholderText}
        variant="bordered"
        classNames={{
          inputWrapper: [
            "border border-gray-300 rounded-lg text-sm",
            "bg-transparent",
            "shadow-none",
            "focus-within:border-orange-500",
          ],
          input: [
            "bg-transparent",
            "text-black",
            "placeholder:text-gray-500",
            "text-start",
            "focus:ring-0 focus:outline-none",
          ],
        }}
        isInvalid={!!passwordError}
        aria-label={PasswordText}
        errorMessage={passwordError || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handlePasswordChange(e.target.value)
        }
        size="lg"
        radius="sm"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeOff className="text-xl text-gray-500 pointer-events-none" />
            ) : (
              <Eye className="text-xl text-gray-500 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="w-full py-2 hover:bg-transparent focus:outline-none bg-transparent"
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      />
    </div>
  );
};

export default PasswordField;
