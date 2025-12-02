import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "confirm"
    | "cancel"
    | "danger"
    | "danger-subtle"
    | "icon";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", ...props }, ref) => {
    const baseStyles =
      "rounded-2xl font-semibold transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "neu-button-primary text-white",
      secondary: "neu-button-secondary text-[#2D3748]",
      confirm: "neu-button-confirm text-white",
      cancel: "neu-button-cancel text-[#2D3748]",
      danger: "neu-button-danger text-white",
      "danger-subtle": "neu-button-danger-subtle text-[#C53030]",
      icon: "neu-button-icon rounded-full",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3.5",
      lg: "px-8 py-4 text-lg",
      icon: "w-12 h-12",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
