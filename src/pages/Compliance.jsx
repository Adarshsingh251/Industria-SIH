import React, { useState } from 'react';
import { 
  CheckSquare, 
  Calendar as CalendarIcon, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  FileText, 
  Upload, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

export function Compliance() {
  const { complianceTasks, completeComplianceTask, showToast } = useApp();
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'calendar'
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [completeTaskModal, setCompleteTaskModal] = useState(null);
  const [completionNotes, setCompletionNotes] = useState('Filing acknowledged by Maharashtra portal desk');

  // Metrics computation
  const dueTodayCount = complianceTasks.filter(c => (c.status === 'ACTION_REQUIRED' || c.dueDays === 0) && c.status !== 'COMPLETED').length;
  const dueThisWeekCount = complianceTasks.filter(c => c.dueDays > 0 && c.dueDays <= 7 && c.status !== 'COMPLETED').length;
  const upcomingCount = complianceTasks.filter(c => c.dueDays > 7 && c.status !== 'COMPLETED').length;
  const completedCount = complianceTasks.filter(c => c.status === 'COMPLETED').length;

  const filteredTasks = complianceTasks.filter((task) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'DUE_SOON') return task.status === 'ACTION_REQUIRED' || task.status === 'DUE_SOON' || (task.dueDays <= 7 && task.status !== 'COMPLETED');
    if (activeFilter === 'UPCOMING') return task.status === 'UPCOMING' || task.status === 'SCHEDULED';
    if (activeFilter === 'COMPLETED') return task.status === 'COMPLETED';
    return true;
  });

  const handleConfirmCompletion = () => {
    if (!completeTaskModal) return;
    completeComplianceTask(completeTaskModal.id, completionNotes);
    setCompleteTaskModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 md:p-8 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-[#245C3A] uppercase tracking-wider bg-[#EBF8E5] px-2.5 py-0.5 rounded border border-[#D5EED0]">
              Post-Approval Lifecycle
            </span>
            <span className="text-xs text-[#839187]">
              Statutory Renewals & Environmental Filings
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
            Industrial Compliance Center
          </h1>
          <p className="text-sm text-[#58655C] mt-1.5 max-w-2xl leading-relaxed">
            Never miss a periodic factory renewal, hazardous waste Form 4 return, or fire safety drill audit required to maintain lawful plant operations.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-[#F1F4EE] p-1 rounded-xl border border-[#E3E8E2] shrink-0">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'table'
                ? 'bg-white text-[#18201B] shadow-2xs border border-[#D1D9D0]'
                : 'text-[#58655C] hover:text-[#18201B]'
            }`}
          >
            Table Schedule
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'calendar'
                ? 'bg-[#245C3A] text-white shadow-2xs'
                : 'text-[#245C3A] hover:bg-[#EBF8E5]'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            Calendar View
          </button>
        </div>
      </div>

      {/* Top 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#F9C3C3] rounded-xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#B02824] uppercase tracking-wider">Due Today</span>
            <p className="text-2xl font-extrabold text-[#18201B] mt-1">{dueTodayCount}</p>
            <span className="text-[11px] text-[#58655C]">Fire Safety Audit</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FDE8E8] text-[#B02824] flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-[#FCE4B6] rounded-xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#9A6200] uppercase tracking-wider">Due This Week</span>
            <p className="text-2xl font-extrabold text-[#18201B] mt-1">{dueThisWeekCount}</p>
            <span className="text-[11px] text-[#58655C]">MPCB Form 4 Return</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#FEF6E7] text-[#9A6200] flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-[#D5EED0] rounded-xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#245C3A] uppercase tracking-wider">Upcoming Month</span>
            <p className="text-2xl font-extrabold text-[#18201B] mt-1">{upcomingCount}</p>
            <span className="text-[11px] text-[#58655C]">Factory License & Form V</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#EBF8E5] text-[#245C3A] flex items-center justify-center">
            <CalendarIcon className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-[#D1D9D0] rounded-xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#58655C] uppercase tracking-wider">Completed Filings</span>
            <p className="text-2xl font-extrabold text-[#18201B] mt-1">{completedCount}</p>
            <span className="text-[11px] text-[#58655C]">Rule 27 Annual Return</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F1F4EE] text-[#245C3A] flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* TABLE SCHEDULE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white border border-[#D1D9D0] rounded-xl shadow-2xs overflow-hidden space-y-3 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E3E8E2]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#18201B]">Filter Tasks:</span>
              {[
                { id: 'ALL', label: 'All Filings' },
                { id: 'DUE_SOON', label: 'Due Soon / Urgent' },
                { id: 'UPCOMING', label: 'Upcoming' },
                { id: 'COMPLETED', label: 'Completed' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    activeFilter === f.id
                      ? 'bg-[#245C3A] text-white'
                      : 'bg-[#F1F4EE] text-[#58655C] hover:bg-[#E8EDE5]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-[#839187]">
              Showing {filteredTasks.length} statutory requirements
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBF9] border-b border-[#E3E8E2] text-[#58655C] font-semibold">
                <tr>
                  <th className="p-3.5">Statutory Requirement</th>
                  <th className="p-3.5">Related Approval Context</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Frequency</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8E2]">
                {filteredTasks.map((task) => {
                  const isCompleted = task.status === 'COMPLETED';
                  const isDueToday = task.status === 'ACTION_REQUIRED' || task.dueDays === 0;

                  return (
                    <tr key={task.id} className="hover:bg-[#FAFBF9] transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-start gap-2.5">
                          <CheckSquare className={`w-4 h-4 mt-0.5 shrink-0 ${isCompleted ? 'text-[#245C3A]' : isDueToday ? 'text-[#C23934]' : 'text-[#839187]'}`} />
                          <div>
                            <p className={`font-bold text-sm ${isCompleted ? 'line-through text-[#839187]' : 'text-[#18201B]'}`}>
                              {task.title}
                            </p>
                            <p className="text-[11px] text-[#58655C] mt-0.5">{task.description}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 font-medium text-[#18201B]">
                        {task.relatedApproval}
                      </td>

                      <td className="p-3.5 text-[#58655C]">
                        {task.department}
                      </td>

                      <td className="p-3.5 font-bold">
                        <span className={isDueToday ? 'text-[#C23934]' : isCompleted ? 'text-[#839187]' : 'text-[#18201B]'}>
                          {task.dueDate}
                        </span>
                      </td>

                      <td className="p-3.5 text-[#58655C]">
                        {task.frequency}
                      </td>

                      <td className="p-3.5">
                        <StatusBadge status={task.status} />
                      </td>

                      <td className="p-3.5 text-right">
                        {!isCompleted ? (
                          <Button
                            variant="primary"
                            size="sm"
                            icon={Check}
                            onClick={() => setCompleteTaskModal(task)}
                          >
                            Mark Filed
                          </Button>
                        ) : (
                          <span className="text-xs text-[#245C3A] font-semibold flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Filed ({task.completedAt})
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MONTHLY CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E2]">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-[#18201B]">October 2026 Statutory Calendar</h3>
              <Badge variant="brand" size="sm">
                4 Deadlines This Month
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#839187]">
              <span>Industrial Compliance Cycle: Q3 FY26-27</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#58655C] pb-2">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs">
            {/* Days placeholder for October 2026 */}
            {[
              { day: 28, isOtherMonth: true },
              { day: 29, isOtherMonth: true },
              { day: 30, isOtherMonth: true, event: { title: 'Fire Safety Audit Due', color: 'danger', task: complianceTasks[0] } },
              { day: 1 },
              { day: 2, event: { title: 'MPCB Field Inspection (11 AM)', color: 'info' } },
              { day: 3 },
              { day: 4 },
              { day: 5, event: { title: 'Form 4 Hazardous Return', color: 'warning', task: complianceTasks[1] } },
              { day: 6 },
              { day: 7 },
              { day: 8 },
              { day: 9 },
              { day: 10 },
              { day: 11 },
              { day: 12 },
              { day: 13 },
              { day: 14 },
              { day: 15, event: { title: 'Form V Environmental Statement', color: 'brand', task: complianceTasks[2] } },
              { day: 16 },
              { day: 17 },
              { day: 18 },
              { day: 19 },
              { day: 20 },
              { day: 21 },
              { day: 22 },
              { day: 23 },
              { day: 24, event: { title: 'Factory License Renewal (Form 2)', color: 'dark', task: complianceTasks[3] } },
              { day: 25 },
              { day: 26 },
              { day: 27 },
              { day: 28 },
              { day: 29 },
              { day: 30 },
              { day: 31 }
            ].map((cell, idx) => (
              <div
                key={idx}
                className={`min-h-[90px] p-2 rounded-xl border flex flex-col justify-between text-left transition-all ${
                  cell.isOtherMonth
                    ? 'bg-[#FAFBF9] border-[#E3E8E2] text-[#839187]'
                    : cell.event
                    ? 'bg-white border-[#245C3A] shadow-xs ring-1 ring-[#EBF8E5]'
                    : 'bg-white border-[#E3E8E2] hover:border-[#D1D9D0]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-bold ${cell.event ? 'text-[#245C3A]' : 'text-[#18201B]'}`}>
                    {cell.day}
                  </span>
                </div>

                {cell.event && (
                  <div
                    onClick={() => cell.event.task && setCompleteTaskModal(cell.event.task)}
                    className={`mt-1 p-1.5 rounded text-[10px] font-bold leading-tight cursor-pointer ${
                      cell.event.color === 'danger'
                        ? 'bg-[#FDE8E8] text-[#B02824] border border-[#F9C3C3]'
                        : cell.event.color === 'warning'
                        ? 'bg-[#FEF6E7] text-[#9A6200] border border-[#FCE4B6]'
                        : cell.event.color === 'brand'
                        ? 'bg-[#EBF8E5] text-[#245C3A] border border-[#D5EED0]'
                        : cell.event.color === 'dark'
                        ? 'bg-[#245C3A] text-white'
                        : 'bg-[#EAF3FB] text-[#17568C] border border-[#C4DFF5]'
                    }`}
                  >
                    {cell.event.title}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {completeTaskModal && (
        <Modal
          isOpen={true}
          onClose={() => setCompleteTaskModal(null)}
          title={`Mark Compliance Complete: ${completeTaskModal.title}`}
          subtitle={`${completeTaskModal.department} · Due: ${completeTaskModal.dueDate}`}
          maxWidth="max-w-lg"
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setCompleteTaskModal(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={Check}
                onClick={handleConfirmCompletion}
              >
                Confirm Filing Complete
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-xs text-[#58655C] leading-relaxed">
              {completeTaskModal.description}
            </p>

            <div className="p-3.5 bg-[#FAFBF9] border border-[#E3E8E2] rounded-xl text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#839187]">Required Document:</span>
                <span className="font-bold text-[#18201B]">{completeTaskModal.requiredDocument}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#839187]">Filing Frequency:</span>
                <span className="font-semibold text-[#245C3A]">{completeTaskModal.frequency}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#18201B]">
                Filing Reference / Acknowledgment Notes:
              </label>
              <textarea
                rows={3}
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                placeholder="Enter acknowledgement number or remarks (e.g. MH-MPCB-RET-9082 filed successfully)..."
                className="w-full p-2.5 text-xs bg-white border border-[#D1D9D0] rounded-lg text-[#18201B] focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
