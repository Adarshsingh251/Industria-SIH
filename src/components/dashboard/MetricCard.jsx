import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function MetricCard({
  title,
  value,
  subtext,
  icon: Icon,
  trend = null,
  linkTo,
  accent = 'default',
  badgeText = null
}) {
  const navigate = useNavigate();

  const accentStyles = {
    default: "border-[#D1D9D0] hover:border-[#245C3A]",
    brand: "border-[#7ED957]/50 hover:border-[#245C3A]",
    warning: "border-[#FCE4B6] hover:border-[#B37400]",
    accent: "border-[#F9D0E0] hover:border-[#F47BA6]"
  };

  const iconBgStyles = {
    default: "bg-[#F1F4EE] text-[#245C3A]",
    brand: "bg-[#EBF8E5] text-[#245C3A]",
    warning: "bg-[#FEF6E7] text-[#9A6200]",
    accent: "bg-[#FDF0F5] text-[#C03B6B]"
  };

  return (
    <div
      onClick={() => linkTo && navigate(linkTo)}
      className={`bg-white border rounded-xl p-5 transition-all duration-150 shadow-2xs hover:shadow-xs cursor-pointer group flex flex-col justify-between ${accentStyles[accent]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-[#58655C] uppercase tracking-wider">
            {title}
          </span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-3xl font-extrabold text-[#18201B] tracking-tight">
              {value}
            </span>
            {badgeText && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FEF6E7] text-[#9A6200] border border-[#FCE4B6]">
                {badgeText}
              </span>
            )}
          </div>
        </div>

        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBgStyles[accent]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E3E8E2] flex items-center justify-between text-xs">
        <span className="text-[#839187] font-medium">{subtext}</span>
        <div className="flex items-center text-[#245C3A] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          <span>View</span>
          <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
        </div>
      </div>
    </div>
  );
}
