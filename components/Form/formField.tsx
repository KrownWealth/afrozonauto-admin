"use client";

import React, { ReactElement } from "react";
import { InputField } from "./InputField";
interface FormFieldProps {
	label?: string;
	htmlFor: string;
	type: string;
	id: string;
	isInvalid?: boolean;
	errorMessage?: string;
	placeholder?: string;
	startcnt?: string | ReactElement;
	onChange?: (value: string) => void;
	reqValue?: string;
	required?: boolean;
	minLen?: number;
	maxLen?: number;
	value?: any;
	disabled?: boolean;
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
	label,
	htmlFor,
	type,
	id,
	isInvalid,
	errorMessage,
	placeholder,
	startcnt,
	onChange,
	reqValue,
	required,
	minLen,
	maxLen,
	value,
	disabled,
	onKeyPress,
	className,
}) => {
	return (
		<div className="flex flex-col space-y-1">
			{/* Label */}
			<label htmlFor={htmlFor} className="text-base text-dark font-normal">
				{label} {required && <sup className="text-red-500">{reqValue}</sup>}
			</label>


			<InputField
				type={type}
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				startContent={startcnt}
				disabled={disabled}
				onKeyPress={onKeyPress}
				className={className}
				height="h-12"
			/>

			{/* Validation Error */}
			{isInvalid && (
				<div className="text-red-500 text-xs mt-1">{errorMessage}</div>
			)}
		</div>
	);
};

export default FormField;
