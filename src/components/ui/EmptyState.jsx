import React from 'react';
import { Button } from './Button';

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = ''
}) {
  return (
    <div className={`text-center py-12 px-6 bg-white border border-[#E3E8E2] rounded-xl ${className}`}>
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-[#F1F4EE] text-[#58655C] flex items-center justify-center mx-auto mb-3.5 border border-[#E3E8E2]">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-base font-semibold text-[#18201B]">{title}</h3>
      <p className="text-sm text-[#58655C] max-w-md mx-auto mt-1 leading-relaxed">
        {description}
      </p>
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex items-center justify-center gap-3 mt-5">
          {actionLabel && (
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && (
            <Button variant="secondary" size="sm" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
