import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const interfaceWrapperVariants = cva("fixed transparent p-4", {
  variants: {
    variant: {
      default: "bottom-0 left-0",
      topleft: "top-0 left-0",
      topright: "top-0 right-0",
      bottom: "bottom-0 right-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface InterfaceWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof interfaceWrapperVariants> {
  children: React.ReactNode;
}

const InterfaceWrapper = React.forwardRef<
  HTMLDivElement,
  InterfaceWrapperProps
>(({ className, variant, children, ...props }, ref) => {
  return (
    <div
      className={cn(interfaceWrapperVariants({ variant, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
InterfaceWrapper.displayName = "Interface";

export { InterfaceWrapper };
