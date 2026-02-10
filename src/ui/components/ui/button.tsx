import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariantsCva = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const variantStyles: Record<string, string> = {
  default:
    "relative text-white/90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] bg-[radial-gradient(ellipse_at_bottom,rgba(180,140,60,0.95)_0%,rgba(120,85,30,0.98)_45%)] hover:text-white hover:scale-[1.02] hover:-translate-y-0.5 before:opacity-20 hover:before:opacity-100",
  destructive:
    "relative text-white/90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] bg-[radial-gradient(ellipse_at_bottom,rgba(220,80,60,0.95)_0%,rgba(140,40,30,0.98)_45%)] hover:text-white hover:scale-[1.02] hover:-translate-y-0.5 before:opacity-20 hover:before:opacity-100",
  outline:
    "relative text-foreground/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] bg-[radial-gradient(ellipse_at_bottom,rgba(71,81,92,0.9)_0%,rgba(11,21,30,0.95)_45%)] hover:text-foreground hover:scale-[1.02] hover:-translate-y-0.5 before:opacity-20 hover:before:opacity-100",
  secondary:
    "relative text-foreground/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] bg-[radial-gradient(ellipse_at_bottom,rgba(71,81,92,0.9)_0%,rgba(11,21,30,0.95)_45%)] hover:text-foreground hover:scale-[1.02] hover:-translate-y-0.5 before:opacity-20 hover:before:opacity-100",
  ghost:
    "relative text-foreground/80 hover:text-foreground hover:bg-white/5 before:opacity-0 hover:before:opacity-50",
  link:
    "bg-transparent shadow-none hover:underline hover:scale-100 hover:translate-y-0",
};

const sizeStyles: Record<string, string> = {
  default: "rounded-[7px] py-2 px-3.5 text-sm font-medium min-w-0",
  sm: "rounded-[6px] py-1.5 px-2.5 text-xs font-medium min-w-0",
  lg: "rounded-[8px] py-2.5 px-4 text-sm font-medium min-w-0",
  icon: "rounded-[7px] p-2 size-8 min-w-0",
};

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}) {
  const v = variant as ButtonVariant;
  const s = size as ButtonSize;
  const isLink = v === "link";

  const buttonClass = cn(
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer border-0 transition-[transform,color,box-shadow] duration-300 ease-[cubic-bezier(0.15,0.83,0.66,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variantStyles[v],
    sizeStyles[s],
    !isLink &&
      "before:content-[''] before:absolute before:left-[15%] before:right-[15%] before:bottom-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:transition-opacity before:duration-300 before:pointer-events-none",
    className
  );

  const Comp = asChild ? Slot : "button";

  return (
    <Comp data-slot="button" className={buttonClass} {...props}>
      {children}
    </Comp>
  );
}

export const buttonVariants = buttonVariantsCva;
export { Button };
