import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

export function Button({ 
  children, 
  className = "", 
  variant = "default", 
  size = "default",
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  const variantClasses = variant === "outline" 
    ? "border border-slate-600 text-slate-300 hover:bg-slate-700" 
    : "bg-slate-600 text-white hover:bg-slate-700";
  const sizeClasses = size === "sm" ? "px-3 py-1 text-sm" : "px-4 py-2";

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
