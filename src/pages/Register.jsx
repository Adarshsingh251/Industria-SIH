import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Zap, 
  DollarSign, 
  Users,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function Register() {
  const { registerNewUserAndCompany, showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: User info, 2: Company info

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'business_admin',
    roleLabel: 'Enterprise Managing Director',
    designation: 'Managing Director'
  });

  const [companyForm, setCompanyForm] = useState({
    legalName: '',
    tradeName: '',
    cin: '',
    pan: '',
    gstin: '',
    udyam: '',
    industry: 'Manufacturing',
    subIndustry: 'Precision Engineering & Component Assembly',
    district: 'Pune',
    address: '',
    investment: '15.0',
    employeeCount: '95',
    electricityLoad: '350 kVA',
    waterUsage: 'Moderate (Coolant recycling)',
    hazardousMaterial: 'Minimal (Category B - Coolants/Oils)',
    constructionRequired: true
  });

  // 1-Click Quick Demo Template
  const handleAutoFillDemo = () => {
    setUserForm({
      name: 'Adarsh Singh',
      email: 'adarsh.singh@industria.demo',
      phone: '+91 98765 43210',
      password: 'password123',
      role: 'business_admin',
      roleLabel: 'Enterprise Managing Director',
      designation: 'Managing Director'
    });

    setCompanyForm({
      legalName: 'Maharashtra Advanced Tooling & Robotics Pvt. Ltd.',
      tradeName: 'MATR Robotics',
      cin: 'U29304PN2026PTC219482',
      pan: 'AABCM9102K',
      gstin: '27AABCM9102K1ZV',
      udyam: 'UDYAM-MH-26-0091823',
      industry: 'Electronics',
      subIndustry: 'Industrial Automation & Robotics Assembly',
      district: 'Pune',
      address: 'Plot No. C-18, MIDC Talegaon Industrial Park, Pune, Maharashtra 410507',
      investment: '22.5',
      employeeCount: '140',
      electricityLoad: '500 kVA',
      waterUsage: 'Minimal (Closed Loop)',
      hazardousMaterial: 'Minimal (Category B - Coolants/Oils)',
      constructionRequired: true
    });

    showToast("Template Populated", "Sample enterprise data filled. Click Create Workspace to launch.", "info");
  };

  const handleCompleteRegistration = (e) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email || !companyForm.legalName) {
      showToast("Missing Fields", "Please provide required name, email and company details.", "danger");
      return;
    }

    registerNewUserAndCompany(userForm, companyForm);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7F8F4] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#245C3A] text-[#7ED957] flex items-center justify-center font-bold text-xl shadow-xs">
            I
          </div>
          <span className="font-extrabold text-[#18201B] tracking-tight text-xl">INDUSTRIA</span>
        </Link>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
          Create Your Enterprise Workspace
        </h2>

        <p className="text-xs sm:text-sm text-[#58655C]">
          Onboard your manufacturing facility to generate automated approval roadmaps, statutory vaults, and subsidy discovery.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white border border-[#D1D9D0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Quick Demo Template Button */}
          <div className="p-3.5 bg-[#FAFBF9] border border-[#D5EED0] rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-[#245C3A]">
              <Sparkles className="w-4 h-4 text-[#7ED957] shrink-0" />
              <span><b>Hackathon Demo Quick Fill:</b> Auto-populate with sample enterprise data in 1 click.</span>
            </div>
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="px-3 py-1.5 bg-[#EBF8E5] hover:bg-[#D5EED0] text-[#245C3A] text-xs font-bold rounded-lg border border-[#D5EED0] transition-colors shrink-0"
            >
              Auto-Fill Template
            </button>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#E3E8E2]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                step === 1
                  ? 'bg-[#245C3A] text-white shadow-2xs'
                  : 'bg-[#F1F4EE] text-[#58655C] hover:bg-[#E8EDE5]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === 1 ? 'bg-[#7ED957] text-[#173B25]' : 'bg-white text-[#58655C]'
              }`}>
                1
              </span>
              <span>1. Authorized User Account</span>
            </button>

            <button
              type="button"
              onClick={() => setStep(2)}
              className={`p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                step === 2
                  ? 'bg-[#245C3A] text-white shadow-2xs'
                  : 'bg-[#F1F4EE] text-[#58655C] hover:bg-[#E8EDE5]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === 2 ? 'bg-[#7ED957] text-[#173B25]' : 'bg-white text-[#58655C]'
              }`}>
                2
              </span>
              <span>2. Enterprise & Plant Setup</span>
            </button>
          </div>

          {/* STEP 1: USER ACCOUNT */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-sm font-bold text-[#18201B]">
                Step 1: Authorized Signatory / Enterprise Admin Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-[#18201B]">Full Name of Signatory / Admin *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#839187] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Patil"
                      value={userForm.name}
                      onChange={(e) => setUserForm(u => ({ ...u, name: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#D1D9D0] rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#18201B]">Official Work Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#839187] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="admin@enterprise.demo"
                      value={userForm.email}
                      onChange={(e) => setUserForm(u => ({ ...u, email: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#D1D9D0] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#18201B]">Contact Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#839187] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+91 98230 44821"
                      value={userForm.phone}
                      onChange={(e) => setUserForm(u => ({ ...u, phone: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#D1D9D0] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#18201B]">Designation / Role in Company</label>
                  <input
                    type="text"
                    placeholder="Managing Director / Operations Head"
                    value={userForm.designation}
                    onChange={(e) => setUserForm(u => ({ ...u, designation: e.target.value }))}
                    className="w-full p-2 bg-white border border-[#D1D9D0] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#18201B]">Workspace Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#839187] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={userForm.password}
                      onChange={(e) => setUserForm(u => ({ ...u, password: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#D1D9D0] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#E3E8E2]">
                <Button
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => setStep(2)}
                >
                  Continue to Enterprise Setup (Step 2)
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: COMPANY & PLANT SETUP */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-sm font-bold text-[#18201B]">
                Step 2: Manufacturing Entity & Footprint Parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Legal Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-[#18201B]">Company Legal Name (MCA Registered) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Precision Systems Pvt. Ltd."
                    value={companyForm.legalName}
                    onChange={(e) => setCompanyForm(c => ({ ...c, legalName: e.target.value }))}
                    className="w-full p-2.5 bg-white border border-[#D1D9D0] rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  />
                </div>

                {/* Industry Sector */}
                <div className="space-y-1">
                  <label className="font-bold text-[#18201B]">Industry Sector</label>
                  <select
                    value={companyForm.industry}
                    onChange={(e) => setCompanyForm(c => ({ ...c, industry: e.target.value }))}
                    className="w-full p-2 bg-white border border-[#D1D9D0] rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  >
                    <option value="Manufacturing">Manufacturing & Engineering</option>
                    <option value="Food Processing">Food & Agro Processing</option>
                    <option value="Chemicals">Chemicals & Pharmaceuticals</option>
                    <option value="Textiles">Textiles & Garments</option>
                    <option value="Electronics">Electronics & Hardware</option>
                    <option value="IT / Services">IT / Industrial Services</option>
                  </select>
                </div>

                {/* District */}
                <div className="space-y-1">
                  <label className="font-bold text-[#18201B]">District (Maharashtra)</label>
                  <select
                    value={companyForm.district}
                    onChange={(e) => setCompanyForm(c => ({ ...c, district: e.target.value }))}
                    className="w-full p-2 bg-white border border-[#D1D9D0] rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  >
                    <option value="Pune">Pune (Chakan / Talegaon / Ranjangaon)</option>
                    <option value="Thane">Thane (Taloja / Wagle / Rabale)</option>
                    <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar (Waluj / Shendra)</option>
                    <option value="Nashik">Nashik (Ambad / Satpur)</option>
                    <option value="Nagpur">Nagpur (Butibori / MIHAN)</option>
                  </select>
                </div>

                {/* Direct Workforce */}
                <div className="space-y-1">
                  <label className="font-bold text-[#18201B]">Direct Workforce / Workers</label>
                  <input
                    type="number"
                    value={companyForm.employeeCount}
                    onChange={(e) => setCompanyForm(c => ({ ...c, employeeCount: e.target.value }))}
                    className="w-full p-2 bg-white border border-[#D1D9D0] rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  />
                  <p className="text-[10px] text-[#839187]">&gt;=10 triggers Factories Act License</p>
                </div>

                {/* Capital Investment */}
                <div className="space-y-1">
                  <label className="font-bold text-[#18201B]">Capital Investment (₹ in Cr)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={companyForm.investment}
                    onChange={(e) => setCompanyForm(c => ({ ...c, investment: e.target.value }))}
                    className="w-full p-2 bg-white border border-[#D1D9D0] rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  />
                  <p className="text-[10px] text-[#839187]">Used for PSI subsidy matching</p>
                </div>

                {/* Sanctioned Load */}
                <div className="space-y-1">
                  <label className="font-bold text-[#18201B]">Power Demand</label>
                  <input
                    type="text"
                    placeholder="e.g. 450 kVA"
                    value={companyForm.electricityLoad}
                    onChange={(e) => setCompanyForm(c => ({ ...c, electricityLoad: e.target.value }))}
                    className="w-full p-2 bg-white border border-[#D1D9D0] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-[#18201B]">MIDC Plot / Factory Address</label>
                  <input
                    type="text"
                    placeholder="Plot No., Industrial Area, MIDC..."
                    value={companyForm.address}
                    onChange={(e) => setCompanyForm(c => ({ ...c, address: e.target.value }))}
                    className="w-full p-2 bg-white border border-[#D1D9D0] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E3E8E2]">
                <Button
                  variant="secondary"
                  size="md"
                  icon={ArrowLeft}
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  icon={CheckCircle2}
                  onClick={handleCompleteRegistration}
                >
                  Create & Launch Workspace
                </Button>
              </div>
            </div>
          )}

          {/* Switch to login link */}
          <div className="text-center pt-3 border-t border-[#E3E8E2] text-xs text-[#58655C]">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#245C3A] hover:underline">
              Log in to existing workspace →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
