import React, { useState, useEffect, useMemo } from 'react';
import { Search, FileText, CheckSquare, Award, ArrowRight, X, ExternalLink, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { APPROVAL_CATALOG } from '../../services/approvalEngine';
import { StatusBadge } from './StatusBadge';

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { applications, documents, complianceTasks, schemes } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle search
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().trim();

    // 1. Applications
    const matchedApps = applications.filter(app => 
      app.title.toLowerCase().includes(q) ||
      app.applicationNumber.toLowerCase().includes(q) ||
      app.department.toLowerCase().includes(q) ||
      app.statusLabel.toLowerCase().includes(q)
    );

    // 2. Approvals Catalog
    const matchedApprovals = APPROVAL_CATALOG.filter(appr => 
      appr.name.toLowerCase().includes(q) ||
      appr.department.toLowerCase().includes(q) ||
      appr.category.toLowerCase().includes(q)
    );

    // 3. Documents
    const matchedDocs = documents.filter(doc => 
      doc.name.toLowerCase().includes(q) ||
      doc.category.toLowerCase().includes(q) ||
      doc.relatedApproval.toLowerCase().includes(q)
    );

    // 4. Compliance Tasks
    const matchedCompliance = complianceTasks.filter(comp => 
      comp.title.toLowerCase().includes(q) ||
      comp.department.toLowerCase().includes(q)
    );

    // 5. Schemes
    const matchedSchemes = schemes.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );

    return {
      apps: matchedApps,
      approvals: matchedApprovals,
      docs: matchedDocs,
      compliance: matchedCompliance,
      schemes: matchedSchemes,
      totalCount: matchedApps.length + matchedApprovals.length + matchedDocs.length + matchedCompliance.length + matchedSchemes.length
    };
  }, [query, applications, documents, complianceTasks, schemes]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative bg-white border border-[#D1D9D0] rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E3E8E2] bg-[#FAFBF9]">
          <Search className="w-5 h-5 text-[#839187] mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search approvals, applications, documents, compliance, schemes... (e.g. fire, NOC, solar, MPCB)"
            className="w-full bg-transparent text-sm text-[#18201B] placeholder-[#839187] focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#839187] hover:text-[#18201B]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-[#839187]">
              <p className="font-medium text-[#58655C]">Quick Suggestions:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {['Fire NOC', 'Factory License', 'MPCB CTO', 'Solar Subsidy', 'Building Plan', 'Electricity'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-[#F1F4EE] hover:bg-[#E8EDE5] text-[#245C3A] rounded-md font-medium text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults?.totalCount === 0 ? (
            <div className="py-8 text-center text-sm text-[#58655C]">
              No matching records found for "{query}".
            </div>
          ) : (
            <>
              {/* Applications Section */}
              {searchResults.apps.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#58655C] uppercase tracking-wider mb-2">
                    Applications ({searchResults.apps.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.apps.map(app => (
                      <div
                        key={app.id}
                        onClick={() => {
                          onClose();
                          navigate(`/applications/${app.id}`);
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F1F4EE] cursor-pointer transition-colors border border-transparent hover:border-[#E3E8E2]"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-[#245C3A]" />
                          <div>
                            <p className="text-sm font-semibold text-[#18201B]">{app.title}</p>
                            <p className="text-xs text-[#839187]">{app.applicationNumber} · {app.department}</p>
                          </div>
                        </div>
                        <StatusBadge status={app.status} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approvals Catalog Section */}
              {searchResults.approvals.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#58655C] uppercase tracking-wider mb-2">
                    Approval Roadmap Templates ({searchResults.approvals.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.approvals.map(appr => (
                      <div
                        key={appr.id}
                        onClick={() => {
                          onClose();
                          navigate('/discovery');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F1F4EE] cursor-pointer transition-colors border border-transparent hover:border-[#E3E8E2]"
                      >
                        <div className="flex items-center gap-3">
                          <Shield className="w-4 h-4 text-[#7ED957]" />
                          <div>
                            <p className="text-sm font-semibold text-[#18201B]">{appr.name}</p>
                            <p className="text-xs text-[#839187]">{appr.department}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#839187]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Section */}
              {searchResults.docs.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#58655C] uppercase tracking-wider mb-2">
                    Documents ({searchResults.docs.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.docs.map(doc => (
                      <div
                        key={doc.id}
                        onClick={() => {
                          onClose();
                          navigate('/documents');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F1F4EE] cursor-pointer transition-colors border border-transparent hover:border-[#E3E8E2]"
                      >
                        <div>
                          <p className="text-sm font-medium text-[#18201B]">{doc.name}</p>
                          <p className="text-xs text-[#839187]">{doc.relatedApproval}</p>
                        </div>
                        <StatusBadge status={doc.status} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compliance Tasks */}
              {searchResults.compliance.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#58655C] uppercase tracking-wider mb-2">
                    Compliance Tasks ({searchResults.compliance.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.compliance.map(comp => (
                      <div
                        key={comp.id}
                        onClick={() => {
                          onClose();
                          navigate('/compliance');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F1F4EE] cursor-pointer transition-colors border border-transparent hover:border-[#E3E8E2]"
                      >
                        <div className="flex items-center gap-2">
                          <CheckSquare className="w-4 h-4 text-[#245C3A]" />
                          <p className="text-sm text-[#18201B] font-medium">{comp.title}</p>
                        </div>
                        <span className="text-xs text-[#839187]">Due {comp.dueDate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Support Schemes */}
              {searchResults.schemes.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-[#58655C] uppercase tracking-wider mb-2">
                    Government Support Schemes ({searchResults.schemes.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.schemes.map(sch => (
                      <div
                        key={sch.id}
                        onClick={() => {
                          onClose();
                          navigate('/support');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F1F4EE] cursor-pointer transition-colors border border-transparent hover:border-[#E3E8E2]"
                      >
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#F47BA6]" />
                          <p className="text-sm text-[#18201B] font-medium">{sch.title}</p>
                        </div>
                        <span className="text-xs font-semibold text-[#245C3A]">{sch.matchScore}% Match</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 border-t border-[#E3E8E2] bg-[#FAFBF9] flex items-center justify-between text-xs text-[#839187]">
          <span>Use <b>ESC</b> to close</span>
          <span>SIH26130 · INDUSTRIA Central Registry</span>
        </div>
      </div>
    </div>
  );
}
