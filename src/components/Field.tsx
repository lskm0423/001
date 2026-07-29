import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
}

export default function Field({ label, htmlFor, children }: FieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
