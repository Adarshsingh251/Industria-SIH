import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon = null,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2 shadow-xs",
    lg: "px-5 py-2.5 text-base gap-2.5 shadow-sm"
  };

  const variantStyles = {
    // Primary: Parrot green with deep green text for accessibility
    primary: "bg-[#7ED957] hover:bg-[#6EC748] text-[#173B25] font-semibold focus:ring-[#7ED957] border border-[#6EC748]/60",
    
    // Deep Green: Authority/Formal actions
    dark: "bg-[#245C3A] hover:bg-[#1C4B2E] text-white focus:ring-[#245C3A] border border-[#1C4B2E]",
    
    // Secondary: Clean white with crisp border
    secondary: "bg-white hover:bg-[#F1F4EE] text-[#18201B] border border-[#D1D9D0] focus:ring-[#245C3A]/20",
    
    // Accent Pink: Controlled highlights / support
    accent: "bg-[#F47BA6] hover:bg-[#E46693] text-white font-medium focus:ring-[#F47BA6]",
    
    // Outline Accent
    accentOutline: "bg-[#FDF0F5] hover:bg-[#FAE1EC] text-[#C03B6B] border border-[#F9D0E0] focus:ring-[#F47BA6]",

    // Danger
    danger: "bg-[#FDE8E8] hover:bg-[#FBD5D5] text-[#B02824] border border-[#F9C3C3] focus:ring-[#B02824]",
    
    // Ghost
    ghost: "bg-transparent hover:bg-[#F1F4EE] text-[#58655C] hover:text-[#18201B] border-transparent"
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
