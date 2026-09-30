import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  FileText, 
  Files, 
  CheckSquare, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  TrendingUp,
  Layers,
  FileCheck,
  Send,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatusBadge } from '../components/ui/StatusBadge';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8F4] text-[#18201B]">
      {/* Public Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#D1D9D0] px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#245C3A] text-[#7ED957] flex items-center justify-center font-bold text-lg shadow-xs">
              I
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[#18201B] tracking-tight text-base">INDUSTRIA</span>
                <span className="text-[10px] bg-[#EBF8E5] text-[#245C3A] font-semibold px-1.5 py-0.5 rounded border border-[#D5EED0]">
                  Maharashtra
                </span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#58655C]">
            <a href="#problem" className="hover:text-[#18201B] transition-colors">The Problem</a>
            <a href="#lifecycle" className="hover:text-[#18201B] transition-colors">Lifecycle Track</a>
            <a href="#features" className="hover:text-[#18201B] transition-colors">Features</a>
            <a href="#schemes" className="hover:text-[#18201B] transition-colors">Incentives</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              Open Workspace
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/discovery')}
            >
              Build My Roadmap
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:px-8 max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#18201B] leading-[1.15]">
          One workspace for every stage of your industrial journey.
        </h1>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Button
            variant="primary"
            size="lg"
            icon={Compass}
            onClick={() => navigate('/discovery')}
            className="shadow-sm"
          >
            Build My Approval Roadmap
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/dashboard')}
          >
            Explore Platform Demo
          </Button>
        </div>

        {/* Trust strip */}
        <div className="pt-8 border-t border-[#E3E8E2] text-xs text-[#839187] font-semibold tracking-wider uppercase flex flex-wrap items-center justify-center gap-6">
          <span>Approvals</span>
          <span>·</span>
          <span>Applications</span>
          <span>·</span>
          <span>Documents</span>
          <span>·</span>
          <span>Compliance</span>
          <span>·</span>
          <span>Support Subsidies</span>
        </div>
      </section>

      {/* Interactive Lifecycle Showcase */}
      <section id="lifecycle" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-white border border-[#D1D9D0] rounded-2xl p-6 md:p-10 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#245C3A] uppercase tracking-wider bg-[#EBF8E5] px-2.5 py-0.5 rounded border border-[#D5EED0]">
              The Full Industrial Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
              From Pre-Establishment to Post-Approval Growth
            </h2>
            <p className="text-xs sm:text-sm text-[#58655C]">
              INDUSTRIA bridges fragmented government portals into a continuous linear route.
            </p>
          </div>

          {/* Linear Visual Track */}
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3 pt-4">
            {[
              { step: '01', title: 'Discover', desc: 'Identify statutory approvals based on plant parameters', icon: Compass, link: '/discovery' },
              { step: '02', title: 'Prepare', desc: 'Assemble blueprint drawings and verified CA filings', icon: FileCheck, link: '/documents' },
              { step: '03', title: 'Apply', desc: 'Single-window submission to state departments', icon: Send, link: '/applications' },
              { step: '04', title: 'Review', desc: 'Real-time scrutiny and field inspection tracking', icon: Eye, link: '/applications' },
              { step: '05', title: 'Approve', desc: 'Statutory certificate and consent issuance', icon: ShieldCheck, link: '/applications' },
              { step: '06', title: 'Comply', desc: 'Periodic renewals and annual environmental returns', icon: RefreshCw, link: '/compliance' },
              { step: '07', title: 'Grow', desc: 'MSME capital subsidies and power tariff rebates', icon: TrendingUp, link: '/support' }
            ].map((node) => (
                <div
                  key={node.step}
                  onClick={() => navigate(node.link)}
                  className="p-4 rounded-xl border border-[#E3E8E2] hover:border-[#245C3A] bg-[#FAFBF9] hover:bg-white transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-2">
                      <span className="text-[10px] font-bold text-[#839187] group-hover:text-[#245C3A] transition-colors uppercase tracking-wider">
                        STAGE {node.step}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#18201B]">{node.title}</h3>
                    <p className="text-[11px] text-[#58655C] mt-1 leading-snug">{node.desc}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#E3E8E2] text-[10px] font-bold text-[#245C3A] flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-14 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#B02824] uppercase tracking-wider bg-[#FDE8E8] px-2.5 py-0.5 rounded border border-[#F9C3C3]">
            The Challenge
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
            Industrial processes shouldn't feel fragmented.
          </h2>
          <p className="text-sm text-[#58655C]">
            Enterprise founders and factory managers face major friction across disjointed departmental systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { title: 'Unclear Requirements', desc: 'Ambiguity on whether Factory License, MPCB CTO or Boiler clearance applies.' },
            { title: 'Scattered Documents', desc: 'Critical blueprints and test certificates lost across local folders and emails.' },
            { title: 'Difficult Tracking', desc: 'No unified SLA visibility across Labour, Fire, Pollution, and Energy desks.' },
            { title: 'Missed Deadlines', desc: 'Overlooked Form 4 returns and annual safety audits lead to statutory penalties.' },
            { title: 'Hard-to-Find Subsidies', desc: 'Lucrative capital grants and power rebates go unclaimed due to lack of awareness.' }
          ].map((pain, idx) => (
            <div key={idx} className="bg-white border border-[#D1D9D0] rounded-xl p-4 shadow-2xs space-y-2">
              <div className="w-6 h-6 rounded-md bg-[#FDE8E8] text-[#B02824] flex items-center justify-center font-bold text-xs">
                ✕
              </div>
              <h4 className="text-xs font-bold text-[#18201B]">{pain.title}</h4>
              <p className="text-[11px] text-[#58655C] leading-relaxed">{pain.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Demo Company Showcase Section */}
      <section id="features" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-white border border-[#D1D9D0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E3E8E2]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="brand" size="sm">Coherent Demo Company</Badge>
                <span className="text-xs text-[#839187]">MIDC Chakan · Pune</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#18201B]">
                Aarohan Precision Components Pvt. Ltd.
              </h3>
              <p className="text-xs text-[#58655C] mt-0.5">
                Precision Automotive Components & Tooling · 128 Employees · ₹18.00 Cr Capital Investment · 450 kVA Load
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/dashboard')}
            >
              Launch Interactive Workspace
            </Button>
          </div>

          {/* Feature Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl border border-[#E3E8E2] bg-[#FAFBF9] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#EBF8E5] text-[#245C3A] flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#18201B]">Approval Discovery Engine</h4>
              <p className="text-xs text-[#58655C] leading-relaxed">
                Deterministic statutory engine maps workforce size, capital threshold, and environmental hazard to identify mandatory clearances with full rationale.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#E3E8E2] bg-[#FAFBF9] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#FEF6E7] text-[#9A6200] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#18201B]">Contextual Document Vault</h4>
              <p className="text-xs text-[#58655C] leading-relaxed">
                Files are strictly bound to regulatory applications. Uploading a missing blueprint instantly flips status and advances the scrutiny desk.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#E3E8E2] bg-[#FAFBF9] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#FDF0F5] text-[#C03B6B] flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#18201B]">Support & Subsidies Matcher</h4>
              <p className="text-xs text-[#58655C] leading-relaxed">
                Automatic alignment with Maharashtra Package Scheme of Incentives (PSI 2019) and power rebates yielding up to ₹2.50 Cr in eligible grants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#245C3A] to-[#173B25] text-white rounded-2xl p-8 md:p-12 shadow-md space-y-5">
          <span className="text-xs font-bold text-[#7ED957] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20">
            SIH26130 · Government of Maharashtra
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Start with your business profile.
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            From knowing what approvals you need to staying compliant after approval — INDUSTRIA puts the entire industrial journey into one workspace.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              icon={Compass}
              onClick={() => navigate('/discovery')}
              className="bg-[#7ED957] text-[#173B25]"
            >
              Build My Approval Roadmap
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              Enter Dashboard Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="border-t border-[#E3E8E2] bg-white py-8 px-4 md:px-8 text-xs text-[#839187]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#18201B]">INDUSTRIA</span>
            <span>— Smart India Hackathon (SIH26130)</span>
          </div>
          <p>Developed for Government of Maharashtra Industrial Single Window Ecosystem.</p>
        </div>
      </footer>
    </div>
  );
}
