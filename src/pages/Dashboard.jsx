import React from 'react';
import { 
  FileText, 
  AlertTriangle, 
  Calendar, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  TrendingUp, 
  CheckCircle2,
  Building,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/dashboard/MetricCard';
import { ActionCenter } from '../components/dashboard/ActionCenter';
import { ApplicationTimelineCard } from '../components/dashboard/ApplicationTimelineCard';
import { CompliancePreview } from '../components/dashboard/CompliancePreview';
import { SupportOpportunityCard } from '../components/dashboard/SupportOpportunityCard';
import { IndustrialRouteLine } from '../components/layout/IndustrialRouteLine';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function Dashboard() {
  const { 
    company, 
    applications, 
    complianceTasks, 
    schemes, 
    toggleSaveScheme, 
    completeComplianceTask,
    activityLogs
  } = useApp();
  
  const navigate = useNavigate();

  // Metrics computation
  const activeAppsCount = applications.length; // 5 demo active + 3 queued = 08
  const pendingActionsCount = applications.filter(a => a.status === 'DOCUMENTS_REQUIRED' || a.status === 'INSPECTION_SCHEDULED').length + 1; // 3
  const complianceDueCount = complianceTasks.filter(c => c.status !== 'COMPLETED').length; // 5
  const supportOpportunitiesCount = 12; // 12 identified opportunities

  return (
    <div className="space-y-6">
      {/* Dashboard Hero Header */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 md:p-8 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#245C3A] uppercase tracking-wider bg-[#EBF8E5] px-2.5 py-0.5 rounded border border-[#D5EED0]">
                Enterprise Workspace
              </span>
              <span className="text-xs text-[#839187]">
                Maharashtra Industrial Development Corporation (MIDC)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
              Good morning, {company.tradeName}
            </h1>

            <p className="text-sm text-[#58655C] mt-1.5 max-w-2xl leading-relaxed">
              Here’s what needs your attention today across statutory approvals, pending documentation, upcoming compliance filings, and state MSME subsidies.
            </p>
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="primary"
              size="md"
              icon={AlertTriangle}
              onClick={() => {
                const fireApp = applications.find(a => a.approvalId === 'appr-fire-noc');
                if (fireApp) navigate(`/applications/${fireApp.id}`);
                else navigate('/applications');
              }}
            >
              Review Pending Actions (3)
            </Button>

            <Button
              variant="secondary"
              size="md"
              icon={Award}
              onClick={() => navigate('/support')}
            >
              Explore Support Schemes
            </Button>
          </div>
        </div>
      </div>

      {/* Signature Industrial Route Line Visual */}
      <IndustrialRouteLine currentStage="review" />

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Applications"
          value="08"
          subtext="Across DISH, Fire, MPCB, MSEDCL"
          icon={FileText}
          linkTo="/applications"
          accent="brand"
        />

        <MetricCard
          title="Pending Actions"
          value="03"
          subtext="1 Missing Doc · 1 Inspection · 1 Filing"
          icon={AlertTriangle}
          linkTo="/applications"
          accent="warning"
          badgeText="Urgent"
        />

        <MetricCard
          title="Compliance Due"
          value="05"
          subtext="1 Due today · 1 Due in 5 days"
          icon={Calendar}
          linkTo="/compliance"
          accent="default"
        />

        <MetricCard
          title="Support Opportunities"
          value="12"
          subtext="Up to ₹2.50 Cr Subsidies Matched"
          icon={Award}
          linkTo="/support"
          accent="accent"
          badgeText="98% Match"
        />
      </div>

      {/* Action Center: Needs Your Attention */}
      <ActionCenter
        applications={applications}
        complianceTasks={complianceTasks}
      />

      {/* Active Applications Stage-by-Stage Tracker */}
      <ApplicationTimelineCard applications={applications} />

      {/* Side-by-Side: Compliance Preview & Government Support Discovery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CompliancePreview
          complianceTasks={complianceTasks}
          onCompleteTask={(taskId) => completeComplianceTask(taskId)}
        />

        <SupportOpportunityCard
          schemes={schemes}
          onToggleSave={(schemeId) => toggleSaveScheme(schemeId)}
        />
      </div>

      {/* Recent Audit & Activity Trail */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[#18201B]">Recent Statutory Audit Trail</h3>
            <p className="text-xs text-[#58655C]">Immutable event log of department submissions and scrutiny updates</p>
          </div>
          <Badge variant="outline" size="sm">
            Live Stream
          </Badge>
        </div>

        <div className="divide-y divide-[#E3E8E2]">
          {activityLogs.slice(0, 4).map((log) => (
            <div key={log.id} className="py-3 flex items-start justify-between gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#245C3A] mt-1.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#18201B]">{log.action}</p>
                  <p className="text-[#839187] mt-0.5">{log.user} · Module: {log.module}</p>
                </div>
              </div>
              <span className="text-[#839187] font-medium shrink-0">{log.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
