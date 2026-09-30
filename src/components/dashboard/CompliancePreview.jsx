import React from 'react';
import { Calendar, AlertTriangle, CheckCircle2, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';

export function CompliancePreview({ complianceTasks, onCompleteTask }) {
  const navigate = useNavigate();

  const dueThisWeek = complianceTasks.filter(c => c.dueDays >= 0 && c.dueDays <= 7 && c.status !== 'COMPLETED');
  const upcoming = complianceTasks.filter(c => c.dueDays > 7 && c.status !== 'COMPLETED');

  return (
    <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EBF8E5] text-[#245C3A] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#18201B]">Compliance Calendar</h3>
              <p className="text-xs text-[#58655C]">Upcoming statutory returns & license renewals</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/compliance')}
            className="text-xs text-[#245C3A] font-semibold"
          >
            All Filings →
          </Button>
        </div>

        <div className="space-y-3">
          {complianceTasks.slice(0, 4).map((task) => {
            const isCompleted = task.status === 'COMPLETED';
            const isDueToday = task.status === 'ACTION_REQUIRED' || task.dueDays === 0;

            return (
              <div
                key={task.id}
                className={`p-3.5 rounded-lg border transition-all ${
                  isDueToday
                    ? 'border-[#F9C3C3] bg-[#FEF6F6]'
                    : isCompleted
                    ? 'border-[#E3E8E2] bg-[#FAFBF9] opacity-75'
                    : 'border-[#E3E8E2] bg-white hover:border-[#D1D9D0]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs font-bold truncate ${isCompleted ? 'line-through text-[#839187]' : 'text-[#18201B]'}`}>
                        {task.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#58655C] mt-0.5">
                      {task.department} · {task.frequency}
                    </p>
                  </div>

                  <StatusBadge status={task.status} />
                </div>

                <div className="mt-3 pt-2 border-t border-[#E3E8E2]/60 flex items-center justify-between text-xs">
                  <span className={`font-semibold ${isDueToday ? 'text-[#C23934]' : 'text-[#58655C]'}`}>
                    Due: {task.dueDate}
                  </span>

                  {!isCompleted ? (
                    <button
                      onClick={() => onCompleteTask(task.id)}
                      className="text-[11px] font-semibold text-[#245C3A] hover:text-[#173B25] flex items-center gap-1 bg-[#EBF8E5] px-2 py-0.5 rounded border border-[#D5EED0] hover:bg-[#D5EED0] transition-colors"
                    >
                      <Check className="w-3 h-3" />
                      Mark Filed
                    </button>
                  ) : (
                    <span className="text-[11px] text-[#245C3A] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Filed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E3E8E2] text-center">
        <button
          onClick={() => navigate('/compliance')}
          className="text-xs font-semibold text-[#245C3A] hover:underline"
        >
          View Full Compliance Schedule & Calendar →
        </button>
      </div>
    </div>
  );
}
