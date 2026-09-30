import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  ArrowRight, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Building, 
  Plus, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function Applications() {
  const { applications } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || app.status === selectedStatus;
    const matchesDept = selectedDept === 'ALL' || app.department.includes(selectedDept);

    return matchesSearch && matchesStatus && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 md:p-8 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-[#245C3A] uppercase tracking-wider bg-[#EBF8E5] px-2.5 py-0.5 rounded border border-[#D5EED0]">
              Application Tracker
            </span>
            <span className="text-xs text-[#839187]">
              Unified Maharashtra Single Window Submissions
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
            Industrial Applications & Clearances
          </h1>
          <p className="text-sm text-[#58655C] mt-1.5 max-w-2xl leading-relaxed">
            Track multi-stage statutory scrutinies, upload missing clearances, and manage department SLA timelines across your active industrial applications.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            size="md"
            icon={Plus}
            onClick={() => navigate('/discovery')}
          >
            New Approval Request
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#839187] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by application number, approval title, or department..."
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-[#18201B] focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-auto flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 text-xs md:text-sm bg-white border border-[#D1D9D0] rounded-lg text-[#18201B] focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
            >
              <option value="ALL">All Statuses</option>
              <option value="DOCUMENTS_REQUIRED">Documents Required (Action)</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="INSPECTION_SCHEDULED">Inspection Scheduled</option>
              <option value="APPROVED">Approved</option>
              <option value="SUBMITTED">Submitted</option>
            </select>
          </div>
        </div>

        {/* Quick Department Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E3E8E2] text-xs">
          <span className="text-[#839187] font-semibold">Filter by Dept:</span>
          {['ALL', 'Labour', 'Fire', 'MPCB', 'MSEDCL', 'DISH'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedDept === dept
                  ? 'bg-[#245C3A] text-white'
                  : 'bg-[#F1F4EE] text-[#58655C] hover:bg-[#E8EDE5]'
              }`}
            >
              {dept === 'ALL' ? 'All Departments' : dept}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white border border-[#D1D9D0] rounded-xl p-12 text-center">
            <FileText className="w-10 h-10 text-[#839187] mx-auto mb-2" />
            <h3 className="text-base font-bold text-[#18201B]">No applications match your filter</h3>
            <p className="text-xs text-[#58655C] mt-1">Try resetting the status filter or searching for a different term.</p>
          </div>
        ) : (
          filteredApplications.map((app) => (
            <div
              key={app.id}
              onClick={() => navigate(`/applications/${app.id}`)}
              className="bg-white border border-[#D1D9D0] hover:border-[#245C3A] rounded-xl p-5 md:p-6 shadow-2xs hover:shadow-xs transition-all duration-150 cursor-pointer group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-[#245C3A] bg-[#EBF8E5] px-2.5 py-0.5 rounded border border-[#D5EED0]">
                      {app.applicationNumber}
                    </span>
                    <span className="text-xs text-[#839187] font-medium">
                      {app.department}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#18201B] group-hover:text-[#245C3A] transition-colors">
                    {app.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={app.status} />
                  <div className="w-8 h-8 rounded-lg bg-[#F1F4EE] group-hover:bg-[#245C3A] group-hover:text-white text-[#58655C] flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Multi-Stage Stepper Progress Line */}
              <div className="p-3.5 bg-[#FAFBF9] border border-[#E3E8E2] rounded-xl mb-4">
                <div className="grid grid-cols-5 gap-2">
                  {app.stages.map((st, idx) => {
                    const isDone = st.status === 'completed';
                    const isCurrent = st.status === 'in_progress';
                    const isActionReq = st.status === 'action_required';

                    return (
                      <div key={st.id} className="flex flex-col">
                        <div
                          className={`h-2 rounded-full mb-1.5 transition-colors ${
                            isDone
                              ? 'bg-[#7ED957]'
                              : isActionReq
                              ? 'bg-[#E69D00]'
                              : isCurrent
                              ? 'bg-[#245C3A]'
                              : 'bg-[#E3E8E2]'
                          }`}
                        />
                        <span className={`text-[10px] font-bold truncate ${
                          isCurrent || isActionReq ? 'text-[#18201B]' : 'text-[#839187]'
                        }`}>
                          {idx + 1}. {st.name}
                        </span>
                        <span className="text-[9px] text-[#839187] truncate">
                          {st.date || 'Pending'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Metadata & Next Action Callout */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-3 border-t border-[#E3E8E2]">
                <div className="flex items-center gap-2 text-[#58655C]">
                  <span className="font-bold text-[#18201B]">Next Action:</span>
                  <span className="truncate max-w-md">{app.nextAction}</span>
                </div>

                <div className="flex items-center gap-4 text-[#839187] shrink-0 font-medium">
                  <span>Submitted: {app.submittedAt}</span>
                  {app.slaDaysRemaining > 0 && (
                    <span className="text-[#245C3A] font-semibold bg-[#EBF8E5] px-2 py-0.5 rounded border border-[#D5EED0]">
                      SLA: {app.slaDaysRemaining} Days Left
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
