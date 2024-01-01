import React, { type LegacyRef, forwardRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { type FieldErrors } from "react-hook-form";

interface ITextareaProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  errors?: FieldErrors;
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ label, errors, ...rest }, ref) => {
    const { name } = rest;

    return (
      <div className="mb-4">
        <label htmlFor={name} className="text-xs">
          {label}
        </label>
        <textarea
          ref={ref as LegacyRef<HTMLTextAreaElement>}
          className="w-full rounded-lg bg-slate-100 px-4 py-2 outline-none"
          {...rest}
        />
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className="text-xs text-red-500">{message}</p>
          )}
        />
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
