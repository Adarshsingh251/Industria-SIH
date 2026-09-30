import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
  footer = null
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className={`relative bg-white border border-[#D1D9D0] rounded-xl shadow-xl w-full ${maxWidth} overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 my-8`}>
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4.5 border-b border-[#E3E8E2] bg-[#FAFBF9]">
          <div>
            <h3 className="text-base font-semibold text-[#18201B]">{title}</h3>
            {subtitle && (
              <p className="text-xs text-[#58655C] mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#839187] hover:text-[#18201B] p-1 rounded-md hover:bg-[#F1F4EE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[calc(85vh-130px)] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-3.5 border-t border-[#E3E8E2] bg-[#FAFBF9] flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
