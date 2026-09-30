import React from 'react';
import { Check, Compass, FileCheck, Send, Eye, ShieldCheck, RefreshCw, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LIFECYCLE_STAGES = [
  { id: 'discover', label: 'Discover', desc: 'Identify statutory approvals', path: '/discovery', icon: Compass },
  { id: 'prepare', label: 'Prepare', desc: 'Assemble required documents', path: '/documents', icon: FileCheck },
  { id: 'apply', label: 'Apply', desc: 'Single-window submission', path: '/applications', icon: Send },
  { id: 'review', label: 'Review', desc: 'Department scrutiny & field inspection', path: '/applications', icon: Eye },
  { id: 'approve', label: 'Approve', desc: 'Statutory certificate grant', path: '/applications', icon: ShieldCheck },
  { id: 'comply', label: 'Comply', desc: 'Renewals & recurring filings', path: '/compliance', icon: RefreshCw },
  { id: 'grow', label: 'Grow', desc: 'MSME subsidies & fiscal incentives', path: '/support', icon: TrendingUp }
];

export function IndustrialRouteLine({ currentStage = 'apply', className = '', compact = false }) {
  const navigate = useNavigate();

  const currentIndex = LIFECYCLE_STAGES.findIndex(s => s.id === currentStage);

  return (
    <div className={`w-full bg-white border border-[#D1D9D0] rounded-xl p-4 md:p-5 shadow-xs ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7ED957]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#245C3A]">
            Unified Industrial Lifecycle Track
          </h4>
        </div>
        <span className="text-xs text-[#58655C] font-medium hidden sm:inline">
          Aarohan Precision Components Pvt. Ltd. · Chakan MIDC
        </span>
      </div>

      <div className="relative mt-2">
        {/* Connection line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-[#E3E8E2] z-0" />
        
        {/* Nodes */}
        <div className="relative z-10 flex items-center justify-between">
          {LIFECYCLE_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const Icon = stage.icon;

            return (
              <div 
                key={stage.id} 
                onClick={() => stage.path && navigate(stage.path)}
                title={`${stage.label}: ${stage.desc}`}
                className="group flex flex-col items-center cursor-pointer select-none"
              >
                <div
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                    isCompleted
                      ? 'bg-[#7ED957] border-[#6EC748] text-[#173B25]'
                      : isCurrent
                      ? 'bg-[#245C3A] border-[#245C3A] text-white shadow-md ring-4 ring-[#EBF8E5]'
                      : 'bg-white border-[#D1D9D0] text-[#839187] group-hover:border-[#7ED957]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {!compact && (
                  <div className="text-center mt-2 hidden sm:block">
                    <p className={`text-xs font-semibold ${isCurrent ? 'text-[#245C3A]' : 'text-[#18201B]'}`}>
                      {stage.label}
                    </p>
                    <p className="text-[10px] text-[#839187] max-w-[80px] truncate">
                      {stage.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
