import React, { useState } from 'react';
import { 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Eye, 
  Check, 
  AlertTriangle,
  Building,
  UserCheck,
  FastForward,
  RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

export function OfficerQueue() {
  const { applications, advanceApplicationStage, showToast, currentUserRole, setCurrentUserRole } = useApp();
  const navigate = useNavigate();

  const [selectedAppModal, setSelectedAppModal] = useState(null);
  const [officerNotes, setOfficerNotes] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');

  const filteredApps = applications.filter(app => {
    if (selectedDeptFilter === 'ALL') return true;
    return app.department.toLowerCase().includes(selectedDeptFilter.toLowerCase());
  });

  const handleOfficerApprove = (app) => {
    advanceApplicationStage(app.id, app.currentStage + 1, app.currentStage + 1 === 5 ? 'APPROVED' : null);
    setSelectedAppModal(null);
    showToast("Application Scrutiny Approved", `${app.title} advanced to next statutory stage.`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Officer Header */}
      <div className="bg-gradient-to-r from-[#18201B] to-[#245C3A] text-white rounded-xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#7ED957] bg-white/10 px-2.5 py-0.5 rounded border border-white/20">
                Government Officer Review Queue
              </span>
              <span className="text-xs text-white/80">
                Single Window Scrutiny Portal · Pune Region
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Statutory Application Scrutiny Desk
            </h1>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl leading-relaxed">
              Assigned queue for DISH Factory Inspectors, MFS Fire Scrutiny Officers, and MPCB Sub-Regional Field Officers to verify uploads and issue endorsements.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setCurrentUserRole('business_admin');
                navigate('/dashboard');
              }}
              className="bg-[#7ED957] text-[#173B25]"
            >
              Return to Enterprise Workspace
            </Button>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-[#18201B]">Scrutiny Desk:</span>
          {['ALL', 'Labour', 'Fire', 'MPCB', 'MSEDCL', 'DISH'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDeptFilter(dept)}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                selectedDeptFilter === dept
                  ? 'bg-[#245C3A] text-white'
                  : 'bg-[#F1F4EE] text-[#58655C] hover:bg-[#E8EDE5]'
              }`}
            >
              {dept === 'ALL' ? 'All Department Queues' : dept}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#839187] font-medium">
          {filteredApps.length} applications pending verification
        </span>
      </div>

      {/* Officer Work Queue Table */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFBF9] border-b border-[#E3E8E2] text-[#58655C] font-semibold">
              <tr>
                <th className="p-4">Application Dossier</th>
                <th className="p-4">Enterprise</th>
                <th className="p-4">Department & Officer</th>
                <th className="p-4">Current Stage</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Officer Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E2]">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-[#FAFBF9] transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-sm text-[#18201B]">{app.title}</p>
                    <p className="text-[11px] text-[#839187] font-mono mt-0.5">
                      {app.applicationNumber} · Submitted {app.submittedAt}
                    </p>
                  </td>

                  <td className="p-4">
                    <p className="font-semibold text-[#18201B]">Aarohan Precision Components</p>
                    <p className="text-[11px] text-[#839187]">Chakan MIDC · Pune</p>
                  </td>

                  <td className="p-4">
                    <p className="font-medium text-[#18201B]">{app.department}</p>
                    <p className="text-[11px] text-[#839187]">{app.officerInCharge}</p>
                  </td>

                  <td className="p-4 font-bold text-[#245C3A]">
                    Stage {app.currentStage} / {app.totalStages}
                  </td>

                  <td className="p-4">
                    <StatusBadge status={app.status} />
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/applications/${app.id}`)}
                    >
                      Inspect Dossier
                    </Button>

                    {app.currentStage < app.totalStages && (
                      <Button
                        variant="primary"
                        size="sm"
                        icon={FastForward}
                        onClick={() => handleOfficerApprove(app)}
                      >
                        Advance Stage
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
