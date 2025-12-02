import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "default";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      success: "bg-[#38A169]/15 text-[#38A169]",
      warning: "bg-[#DD6B20]/15 text-[#DD6B20]",
      error: "bg-[#E53E3E]/15 text-[#E53E3E]",
      info: "bg-[#181F54]/15 text-[#181F54]",
      default: "bg-[#718096]/15 text-[#718096]",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
