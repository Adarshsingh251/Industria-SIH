import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({ children, variant = 'default', size = 'md', className = '', icon: Icon = null }) {
  const baseStyles = "inline-flex items-center font-medium transition-colors";
  
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs rounded-md gap-1",
    md: "px-2.5 py-1 text-xs rounded-md gap-1.5",
    lg: "px-3 py-1.5 text-sm rounded-lg gap-2"
  };

  const variantStyles = {
    default: "bg-[#F1F4EE] text-[#58655C] border border-[#E3E8E2]",
    brand: "bg-[#EBF8E5] text-[#245C3A] border border-[#D5EED0]",
    dark: "bg-[#245C3A] text-white",
    accent: "bg-[#FDF0F5] text-[#C03B6B] border border-[#F9D0E0]",
    success: "bg-[#E8F5EB] text-[#1E5733] border border-[#C5E6CE]",
    warning: "bg-[#FEF6E7] text-[#9A6200] border border-[#FCE4B6]",
    danger: "bg-[#FDE8E8] text-[#B02824] border border-[#F9C3C3]",
    info: "bg-[#EAF3FB] text-[#17568C] border border-[#C4DFF5]",
    outline: "bg-transparent text-[#58655C] border border-[#D1D9D0]"
  };

  return (
    <span className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </span>
  );
}
