import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  );
}
