import React from 'react';
import { AlertTriangle, Clock, Calendar, CheckCircle, ArrowRight, Upload, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';

export function ActionCenter({ applications, complianceTasks, onUploadDocClick }) {
  const navigate = useNavigate();

  // Highlight urgent items
  const fireNocApp = applications.find(a => a.approvalId === 'appr-fire-noc');
  const factoryLicApp = applications.find(a => a.approvalId === 'appr-factory-lic');
  const mpcbApp = applications.find(a => a.approvalId === 'appr-mpcb-cto');
  const urgentCompliance = complianceTasks.find(c => c.status === 'ACTION_REQUIRED' || c.status === 'DUE_TODAY');

  return (
    <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#FEF6E7] text-[#9A6200] flex items-center justify-center border border-[#FCE4B6]">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#18201B]">Needs Your Attention</h3>
            <p className="text-xs text-[#58655C]">Prioritized operational blockers and statutory milestones</p>
          </div>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-[#F1F4EE] text-[#58655C] rounded-md border border-[#E3E8E2]">
          3 Actions Pending
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Action Item 1: Fire NOC */}
        {fireNocApp && (
          <div className="border border-[#FCE4B6] bg-[#FFFCF5] rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#FCE4B6]/20 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#9A6200] uppercase tracking-wider">
                  Fire Prevention Wing
                </span>
                <span className="text-[11px] font-bold text-[#B02824] bg-[#FDE8E8] px-2 py-0.5 rounded border border-[#F9C3C3]">
                  Action Due
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#18201B]">{fireNocApp.title}</h4>
              <p className="text-xs text-[#58655C] mt-1 line-clamp-2">
                {fireNocApp.nextAction}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#FCE4B6]/60 flex items-center justify-between">
              <span className="text-xs text-[#839187]">App: {fireNocApp.applicationNumber}</span>
              <Button
                variant="primary"
                size="sm"
                icon={Upload}
                onClick={() => navigate(`/applications/${fireNocApp.id}`)}
              >
                Upload Document
              </Button>
            </div>
          </div>
        )}

        {/* Action Item 2: Pollution Consent (MPCB) */}
        {mpcbApp && (
          <div className="border border-[#D5EED0] bg-[#FAFCF9] rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#245C3A] uppercase tracking-wider">
                  MPCB Pune-II
                </span>
                <span className="text-[11px] font-bold text-[#17568C] bg-[#EAF3FB] px-2 py-0.5 rounded border border-[#C4DFF5]">
                  02 Oct 2026
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#18201B]">{mpcbApp.title}</h4>
              <p className="text-xs text-[#58655C] mt-1 line-clamp-2">
                {mpcbApp.nextAction}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E3E8E2] flex items-center justify-between">
              <span className="text-xs text-[#839187]">Stage 4/5: Inspection</span>
              <Button
                variant="secondary"
                size="sm"
                icon={Eye}
                onClick={() => navigate(`/applications/${mpcbApp.id}`)}
              >
                Inspection Checklist
              </Button>
            </div>
          </div>
        )}

        {/* Action Item 3: Factory License (Labour DISH) */}
        {factoryLicApp && (
          <div className="border border-[#E3E8E2] bg-[#FAFBF9] rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#58655C] uppercase tracking-wider">
                  DISH Labour Dept
                </span>
                <span className="text-[11px] font-medium text-[#245C3A] bg-[#EBF8E5] px-2 py-0.5 rounded border border-[#D5EED0]">
                  SLA: 9 Days Left
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#18201B]">{factoryLicApp.title}</h4>
              <p className="text-xs text-[#58655C] mt-1 line-clamp-2">
                {factoryLicApp.nextAction}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E3E8E2] flex items-center justify-between">
              <span className="text-xs text-[#839187]">Stage 3/5: Scrutiny</span>
              <Button
                variant="secondary"
                size="sm"
                icon={Eye}
                onClick={() => navigate(`/applications/${factoryLicApp.id}`)}
              >
                Track Status
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
