import React from 'react';
import { ArrowRight, CheckCircle2, Clock, AlertTriangle, ChevronRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';

export function ApplicationTimelineCard({ applications }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-[#18201B]">Active Applications Lifecycle</h3>
          <p className="text-xs text-[#58655C]">Stage-by-stage statutory clearance progress across departments</p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => navigate('/applications')}
        >
          View All Applications
        </Button>
      </div>

      <div className="space-y-4">
        {applications.slice(0, 4).map((app) => (
          <div
            key={app.id}
            onClick={() => navigate(`/applications/${app.id}`)}
            className="p-4 rounded-xl border border-[#E3E8E2] hover:border-[#245C3A] hover:bg-[#FAFBF9] transition-all duration-150 cursor-pointer group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#F1F4EE] text-[#245C3A] flex items-center justify-center font-bold text-xs">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#18201B] group-hover:text-[#245C3A] transition-colors">
                    {app.title}
                  </h4>
                  <p className="text-xs text-[#839187]">
                    {app.applicationNumber} · {app.department}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <StatusBadge status={app.status} />
              </div>
            </div>

            {/* Stepper Line */}
            <div className="pt-2">
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {app.stages.map((stage, idx) => {
                  const isDone = stage.status === 'completed';
                  const isInProgress = stage.status === 'in_progress';
                  const isActionRequired = stage.status === 'action_required';

                  return (
                    <div key={stage.id} className="flex flex-col">
                      <div
                        className={`h-1.5 rounded-full transition-colors ${
                          isDone
                            ? 'bg-[#7ED957]'
                            : isActionRequired
                            ? 'bg-[#E69D00]'
                            : isInProgress
                            ? 'bg-[#245C3A]'
                            : 'bg-[#E3E8E2]'
                        }`}
                      />
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className={`text-[10px] font-semibold truncate ${
                          isInProgress || isActionRequired ? 'text-[#18201B]' : 'text-[#839187]'
                        }`}>
                          {idx + 1}. {stage.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Action Footnote */}
            <div className="mt-3 pt-2.5 border-t border-[#F1F4EE] flex items-center justify-between text-xs">
              <span className="text-[#58655C] truncate max-w-xl">
                <span className="font-semibold text-[#18201B]">Next Action: </span>
                {app.nextAction}
              </span>
              <span className="text-[11px] text-[#839187] shrink-0 font-medium ml-2">
                Updated {app.lastUpdatedAt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
