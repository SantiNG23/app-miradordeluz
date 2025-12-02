import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, disabled, className }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#3182CE]/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-[#3182CE]" : "neu-toggle-track",
          className
        )}
      >
        <span
          className={cn(
            "neu-toggle-thumb inline-block h-6 w-6 transform rounded-full transition-transform",
            checked ? "translate-x-9" : "translate-x-1"
          )}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
