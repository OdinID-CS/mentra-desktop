import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

/**
 * MentraButton - A premium button with soft glow and smooth transitions.
 */
export const MentraButton = React.forwardRef<
  HTMLButtonElement,
  HTMLMotionProps<"button"> & {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    glow?: boolean;
  }
>(({ className, variant = "primary", size = "md", glow = true, ...props }, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-accent-blue to-accent-purple text-white border-none hover:opacity-90",
    secondary: "bg-surface-light text-text-primary hover:bg-surface-light/80 border-none",
    outline: "bg-transparent border border-border text-text-primary hover:bg-white/5",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5 border-none",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        glow && variant === "primary" && "mentra-glow-blue",
        className
      )}
      {...props}
    />
  );
});

/**
 * MentraCard - A premium card with rounded corners and subtle glass effect.
 */
export const MentraCard = ({
  className,
  children,
  glow = false,
}: {
  className?: string;
  children: React.ReactNode;
  glow?: boolean;
}) => {
  return (
    <div
      className={cn(
        "mentra-glass rounded-2xl p-6 transition-all duration-300",
        glow && "mentra-glow-purple",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * MentraInput - A minimal, clean input field.
 */
export const MentraInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue/50 transition-all duration-200",
        className
      )}
      {...props}
    />
  );
});

/**
 * MentraBadge - A futuristic badge component.
 */
export const MentraBadge = ({
  children,
  className,
  variant = "blue",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "purple" | "emerald";
}) => {
  const variants = {
    blue: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
    purple: "bg-accent-purple/10 text-accent-purple border-accent-purple/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

/**
 * MentraHeading - Consistent typography for headings.
 */
export const MentraHeading = ({
  children,
  className,
  level = 1,
}: {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4;
}) => {
  const Tags = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
  } as const;
  const Tag = Tags[level];

  const styles = {
    1: "text-4xl md:text-5xl font-bold tracking-tight",
    2: "text-2xl md:text-3xl font-bold tracking-tight",
    3: "text-xl font-semibold tracking-tight",
    4: "text-lg font-semibold tracking-tight",
  };

  return (
    <Tag className={cn("text-text-primary", styles[level], className)}>
      {children}
    </Tag>
  );
};
