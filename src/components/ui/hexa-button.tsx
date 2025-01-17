import React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative before:content-[''] after:content-[''] before:border-solid after:border-solid before:border-t-transparent after:border-t-transparent before:border-b-transparent after:border-b-transparent before:w-0 after:w-0 before:h-0 after:h-0 before:absolute after:absolute before:top-0 after:bottom-0 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-rose-800/90 text-rose-800/90 before:border-l-current after:border-r-current",
      },
      size: {
        default: "h-[68px] w-[39px] ml-[20px] mr-[20px] before:border-l-[20px] after:border-r-[20px] before:border-t-[34px] before:border-b-[34px] after:border-t-[34px] after:border-b-[34px] before:right-[-20px] after:left-[-20px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface HexagonalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const HexagonalButton = React.forwardRef<
  HTMLButtonElement,
  HexagonalButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
HexagonalButton.displayName = "HexagonalButton";

export { HexagonalButton };
