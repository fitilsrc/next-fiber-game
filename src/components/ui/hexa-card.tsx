import React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const hexagonalCardVariants = cva(
  "backdrop-blur-md relative before:content-[''] after:content-[''] before:border-solid after:border-solid before:border-t-transparent after:border-t-transparent before:border-b-transparent after:border-b-transparent before:w-0 after:w-0 before:h-0 after:h-0 before:absolute after:absolute before:top-0 after:bottom-0 items-center text-left py-2 flex",
  {
    variants: {
      variant: {
        default: "bg-gray-400/40 before:border-l-gray-400/40 after:border-r-gray-400/40 w-fit text-white min-w-16 absolute top-0 -translate-y-1/2 -left-2 z-50",
      },
      size: {
        default: "ml-[14px] mr-[14px] h-[54px] before:border-l-[16px] before:border-t-[27px] before:border-b-[27px] before:right-[-16px] after:border-r-[16px] after:border-t-[27px] after:border-b-[27px] after:left-[-16px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface HexagonalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hexagonalCardVariants> {
  children: React.ReactNode;
}

const HexagonalCard = React.forwardRef<HTMLDivElement, HexagonalCardProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div className="flex relative">
        <div
          className={cn(hexagonalCardVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);
HexagonalCard.displayName = "Card";

export { HexagonalCard };
