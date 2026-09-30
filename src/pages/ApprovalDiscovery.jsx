import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Building2, 
  MapPin, 
  Sliders, 
  FileText, 
  Check, 
  Download, 
  Share2, 
  ExternalLink,
  Shield,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { discoverApprovals, APPROVAL_CATALOG } from '../services/approvalEngine';
import { parseNaturalLanguageBusinessProfile } from '../services/aiService';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';

const INDUSTRY_OPTIONS = [
  { id: 'Manufacturing', label: 'Precision Manufacturing & Engineering', icon: '⚙️', desc: 'Automotive parts, CNC machining, metal fabrication, tooling' },
  { id: 'Food Processing', label: 'Food & Agro Processing', icon: '🌾', desc: 'Dairy, packaged foods, grain mills, beverage bottling' },
  { id: 'Chemicals', label: 'Chemicals & Pharmaceuticals', icon: '🧪', desc: 'Specialty chemicals, API pharma, paints, polymers' },
  { id: 'Textiles', label: 'Textiles & Garments', icon: '🧵', desc: 'Spinning, weaving, garment processing, industrial fabrics' },
  { id: 'Electronics', label: 'Electronics & Hardware', icon: '🔌', desc: 'PCB assembly, consumer appliances, semiconductors' },
  { id: 'IT / Services', label: 'IT & Industrial Services', icon: '💻', desc: 'Software development, testing labs, data centers' },
  { id: 'Other', label: 'Other Industrial Sectors', icon: '🏭', desc: 'Warehousing, logistics, packaging materials' }
];

const DISTRICT_OPTIONS = [
  { name: 'Pune', clusters: 'MIDC Chakan, Talegaon, Ranjangaon, Bhosari' },
  { name: 'Thane', clusters: 'Taloja, Dombivli, Wagle Estate, Rabale' },
  { name: 'Chhatrapati Sambhajinagar', clusters: 'Waluj, Shendra DMIC, Chikalthana' },
  { name: 'Nashik', clusters: 'Ambad, Satpur, Sinnar MIDC' },
  { name: 'Nagpur', clusters: 'Butibori, Hingna, MIHAN SEZ' },
  { name: 'Kolhapur', clusters: 'Shiroli, Gokul Shirgaon MIDC' }
];

export function ApprovalDiscovery() {
  const { company, updateCompanyProfile, showToast } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('wizard'); // 'wizard' | 'ai'
  const [currentStep, setCurrentStep] = useState(1);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState(
    "We are a precision manufacturing company in Maharashtra with 128 employees and ₹18 crore investment, setting up CNC machining in Chakan Pune with 450 kVA power and expanding factory shed."
  );
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);

  // Form State initialized with Aarohan demo values
  const [formData, setFormData] = useState({
    industry: company.industry || 'Manufacturing',
    subIndustry: company.subIndustry || 'Precision Automotive Components & CNC Tooling',
    district: company.district || 'Pune',
    industrialArea: 'MIDC Chakan Phase II',
    manufacturing: true,
    employeeCount: company.employeeCount || 128,
    investment: company.investment || 18.0,
    electricityLoad: company.electricityLoad || '450 kVA',
    waterUsage: 'Moderate',
    hazardousMaterial: company.hazardousMaterial || 'Minimal (Category B - Coolants/Oils)',
    constructionRequired: true,
    hasBoiler: false,
    hasPressureVessel: true
  });

  const [selectedApprovalModal, setSelectedApprovalModal] = useState(null);

  // Generate roadmap through deterministic rules engine
  const roadmapResults = useMemo(() => {
    return discoverApprovals(formData);
  }, [formData]);

  // Handle AI Parse
  const handleRunAiAssistant = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    try {
      const result = await parseNaturalLanguageBusinessProfile(aiPrompt);
      setAiAnalysisResult(result);
      // Auto populate form
      setFormData(prev => ({
        ...prev,
        ...result.parsedProfile
      }));
      showToast("AI Profile Analysis Complete", "Entity parameters extracted and mapped to discovery form.", "info");
    } catch (err) {
      showToast("Analysis Error", "Failed to parse text prompt", "danger");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleApplyAiAndGenerate = () => {
    setCurrentStep(4);
    setActiveTab('wizard');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 md:p-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#245C3A] uppercase tracking-wider bg-[#EBF8E5] px-2.5 py-0.5 rounded border border-[#D5EED0]">
                Statutory Discovery Engine
              </span>
              <span className="text-xs text-[#839187]">
                Government of Maharashtra Industrial Single Window
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
              Industrial Approval Discovery & Roadmap
            </h1>
            <p className="text-sm text-[#58655C] mt-1.5 max-w-2xl leading-relaxed">
              Determine mandatory clearances, life-safety NOCs, pollution consents, and labor registrations applicable to your exact industrial footprint.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-[#F1F4EE] p-1 rounded-xl border border-[#E3E8E2] shrink-0">
            <button
              onClick={() => setActiveTab('wizard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'wizard'
                  ? 'bg-white text-[#18201B] shadow-2xs border border-[#D1D9D0]'
                  : 'text-[#58655C] hover:text-[#18201B]'
              }`}
            >
              Step-by-Step Wizard
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'ai'
                  ? 'bg-[#245C3A] text-white shadow-2xs'
                  : 'text-[#245C3A] hover:bg-[#EBF8E5]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7ED957]" />
              AI Natural Language Assistant
            </button>
          </div>
        </div>
      </div>

      {/* AI Assistant Mode View */}
      {activeTab === 'ai' && (
        <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs space-y-5 animate-in fade-in duration-150">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EBF8E5] text-[#245C3A] flex items-center justify-center shrink-0 border border-[#D5EED0]">
              <Sparkles className="w-4 h-4 text-[#245C3A]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#18201B]">AI Industrial Profile Extractor</h3>
              <p className="text-xs text-[#58655C]">
                Describe your enterprise in plain business English. Our assistant extracts industry sector, plant scale, workforce, and regulatory triggers to generate your statutory checklist.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#18201B]">
              Natural Language Business Description:
            </label>
            <textarea
              rows={3}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. We are setting up a precision CNC auto component manufacturing facility in Chakan Pune with 128 workers, ₹18 Cr capital investment, 450 kVA power load and light industrial coolant usage..."
              className="w-full p-3.5 text-sm bg-[#FAFBF9] border border-[#D1D9D0] rounded-xl text-[#18201B] focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#839187]">
              * AI acts as an extraction assistant. Statutory rules are evaluated deterministically.
            </span>
            <Button
              variant="primary"
              size="md"
              icon={Sparkles}
              loading={isAiLoading}
              onClick={handleRunAiAssistant}
            >
              Extract Business Parameters
            </Button>
          </div>

          {/* AI Extracted Parameters Preview */}
          {aiAnalysisResult && (
            <div className="mt-4 p-5 bg-[#FAFBF9] border border-[#D5EED0] rounded-xl space-y-4 animate-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#245C3A] uppercase tracking-wider">
                  Extracted Regulatory Parameters
                </span>
                <Badge variant="brand" size="sm">
                  Confidence: 96% Match
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {aiAnalysisResult.extractedEntities.map((ent, idx) => (
                  <div key={idx} className="p-2.5 bg-white border border-[#E3E8E2] rounded-lg">
                    <p className="text-[10px] text-[#839187] uppercase font-semibold">{ent.field}</p>
                    <p className="text-xs font-bold text-[#18201B] mt-0.5">{ent.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={handleApplyAiAndGenerate}
                >
                  Generate Approval Roadmap with Extracted Data
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step Wizard View */}
      {activeTab === 'wizard' && (
        <div className="space-y-6">
          {/* Step Stepper Header */}
          <div className="bg-white border border-[#D1D9D0] rounded-xl p-4 shadow-2xs">
            <div className="grid grid-cols-4 gap-2">
              {[
                { step: 1, label: 'Industry Type', icon: Building2 },
                { step: 2, label: 'Location & Cluster', icon: MapPin },
                { step: 3, label: 'Plant Parameters', icon: Sliders },
                { step: 4, label: 'Generated Roadmap', icon: FileText }
              ].map((s) => {
                const Icon = s.icon;
                const isCurrent = currentStep === s.step;
                const isDone = currentStep > s.step;

                return (
                  <button
                    key={s.step}
                    onClick={() => setCurrentStep(s.step)}
                    className={`flex items-center justify-center sm:justify-start gap-2 p-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-[#245C3A] text-white shadow-2xs'
                        : isDone
                        ? 'bg-[#EBF8E5] text-[#245C3A] hover:bg-[#D5EED0]'
                        : 'bg-[#F1F4EE] text-[#839187] hover:bg-[#E8EDE5]'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isCurrent ? 'bg-[#7ED957] text-[#173B25]' : isDone ? 'bg-[#245C3A] text-white' : 'bg-white text-[#839187]'
                    }`}>
                      {isDone ? '✓' : s.step}
                    </span>
                    <span className="hidden sm:inline truncate">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 1: Industry Type Selection */}
          {currentStep === 1 && (
            <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs space-y-5 animate-in fade-in duration-150">
              <div>
                <h3 className="text-base font-bold text-[#18201B]">Step 1: Select Primary Industry Activity</h3>
                <p className="text-xs text-[#58655C]">
                  Statutory applicability begins with your enterprise classification under the National Industrial Classification (NIC).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {INDUSTRY_OPTIONS.map((ind) => {
                  const isSelected = formData.industry === ind.id;
                  return (
                    <div
                      key={ind.id}
                      onClick={() => setFormData(prev => ({ ...prev, industry: ind.id }))}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#245C3A] bg-[#FAFBF9] shadow-xs ring-2 ring-[#EBF8E5]'
                          : 'border-[#E3E8E2] hover:border-[#D1D9D0] bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{ind.icon}</span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#245C3A] text-white flex items-center justify-center text-[11px]">
                              ✓
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-[#18201B]">{ind.label}</h4>
                        <p className="text-xs text-[#58655C] mt-1 leading-relaxed">{ind.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4 border-t border-[#E3E8E2]">
                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => setCurrentStep(2)}
                >
                  Continue to Location (Step 2)
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Location Selection */}
          {currentStep === 2 && (
            <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs space-y-5 animate-in fade-in duration-150">
              <div>
                <h3 className="text-base font-bold text-[#18201B]">Step 2: Location & Industrial Zone</h3>
                <p className="text-xs text-[#58655C]">
                  Zoning regulations, municipal jurisdictions, and MIDC regional fire/MPCB divisions differ by district.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {DISTRICT_OPTIONS.map((dist) => {
                  const isSelected = formData.district === dist.name;
                  return (
                    <div
                      key={dist.name}
                      onClick={() => setFormData(prev => ({ ...prev, district: dist.name }))}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? 'border-[#245C3A] bg-[#FAFBF9] shadow-xs ring-2 ring-[#EBF8E5]'
                          : 'border-[#E3E8E2] hover:border-[#D1D9D0] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#245C3A] uppercase tracking-wider">
                          Maharashtra
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#245C3A] text-white flex items-center justify-center text-[11px]">
                            ✓
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-[#18201B]">{dist.name} District</h4>
                      <p className="text-xs text-[#58655C] mt-1">{dist.clusters}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E3E8E2]">
                <Button
                  variant="secondary"
                  size="md"
                  icon={ArrowLeft}
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => setCurrentStep(3)}
                >
                  Continue to Plant Parameters (Step 3)
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Business Characteristics */}
          {currentStep === 3 && (
            <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-base font-bold text-[#18201B]">Step 3: Industrial Footprint & Environmental Parameters</h3>
                <p className="text-xs text-[#58655C]">
                  Configure employee thresholds, capital investment, power connection, and hazard classification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Employee Count */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18201B]">
                    Total Direct Workforce / Employees:
                  </label>
                  <input
                    type="number"
                    value={formData.employeeCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, employeeCount: parseInt(e.target.value) || 0 }))}
                    className="w-full p-2.5 text-sm bg-white border border-[#D1D9D0] rounded-lg text-[#18201B] focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  />
                  <p className="text-[11px] text-[#839187]">
                    &gt;= 10 workers triggers mandatory Factory License under The Factories Act, 1948.
                  </p>
                </div>

                {/* Capital Investment */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18201B]">
                    Fixed Capital Investment (Plant & Machinery in ₹ Cr):
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.investment}
                    onChange={(e) => setFormData(prev => ({ ...prev, investment: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-2.5 text-sm bg-white border border-[#D1D9D0] rounded-lg text-[#18201B] focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  />
                  <p className="text-[11px] text-[#839187]">
                    Determines MSME category & MPCB statutory fee slabs.
                  </p>
                </div>

                {/* Power Demand */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18201B]">
                    Sanctioned Power Load / Contract Demand:
                  </label>
                  <select
                    value={formData.electricityLoad}
                    onChange={(e) => setFormData(prev => ({ ...prev, electricityLoad: e.target.value }))}
                    className="w-full p-2.5 text-sm bg-white border border-[#D1D9D0] rounded-lg text-[#18201B] focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  >
                    <option value="65 kW (LT Commercial)">LT Commercial (&lt; 100 kW)</option>
                    <option value="200 kVA (HT Industrial)">200 kVA (HT 11 kV)</option>
                    <option value="450 kVA">450 kVA (High Tension Sanction)</option>
                    <option value="1000 kVA (Heavy HT)">1,000+ kVA (Heavy HT Industrial)</option>
                  </select>
                </div>

                {/* Hazardous Materials */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18201B]">
                    Hazardous Material & Industrial Coolants:
                  </label>
                  <select
                    value={formData.hazardousMaterial}
                    onChange={(e) => setFormData(prev => ({ ...prev, hazardousMaterial: e.target.value }))}
                    className="w-full p-2.5 text-sm bg-white border border-[#D1D9D0] rounded-lg text-[#18201B] focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  >
                    <option value="None">None (Pure Green Assembly)</option>
                    <option value="Minimal (Category B - Coolants/Oils)">Minimal (Category B - CNC Coolants & Cutting Oils)</option>
                    <option value="High (Category A - Toxic Solvents)">High (Category A - Heavy Chemicals / Flammable Solvents)</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-3 p-3.5 bg-[#FAFBF9] border border-[#E3E8E2] rounded-xl cursor-pointer hover:border-[#D1D9D0]">
                  <input
                    type="checkbox"
                    checked={formData.constructionRequired}
                    onChange={(e) => setFormData(prev => ({ ...prev, constructionRequired: e.target.checked }))}
                    className="w-4 h-4 text-[#245C3A] rounded focus:ring-[#7ED957]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#18201B] block">Factory Shed Construction / Structural Expansion</span>
                    <span className="text-[11px] text-[#839187]">Requires DISH Factory Layout & Municipal Plan Sanction</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 bg-[#FAFBF9] border border-[#E3E8E2] rounded-xl cursor-pointer hover:border-[#D1D9D0]">
                  <input
                    type="checkbox"
                    checked={formData.hasPressureVessel}
                    onChange={(e) => setFormData(prev => ({ ...prev, hasPressureVessel: e.target.checked }))}
                    className="w-4 h-4 text-[#245C3A] rounded focus:ring-[#7ED957]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#18201B] block">Compressed Air Receivers &gt; 7 bar or Boilers</span>
                    <span className="text-[11px] text-[#839187]">Requires Steam Boiler & Pressure Vessel Clearance</span>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E3E8E2]">
                <Button
                  variant="secondary"
                  size="md"
                  icon={ArrowLeft}
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  icon={Compass}
                  iconPosition="left"
                  onClick={() => setCurrentStep(4)}
                >
                  Generate Industrial Approval Roadmap
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Generated Roadmap Output */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Roadmap Header Summary Card */}
              <div className="bg-gradient-to-r from-[#245C3A] to-[#1B4B2E] text-white rounded-xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-[#7ED957] bg-white/10 px-2.5 py-0.5 rounded border border-white/20">
                        Roadmap Output
                      </span>
                      <span className="text-xs text-white/80">
                        Tailored for {company.legalName}
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold text-white tracking-tight">
                      Your Industrial Approval Roadmap
                    </h2>

                    <p className="text-xs text-white/80 mt-1 max-w-xl">
                      Based on {formData.industry} operations in {formData.district}, {formData.employeeCount} workers, and ₹{formData.investment} Cr capital investment.
                    </p>
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <div className="bg-white/10 border border-white/20 px-3.5 py-2 rounded-xl text-center">
                      <p className="text-xl font-extrabold text-[#7ED957]">{roadmapResults.required.length}</p>
                      <p className="text-[10px] text-white/80 uppercase font-semibold">Required</p>
                    </div>

                    <div className="bg-white/10 border border-white/20 px-3.5 py-2 rounded-xl text-center">
                      <p className="text-xl font-extrabold text-[#FCE4B6]">{roadmapResults.potentiallyRequired.length}</p>
                      <p className="text-[10px] text-white/80 uppercase font-semibold">Conditional</p>
                    </div>

                    <div className="bg-white/10 border border-white/20 px-3.5 py-2 rounded-xl text-center">
                      <p className="text-xl font-extrabold text-[#C4DFF5]">{roadmapResults.infoNeeded.length}</p>
                      <p className="text-[10px] text-white/80 uppercase font-semibold">Info Needed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 1: REQUIRED APPROVALS */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#245C3A]" />
                  <h3 className="text-base font-bold text-[#18201B]">
                    Mandatory Statutory Clearances ({roadmapResults.required.length})
                  </h3>
                  <span className="text-xs text-[#58655C]">
                    — Strongly associated with your declared manufacturing footprint
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roadmapResults.required.map((item) => (
                    <div
                      key={item.approval.id}
                      className="bg-white border border-[#D1D9D0] hover:border-[#245C3A] rounded-xl p-5 shadow-2xs transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold text-[#245C3A] bg-[#EBF8E5] px-2 py-0.5 rounded border border-[#D5EED0]">
                            {item.approval.department}
                          </span>
                          <StatusBadge status={item.category} />
                        </div>

                        <h4 className="text-base font-bold text-[#18201B] group-hover:text-[#245C3A] transition-colors">
                          {item.approval.name}
                        </h4>

                        <p className="text-xs text-[#58655C] mt-1 line-clamp-2">
                          {item.approval.description}
                        </p>

                        {/* Rationale Box */}
                        <div className="mt-3 p-3 bg-[#FAFBF9] border border-[#E3E8E2] rounded-lg">
                          <p className="text-[10px] font-bold text-[#245C3A] uppercase tracking-wider mb-0.5">
                            Applicability Trigger:
                          </p>
                          <p className="text-xs text-[#58655C] font-medium leading-relaxed">
                            {item.reason}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E3E8E2] flex items-center justify-between">
                        <span className="text-xs text-[#839187]">
                          Est: {item.approval.estimatedDuration}
                        </span>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedApprovalModal(item.approval)}
                          >
                            View Checklist
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            icon={ArrowRight}
                            iconPosition="right"
                            onClick={() => navigate('/applications')}
                          >
                            Track Application
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: POTENTIALLY REQUIRED */}
              {roadmapResults.potentiallyRequired.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#E3E8E2]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E69D00]" />
                    <h3 className="text-base font-bold text-[#18201B]">
                      Potentially Required Clearances ({roadmapResults.potentiallyRequired.length})
                    </h3>
                    <span className="text-xs text-[#58655C]">
                      — Dependent on specific machinery thresholds or operational expansion
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roadmapResults.potentiallyRequired.map((item) => (
                      <div
                        key={item.approval.id}
                        className="bg-white border border-[#E3E8E2] rounded-xl p-5 shadow-2xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[11px] font-bold text-[#58655C] bg-[#F1F4EE] px-2 py-0.5 rounded border border-[#E3E8E2]">
                              {item.approval.department}
                            </span>
                            <StatusBadge status={item.category} />
                          </div>

                          <h4 className="text-sm font-bold text-[#18201B]">
                            {item.approval.name}
                          </h4>

                          <p className="text-xs text-[#58655C] mt-1 line-clamp-2">
                            {item.approval.description}
                          </p>

                          <div className="mt-3 p-2.5 bg-[#FFFDF9] border border-[#FCE4B6] rounded-lg">
                            <p className="text-[10px] font-bold text-[#9A6200] uppercase tracking-wider mb-0.5">
                              Condition:
                            </p>
                            <p className="text-xs text-[#58655C]">
                              {item.reason}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#E3E8E2] flex items-center justify-between">
                          <span className="text-xs text-[#839187]">
                            Validity: {item.approval.validity}
                          </span>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedApprovalModal(item.approval)}
                          >
                            Inspect Criteria
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 3: INFORMATION NEEDED */}
              {roadmapResults.infoNeeded.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-[#E3E8E2]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1B65A4]" />
                    <h3 className="text-base font-bold text-[#18201B]">
                      Information Needed ({roadmapResults.infoNeeded.length})
                    </h3>
                    <span className="text-xs text-[#58655C]">
                      — Additional technical inputs required before legal determination
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roadmapResults.infoNeeded.map((item) => (
                      <div
                        key={item.approval.id}
                        className="bg-white border border-[#C4DFF5] bg-[#FAFDFE] rounded-xl p-5 shadow-2xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[11px] font-bold text-[#17568C] bg-[#EAF3FB] px-2 py-0.5 rounded border border-[#C4DFF5]">
                              {item.approval.department}
                            </span>
                            <StatusBadge status={item.category} />
                          </div>

                          <h4 className="text-sm font-bold text-[#18201B]">
                            {item.approval.name}
                          </h4>

                          <p className="text-xs text-[#58655C] mt-1">
                            {item.reason}
                          </p>

                          {item.questionPrompt && (
                            <div className="mt-3 p-3 bg-white border border-[#C4DFF5] rounded-lg">
                              <p className="text-[10px] font-bold text-[#17568C] uppercase tracking-wider mb-1">
                                Question to Clarify:
                              </p>
                              <p className="text-xs font-semibold text-[#18201B]">
                                {item.questionPrompt}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#E3E8E2] flex items-center justify-between">
                          <span className="text-xs text-[#839187]">
                            Central Ground Water Authority
                          </span>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedApprovalModal(item.approval)}
                          >
                            Review Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Bottom Bar */}
              <div className="p-5 bg-white border border-[#D1D9D0] rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={ArrowLeft}
                    onClick={() => setCurrentStep(3)}
                  >
                    Adjust Parameters
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Download}
                    onClick={() => showToast("Checklist Downloaded", "PDF checklist generated for Aarohan Precision Components.")}
                  >
                    Export Roadmap PDF
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => navigate('/applications')}
                  >
                    Proceed to Application Tracker
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Approval Template Detail Modal */}
      {selectedApprovalModal && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedApprovalModal(null)}
          title={selectedApprovalModal.name}
          subtitle={`${selectedApprovalModal.department} · ${selectedApprovalModal.category}`}
          maxWidth="max-w-2xl"
          footer={
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedApprovalModal(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={ExternalLink}
                onClick={() => {
                  setSelectedApprovalModal(null);
                  navigate('/applications');
                }}
              >
                Open in Applications
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-[#58655C] leading-relaxed">
              {selectedApprovalModal.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-[#FAFBF9] border border-[#E3E8E2] rounded-xl text-xs">
              <div>
                <p className="text-[10px] text-[#839187] uppercase font-bold">Clearance Time</p>
                <p className="font-bold text-[#18201B] mt-0.5">{selectedApprovalModal.estimatedDuration}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#839187] uppercase font-bold">Validity</p>
                <p className="font-bold text-[#18201B] mt-0.5">{selectedApprovalModal.validity}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#839187] uppercase font-bold">Statutory Slabs</p>
                <p className="font-bold text-[#18201B] mt-0.5">{selectedApprovalModal.feeRange}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#18201B] uppercase tracking-wider mb-2">
                Mandatory Supporting Documents
              </h4>
              <ul className="space-y-1.5">
                {selectedApprovalModal.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#58655C] p-2 bg-[#F1F4EE]/60 rounded-lg border border-[#E3E8E2]">
                    <Check className="w-3.5 h-3.5 text-[#245C3A] mt-0.5 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedApprovalModal.statutoryActs && (
              <div className="p-3 bg-[#EBF8E5] border border-[#D5EED0] rounded-lg text-xs text-[#245C3A]">
                <span className="font-bold">Governing Legislation: </span>
                {selectedApprovalModal.statutoryActs}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
