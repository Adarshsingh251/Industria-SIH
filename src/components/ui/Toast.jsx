import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Toast() {
  const { activeToast } = useApp();

  if (!activeToast) return null;

  const { title, message, type = 'success' } = activeToast;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-[#245C3A] shrink-0" />,
    danger: <AlertCircle className="w-5 h-5 text-[#C23934] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#1B65A4] shrink-0" />
  };

  const bgMap = {
    success: "bg-white border-[#C5E6CE] shadow-lg",
    danger: "bg-white border-[#F9C3C3] shadow-lg",
    info: "bg-white border-[#C4DFF5] shadow-lg"
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-start gap-3 p-4 rounded-xl border ${bgMap[type]} max-w-md`}>
        {iconMap[type] || iconMap.success}
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-sm font-semibold text-[#18201B]">{title}</p>
          {message && <p className="text-xs text-[#58655C] mt-0.5 leading-relaxed">{message}</p>}
        </div>
      </div>
    </div>
  );
}
