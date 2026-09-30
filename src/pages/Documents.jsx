import React, { useState } from 'react';
import { 
  Files, 
  Search, 
  Upload, 
  Eye, 
  Filter, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Download, 
  ShieldCheck, 
  Plus,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DocumentUploadModal } from '../components/documents/DocumentUploadModal';

export function Documents() {
  const { documents, showToast } = useApp();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUploadDoc, setSelectedUploadDoc] = useState(null);

  const filterTabs = [
    { id: 'ALL', label: 'All Documents', count: documents.length },
    { id: 'Approval Documents', label: 'Approval Clearances', count: documents.filter(d => d.category === 'Approval Documents').length },
    { id: 'Compliance Documents', label: 'Compliance Filings', count: documents.filter(d => d.category === 'Compliance Documents').length },
    { id: 'Company Documents', label: 'Corporate KYC', count: documents.filter(d => d.category === 'Company Documents').length },
    { id: 'MISSING', label: 'Action Required / Missing', count: documents.filter(d => d.status === 'MISSING').length }
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.relatedApproval.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.fileName && doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeFilter === 'ALL') return matchesSearch;
    if (activeFilter === 'MISSING') return matchesSearch && doc.status === 'MISSING';
    return matchesSearch && doc.category === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 md:p-8 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-[#245C3A] uppercase tracking-wider bg-[#EBF8E5] px-2.5 py-0.5 rounded border border-[#D5EED0]">
              Central Document Vault
            </span>
            <span className="text-xs text-[#839187]">
              Context-Aware Statutory Repository
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
            Industrial Document Center
          </h1>
          <p className="text-sm text-[#58655C] mt-1.5 max-w-2xl leading-relaxed">
            All blueprints, land titles, CA certificates, and OEM test logs mapped directly to regulatory approvals with versioning and expiry tracking.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            icon={Upload}
            onClick={() => {
              const missing = documents.find(d => d.status === 'MISSING') || documents[0];
              setSelectedUploadDoc(missing);
            }}
          >
            Upload Document
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-4 shadow-2xs space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#839187] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by title, related statutory approval, or file name..."
            className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-[#18201B] focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E3E8E2]">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#245C3A] text-white shadow-2xs'
                  : 'bg-[#F1F4EE] text-[#58655C] hover:bg-[#E8EDE5]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === tab.id ? 'bg-[#7ED957] text-[#173B25]' : 'bg-white text-[#58655C]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFBF9] border-b border-[#E3E8E2] text-[#58655C] font-semibold">
              <tr>
                <th className="p-4">Document Details</th>
                <th className="p-4">Related Approval Context</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4">Validity / Expiry</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E2]">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-sm text-[#839187]">
                    No documents found matching the filter.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#FAFBF9] transition-colors">
                    {/* Document Title & file name */}
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#F1F4EE] text-[#245C3A] flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-[#18201B] text-sm">{doc.name}</p>
                          {doc.fileName ? (
                            <p className="text-[11px] text-[#839187] font-mono mt-0.5">
                              {doc.fileName} · {doc.fileSize} · {doc.version}
                            </p>
                          ) : (
                            <p className="text-[11px] text-[#B02824] font-medium mt-0.5">
                              File missing — Required for Scrutiny clearance
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Related Approval */}
                    <td className="p-4 font-medium text-[#18201B]">
                      {doc.relatedApproval}
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <Badge variant="default" size="sm">
                        {doc.category}
                      </Badge>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <StatusBadge status={doc.status} />
                    </td>

                    {/* Expiry */}
                    <td className="p-4 text-[#58655C] font-medium">
                      {doc.expiryDate}
                    </td>

                    {/* Action */}
                    <td className="p-4 text-right">
                      {doc.status === 'MISSING' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Upload}
                          onClick={() => setSelectedUploadDoc(doc)}
                        >
                          Upload
                        </Button>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => showToast("Document Viewer", `Previewing ${doc.fileName || doc.name}`, "info")}
                            className="p-1.5 text-[#58655C] hover:text-[#245C3A] hover:bg-[#F1F4EE] rounded transition-colors"
                            title="View Document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedUploadDoc(doc)}
                            className="p-1.5 text-[#58655C] hover:text-[#245C3A] hover:bg-[#F1F4EE] rounded transition-colors"
                            title="Upload New Version"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {selectedUploadDoc && (
        <DocumentUploadModal
          isOpen={true}
          onClose={() => setSelectedUploadDoc(null)}
          targetDoc={selectedUploadDoc}
          targetApprovalContext={selectedUploadDoc.relatedApproval}
        />
      )}
    </div>
  );
}
