import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  Bookmark, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Building, 
  Check, 
  X,
  TrendingUp,
  Percent,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

export function GovernmentSupport() {
  const { schemes, toggleSaveScheme, showToast, company } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [onlySaved, setOnlySaved] = useState(false);
  const [selectedSchemeDrawer, setSelectedSchemeDrawer] = useState(null);

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = 
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.supportType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || scheme.category.includes(selectedCategory);
    const matchesSaved = !onlySaved || scheme.saved;

    return matchesSearch && matchesCategory && matchesSaved;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 md:p-8 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-[#C03B6B] uppercase tracking-wider bg-[#FDF0F5] px-2.5 py-0.5 rounded border border-[#F9D0E0]">
              Incentive Discovery Engine
            </span>
            <span className="text-xs text-[#839187]">
              Directorate of Industries & MoMSME Schemes
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
            Government Support & Subsidies
          </h1>
          <p className="text-sm text-[#58655C] mt-1.5 max-w-2xl leading-relaxed">
            Discover fiscal capital incentives, power tariff rebates, clean energy grants, and subsidized loans matched against your plant investment and headcount.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 bg-[#F4FBF1] p-3 rounded-xl border border-[#D5EED0]">
          <Award className="w-5 h-5 text-[#245C3A]" />
          <div>
            <p className="text-xs font-bold text-[#245C3A]">12 Matched Programs</p>
            <p className="text-[11px] text-[#58655C]">Up to ₹2.50 Cr eligible benefits</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#839187] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subsidies (e.g. PSI 2019, power rebate, solar grant, export certification)..."
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-[#18201B] focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-colors ${
                onlySaved
                  ? 'bg-[#FDF0F5] text-[#C03B6B] border-[#F9D0E0]'
                  : 'bg-white text-[#58655C] border-[#D1D9D0] hover:bg-[#F1F4EE]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Saved Schemes
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E3E8E2] text-xs">
          <span className="text-[#839187] font-semibold">Category:</span>
          {['ALL', 'Capital Subsidy', 'Operating Expense', 'Green Technology', 'Quality Standards', 'Credit'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#245C3A] text-white'
                  : 'bg-[#F1F4EE] text-[#58655C] hover:bg-[#E8EDE5]'
              }`}
            >
              {cat === 'ALL' ? 'All Incentive Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white border border-[#D1D9D0] hover:border-[#245C3A] rounded-xl p-6 shadow-2xs hover:shadow-xs transition-all duration-150 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-[#245C3A] bg-[#EBF8E5] px-2 py-0.5 rounded border border-[#D5EED0]">
                    {scheme.department}
                  </span>
                  <span className="text-[10px] font-bold text-[#C03B6B] bg-[#FDF0F5] px-2 py-0.5 rounded border border-[#F9D0E0]">
                    {scheme.matchScore}% Match
                  </span>
                </div>

                <button
                  onClick={() => toggleSaveScheme(scheme.id)}
                  title="Bookmark Scheme"
                  className={`p-1.5 rounded-lg border transition-colors ${
                    scheme.saved
                      ? 'bg-[#FDF0F5] text-[#C03B6B] border-[#F9D0E0]'
                      : 'bg-white text-[#839187] border-[#D1D9D0] hover:text-[#18201B]'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base font-bold text-[#18201B] group-hover:text-[#245C3A] transition-colors leading-snug">
                {scheme.title}
              </h3>

              <p className="text-xs text-[#58655C] mt-1.5">
                <span className="font-semibold text-[#18201B]">Support Type: </span>
                {scheme.supportType} · {scheme.investmentRange}
              </p>

              {/* Benefits list */}
              <div className="mt-4 p-3.5 bg-[#FAFBF9] border border-[#E3E8E2] rounded-xl space-y-2">
                <p className="text-[10px] font-bold text-[#245C3A] uppercase tracking-wider">
                  Key Incentive Highlights:
                </p>
                <ul className="space-y-1.5 text-xs text-[#58655C]">
                  {scheme.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#245C3A] font-bold mt-0.5">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-[#E3E8E2] flex items-center justify-between">
              <span className="text-xs text-[#839187]">
                Deadline: <b>{scheme.deadline}</b>
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => setSelectedSchemeDrawer(scheme)}
                >
                  View Eligibility & Apply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Detail Modal */}
      {selectedSchemeDrawer && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedSchemeDrawer(null)}
          title={selectedSchemeDrawer.title}
          subtitle={`${selectedSchemeDrawer.department} · ${selectedSchemeDrawer.category}`}
          maxWidth="max-w-2xl"
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setSelectedSchemeDrawer(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={ExternalLink}
                onClick={() => {
                  showToast("Portal Gateway", `Redirecting to official Maharashtra Maitri Single Window for ${selectedSchemeDrawer.title}`, "info");
                  setSelectedSchemeDrawer(null);
                }}
              >
                Apply on Maitri Portal
              </Button>
            </>
          }
        >
          <div className="space-y-5">
            {/* Match Banner */}
            <div className="p-4 bg-[#EBF8E5] border border-[#D5EED0] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#245C3A]" />
                <div>
                  <h4 className="text-xs font-bold text-[#245C3A] uppercase tracking-wider">
                    Profile Match Assessment: {selectedSchemeDrawer.matchScore}%
                  </h4>
                  <p className="text-xs text-[#18201B] mt-0.5">
                    {company.legalName} satisfies key investment and manufacturing criteria.
                  </p>
                </div>
              </div>
            </div>

            {/* Eligibility Checklist */}
            <div>
              <h4 className="text-xs font-bold text-[#18201B] uppercase tracking-wider mb-2">
                Eligibility Evaluation Checklist
              </h4>
              <div className="space-y-2">
                {selectedSchemeDrawer.eligibilityCriteria.map((crit, idx) => (
                  <div key={idx} className="p-2.5 bg-[#FAFBF9] border border-[#E3E8E2] rounded-lg text-xs flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#245C3A] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-[#18201B] font-medium">{crit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div>
              <h4 className="text-xs font-bold text-[#18201B] uppercase tracking-wider mb-2">
                Required Application Dossier
              </h4>
              <ul className="space-y-1.5">
                {selectedSchemeDrawer.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="text-xs text-[#58655C] flex items-center gap-2 p-2 bg-[#F1F4EE]/60 rounded border border-[#E3E8E2]">
                    <FileText className="w-3.5 h-3.5 text-[#245C3A]" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submission Mode */}
            <div className="p-3 bg-[#FAFBF9] border border-[#E3E8E2] rounded-lg text-xs flex items-center justify-between">
              <span className="text-[#839187]">Application Gateway:</span>
              <span className="font-bold text-[#18201B]">{selectedSchemeDrawer.applicationMode}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
