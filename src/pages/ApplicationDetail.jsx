import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Upload, 
  Eye, 
  User, 
  Calendar, 
  Check, 
  Download, 
  Share2,
  Building,
  ShieldAlert,
  FastForward
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DocumentUploadModal } from '../components/documents/DocumentUploadModal';

export function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, documents, advanceApplicationStage, showToast } = useApp();

  const [activeUploadDoc, setActiveUploadDoc] = useState(null);

  const application = applications.find(a => a.id === id) || applications[0];

  if (!application) {
    return (
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-12 text-center">
        <h3 className="text-base font-bold text-[#18201B]">Application Not Found</h3>
        <Button variant="primary" size="sm" className="mt-4" onClick={() => navigate('/applications')}>
          Return to Applications
        </Button>
      </div>
    );
  }

  const hasMissingDoc = application.requiredDocuments?.some(d => d.status === 'MISSING');

  return (
    <div className="space-y-6">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/applications')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#58655C] hover:text-[#18201B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Applications</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Demo Advance Stage simulator */}
          {application.currentStage < application.totalStages && (
            <Button
              variant="secondary"
              size="sm"
              icon={FastForward}
              onClick={() => {
                advanceApplicationStage(application.id, application.currentStage + 1);
              }}
              title="Simulation: Advance this application to the next review milestone"
            >
              Advance Stage (Demo)
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => showToast("Dossier Downloaded", `Statutory application summary ${application.applicationNumber} downloaded.`)}
          >
            Download Dossier
          </Button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 md:p-8 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#245C3A] bg-[#EBF8E5] px-2.5 py-0.5 rounded border border-[#D5EED0]">
                {application.applicationNumber}
              </span>
              <span className="text-xs text-[#839187] font-medium">
                {application.department}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
              {application.title}
            </h1>

            <p className="text-xs text-[#58655C] mt-2 flex flex-wrap items-center gap-4">
              <span><b>Submitted:</b> {application.submittedAt}</span>
              <span><b>Last Updated:</b> {application.lastUpdatedAt}</span>
              {application.slaDaysRemaining > 0 && (
                <span className="text-[#245C3A] font-semibold bg-[#EBF8E5] px-2 py-0.5 rounded border border-[#D5EED0]">
                  SLA: {application.slaDaysRemaining} Days Remaining
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
            <StatusBadge status={application.status} />
            <span className="text-[11px] text-[#839187]">
              Current Stage: <b>{application.currentStage} of {application.totalStages}</b>
            </span>
          </div>
        </div>
      </div>

      {/* Action Notice Callout (If missing documents or action required) */}
      <div className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        application.status === 'DOCUMENTS_REQUIRED' || hasMissingDoc
          ? 'bg-[#FFFDF9] border-[#FCE4B6]'
          : application.status === 'INSPECTION_SCHEDULED'
          ? 'bg-[#FAFCF9] border-[#D5EED0]'
          : 'bg-white border-[#D1D9D0]'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            application.status === 'DOCUMENTS_REQUIRED' || hasMissingDoc
              ? 'bg-[#FEF6E7] text-[#9A6200]'
              : 'bg-[#EBF8E5] text-[#245C3A]'
          }`}>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#18201B]">
              Next Action Required
            </h4>
            <p className="text-xs text-[#58655C] mt-0.5 leading-relaxed">
              {application.nextAction}
            </p>
          </div>
        </div>

        {hasMissingDoc && (
          <Button
            variant="primary"
            size="md"
            icon={Upload}
            onClick={() => {
              const missingDoc = application.requiredDocuments.find(d => d.status === 'MISSING');
              const globalDoc = documents.find(d => d.id === missingDoc?.docId || d.name.includes('Fire'));
              setActiveUploadDoc(globalDoc || { id: missingDoc?.docId || 'doc-fire-plan', name: missingDoc?.name || 'Required Blueprint' });
            }}
          >
            Upload Missing Document
          </Button>
        )}
      </div>

      {/* 5-Stage Stepper Track */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs">
        <h3 className="text-base font-bold text-[#18201B] mb-5">Statutory Scrutiny Milestones</h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {application.stages.map((st, idx) => {
              const isCompleted = st.status === 'completed';
              const isInProgress = st.status === 'in_progress';
              const isActionReq = st.status === 'action_required';

              return (
                <div
                  key={st.id}
                  className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                    isInProgress
                      ? 'bg-[#FAFBF9] border-[#245C3A] ring-2 ring-[#EBF8E5]'
                      : isActionReq
                      ? 'bg-[#FFFDF9] border-[#FCE4B6] ring-2 ring-[#FEF6E7]'
                      : isCompleted
                      ? 'bg-[#FAFBF9] border-[#D5EED0]'
                      : 'bg-white border-[#E3E8E2] opacity-70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? 'bg-[#7ED957] text-[#173B25]'
                          : isActionReq
                          ? 'bg-[#E69D00] text-white'
                          : isInProgress
                          ? 'bg-[#245C3A] text-white'
                          : 'bg-[#F1F4EE] text-[#839187]'
                      }`}>
                        {isCompleted ? '✓' : idx + 1}
                      </span>

                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        isCompleted ? 'text-[#245C3A]' : isActionReq ? 'text-[#9A6200]' : isInProgress ? 'text-[#245C3A]' : 'text-[#839187]'
                      }`}>
                        {isCompleted ? 'Completed' : isActionReq ? 'Action' : isInProgress ? 'Active' : 'Pending'}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#18201B]">{st.name}</h4>
                    <p className="text-[11px] text-[#58655C] mt-1 leading-snug">{st.note}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#E3E8E2] text-[10px] font-medium text-[#839187]">
                    {st.date || 'Pending previous stage'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: Required Documents & Officer Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Required Documents Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#18201B]">Mandatory Application Documents</h3>
              <p className="text-xs text-[#58655C]">Document checklist verified by the Scrutiny Desk</p>
            </div>
            <span className="text-xs text-[#839187] font-semibold">
              {application.requiredDocuments?.filter(d => d.status === 'VERIFIED' || d.status === 'UPLOADED').length} / {application.requiredDocuments?.length} Ready
            </span>
          </div>

          <div className="border border-[#E3E8E2] rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBF9] border-b border-[#E3E8E2] text-[#58655C] font-semibold">
                <tr>
                  <th className="p-3">Document Title</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8E2]">
                {application.requiredDocuments?.map((doc, idx) => {
                  const globalDoc = documents.find(d => d.id === doc.docId || d.name === doc.name);

                  return (
                    <tr key={idx} className="hover:bg-[#FAFBF9] transition-colors">
                      <td className="p-3 font-medium text-[#18201B]">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#839187] shrink-0" />
                          <span>{doc.name}</span>
                        </div>
                      </td>

                      <td className="p-3">
                        <StatusBadge status={doc.status} />
                      </td>

                      <td className="p-3 text-right">
                        {doc.status === 'MISSING' ? (
                          <Button
                            variant="primary"
                            size="sm"
                            icon={Upload}
                            onClick={() => setActiveUploadDoc(globalDoc || { id: doc.docId, name: doc.name })}
                          >
                            Upload
                          </Button>
                        ) : (
                          <button
                            onClick={() => showToast("Document Preview", `Opening preview for ${doc.name}`, "info")}
                            className="text-xs font-semibold text-[#245C3A] hover:underline inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Officer In-Charge & Department Contact (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs">
            <h3 className="text-sm font-bold text-[#18201B] mb-3">Scrutiny Desk & Officer Details</h3>
            
            <div className="flex items-start gap-3 p-3 bg-[#FAFBF9] border border-[#E3E8E2] rounded-xl mb-3">
              <div className="w-8 h-8 rounded-full bg-[#245C3A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#18201B]">{application.officerInCharge}</p>
                <p className="text-[11px] text-[#839187] mt-0.5">Assigned Scrutiny Officer</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#58655C]">
              <div className="flex justify-between py-1 border-b border-[#F1F4EE]">
                <span className="text-[#839187]">Jurisdiction:</span>
                <span className="font-semibold text-[#18201B]">Chakan MIDC Division</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F1F4EE]">
                <span className="text-[#839187]">Desk Contact:</span>
                <span className="font-semibold text-[#18201B]">020-2712-4491</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#839187]">Email:</span>
                <span className="font-semibold text-[#18201B]">scrutiny.pune@maharashtra.gov.in</span>
              </div>
            </div>
          </div>

          {/* Activity Log for this application */}
          <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs">
            <h3 className="text-sm font-bold text-[#18201B] mb-3">Application Event Log</h3>
            <div className="space-y-3">
              {application.activityLog?.map((act, idx) => (
                <div key={idx} className="text-xs border-l-2 border-[#245C3A] pl-3 py-0.5">
                  <p className="font-semibold text-[#18201B]">{act.text}</p>
                  <p className="text-[10px] text-[#839187] mt-0.5">{act.actor} · {act.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Document Upload Modal */}
      {activeUploadDoc && (
        <DocumentUploadModal
          isOpen={true}
          onClose={() => setActiveUploadDoc(null)}
          targetDoc={activeUploadDoc}
          targetApprovalContext={application.title}
        />
      )}
    </div>
  );
}
