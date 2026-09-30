import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Zap, 
  Users, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  Save, 
  Building,
  ShieldCheck,
  Phone,
  Mail,
  RotateCcw,
  Check,
  Flame,
  Sparkles,
  Droplets
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function BusinessProfile() {
  const { company, updateCompanyProfile, showToast, resetDemoState } = useApp();
  const [profileForm, setProfileForm] = useState({ ...company });
  const [isSaved, setIsSaved] = useState(true);

  // Sync if company updates in context
  useEffect(() => {
    setProfileForm({ ...company });
    setIsSaved(true);
  }, [company]);

  const handleChange = (field, value) => {
    setProfileForm(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    updateCompanyProfile(profileForm);
    setIsSaved(true);
    showToast(
      "Profile Saved Successfully",
      "Company parameters updated and synced across all approval & compliance engines.",
      "success"
    );
  };

  const handleReset = () => {
    setProfileForm({ ...company });
    setIsSaved(true);
  };

  const DISTRICT_OPTIONS = [
    'Pune',
    'Thane',
    'Chhatrapati Sambhajinagar',
    'Nashik',
    'Nagpur',
    'Kolhapur',
    'Solapur',
    'Raigad',
    'Palghar'
  ];

  const INDUSTRY_OPTIONS = [
    'Manufacturing',
    'Food Processing',
    'Chemicals',
    'Textiles',
    'Electronics',
    'IT / Services',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 md:p-8 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-[#245C3A] uppercase tracking-wider bg-[#EBF8E5] px-2.5 py-0.5 rounded border border-[#D5EED0]">
              Corporate Enterprise Record
            </span>
            <Badge variant="brand" size="sm" icon={CheckCircle2}>
              Directly Editable
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
            {profileForm.legalName || company.legalName}
          </h1>

          <p className="text-sm text-[#58655C] mt-1.5 max-w-2xl leading-relaxed">
            Modify any statutory identifiers, workforce thresholds, or factory power parameters below. Changes update your approval roadmap and state subsidy matches.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isSaved && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 text-xs text-[#58655C] hover:text-[#18201B] font-semibold border border-[#D1D9D0] rounded-lg hover:bg-[#F1F4EE] transition-colors"
            >
              Discard
            </button>
          )}

          <Button
            variant="primary"
            size="md"
            icon={Save}
            onClick={handleSave}
            className={!isSaved ? "ring-4 ring-[#7ED957]/30 shadow-md animate-pulse" : ""}
          >
            {isSaved ? "Save Profile Changes" : "Save Changes *"}
          </Button>
        </div>
      </div>

      {/* Main Profile Form (Directly Interactive) */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Enterprise Specifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statutory Identifiers */}
          <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E2]">
              <h3 className="text-base font-bold text-[#18201B] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#245C3A]" />
                Corporate Identification & Statutory Registration
              </h3>
              <span className="text-xs text-[#839187] font-medium">Click to edit directly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Legal Name */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-[#18201B] flex items-center justify-between">
                  <span>Registered Company Legal Name *</span>
                  <span className="text-[10px] text-[#839187] font-normal">MCA Certificate</span>
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.legalName || ''}
                  onChange={(e) => handleChange('legalName', e.target.value)}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-bold text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                  placeholder="e.g. Aarohan Precision Components Pvt. Ltd."
                />
              </div>

              {/* Trade Name */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B]">Brand / Trade Name</label>
                <input
                  type="text"
                  value={profileForm.tradeName || ''}
                  onChange={(e) => handleChange('tradeName', e.target.value)}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-medium text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                  placeholder="e.g. Aarohan Precision"
                />
              </div>

              {/* Corporate CIN */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B]">Corporate CIN (21 digits)</label>
                <input
                  type="text"
                  value={profileForm.cin || ''}
                  onChange={(e) => handleChange('cin', e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-mono font-bold uppercase text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                  placeholder="U29253PN2021PTC198421"
                />
              </div>

              {/* Company PAN */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B]">Company PAN Card</label>
                <input
                  type="text"
                  value={profileForm.pan || ''}
                  onChange={(e) => handleChange('pan', e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-mono font-bold uppercase text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                  placeholder="AABCA8923K"
                />
              </div>

              {/* Maharashtra GSTIN */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B]">Maharashtra GSTIN</label>
                <input
                  type="text"
                  value={profileForm.gstin || ''}
                  onChange={(e) => handleChange('gstin', e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-mono font-bold uppercase text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                  placeholder="27AABCA8923K1ZM"
                />
              </div>

              {/* Udyam MSME */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-[#18201B] flex items-center justify-between">
                  <span>Udyam MSME Registration Number</span>
                  <span className="text-[10px] text-[#245C3A] font-semibold">MSME Portal</span>
                </label>
                <input
                  type="text"
                  value={profileForm.udyam || ''}
                  onChange={(e) => handleChange('udyam', e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-mono font-bold uppercase text-[#245C3A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                  placeholder="UDYAM-MH-26-0048192"
                />
              </div>
            </div>
          </div>

          {/* Plant & Footprint Parameters */}
          <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E2]">
              <h3 className="text-base font-bold text-[#18201B] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#245C3A]" />
                Plant Footprint & Operational Characteristics
              </h3>
              <span className="text-xs text-[#839187] font-medium">Statutory Triggers</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Primary Industry */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B]">Primary Sector / Industry</label>
                <select
                  value={profileForm.industry || 'Manufacturing'}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-bold text-[#245C3A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                >
                  {INDUSTRY_OPTIONS.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {/* Sub-industry */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B]">Sub-Sector / NIC Activity</label>
                <input
                  type="text"
                  value={profileForm.subIndustry || ''}
                  onChange={(e) => handleChange('subIndustry', e.target.value)}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-medium text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                  placeholder="Precision Automotive Components & CNC Tooling"
                />
              </div>

              {/* Workforce */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B] flex items-center justify-between">
                  <span>Direct Workforce (Workers) *</span>
                  <span className="text-[10px] text-[#839187]">&gt;=10 triggers Factory Lic</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={profileForm.employeeCount || 0}
                  onChange={(e) => handleChange('employeeCount', parseInt(e.target.value) || 0)}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-bold text-[#245C3A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                />
              </div>

              {/* Fixed Capital Investment */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B] flex items-center justify-between">
                  <span>Fixed Capital Investment (₹ in Cr) *</span>
                  <span className="text-[10px] text-[#839187]">Plant & Machinery</span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={profileForm.investment || 0}
                  onChange={(e) => handleChange('investment', parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-bold text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                />
              </div>

              {/* Sanctioned Load */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B]">Sanctioned Power Load (HT/LT)</label>
                <input
                  type="text"
                  value={profileForm.electricityLoad || ''}
                  onChange={(e) => handleChange('electricityLoad', e.target.value)}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-medium text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                  placeholder="e.g. 450 kVA (HT 11 kV)"
                />
              </div>

              {/* Factory Area */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B]">Factory Built-up Area</label>
                <input
                  type="text"
                  value={profileForm.factoryArea || ''}
                  onChange={(e) => handleChange('factoryArea', e.target.value)}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-medium text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                  placeholder="e.g. 45,000 sq. ft."
                />
              </div>

              {/* District */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B]">District (Maharashtra)</label>
                <select
                  value={profileForm.district || 'Pune'}
                  onChange={(e) => handleChange('district', e.target.value)}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-semibold text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                >
                  {DISTRICT_OPTIONS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Water Usage */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#18201B]">Water Usage & Discharge</label>
                <input
                  type="text"
                  value={profileForm.waterUsage || ''}
                  onChange={(e) => handleChange('waterUsage', e.target.value)}
                  className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-medium text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                  placeholder="12,000 Litres/day (Recycled)"
                />
              </div>
            </div>

            {/* Address */}
            <div className="pt-2">
              <label className="font-bold text-xs text-[#18201B] block mb-1">MIDC Factory Registered Site Address</label>
              <textarea
                rows={2}
                value={profileForm.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full p-2.5 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-medium text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                placeholder="Plot No. B-42, MIDC Phase II, Chakan Industrial Area, Pune, Maharashtra 410501"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col: Key Personnel & Environmental Classification */}
        <div className="space-y-6">
          {/* Authorized Signatory */}
          <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#18201B] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#245C3A]" />
              Authorized Signatory & Contact
            </h3>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="font-bold text-xs text-[#18201B]">Authorized Signatory Name</label>
                <input
                  type="text"
                  value={profileForm.authorizedSignatory || ''}
                  onChange={(e) => handleChange('authorizedSignatory', e.target.value)}
                  className="w-full p-2 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-bold text-[#18201B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                  placeholder="Vikramaditya Patil (Managing Director)"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-xs text-[#18201B]">Contact Work Email</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#839187] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={profileForm.contactEmail || ''}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    className="w-full pl-9 pr-2 py-2 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                    placeholder="admin@aarohan.demo"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-xs text-[#18201B]">Contact Phone Number</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#839187] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={profileForm.contactPhone || ''}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                    className="w-full pl-9 pr-2 py-2 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
                    placeholder="+91 98230 44821"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#EBF8E5] border border-[#D5EED0] rounded-lg text-xs text-[#245C3A] space-y-1">
              <span className="font-bold">Digital Signature Certificate (DSC):</span>
              <p className="text-[11px]">Class 3 Org DSC Linked (Valid till 14 Dec 2027)</p>
            </div>
          </div>

          {/* Environmental Hazard */}
          <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-[#18201B] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#C03B6B]" />
              Environmental Hazard Classification
            </h3>

            <div className="space-y-1.5">
              <label className="font-bold text-xs text-[#18201B]">Chemical & Hazard Level</label>
              <select
                value={profileForm.hazardousMaterial || 'Minimal (Category B - Coolants/Oils)'}
                onChange={(e) => handleChange('hazardousMaterial', e.target.value)}
                className="w-full p-2 bg-[#FAFBF9] border border-[#D1D9D0] rounded-lg text-xs font-semibold text-[#9A6200] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7ED957] transition-all"
              >
                <option value="None">None (Pure Green Category)</option>
                <option value="Minimal (Category B - Coolants/Oils)">Minimal (Category B - CNC Coolants/Cutting Fluids)</option>
                <option value="High (Category A - Solvents/Chemicals)">High (Category A - Toxic Solvents/Heavy Chemical)</option>
              </select>
            </div>

            <div className="p-3 bg-[#FFFDF9] border border-[#FCE4B6] rounded-lg text-xs text-[#9A6200] space-y-1">
              <span className="font-bold">MPCB Category: ORANGE</span>
              <p className="text-[11px] text-[#58655C]">
                Precision machining with cutting coolant handling requires MPCB CTO & Hazardous Form 4 filings.
              </p>
            </div>
          </div>

          {/* Save Action Card */}
          <div className="p-5 bg-white border border-[#D1D9D0] rounded-xl space-y-3 shadow-2xs">
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
              className="w-full"
            >
              Save Profile Changes
            </Button>

            <button
              type="button"
              onClick={resetDemoState}
              className="w-full py-2 text-xs text-[#58655C] hover:text-[#18201B] font-semibold flex items-center justify-center gap-1.5 border border-[#E3E8E2] rounded-lg hover:bg-[#F1F4EE] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#839187]" />
              <span>Reset to Default Aarohan Data</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
