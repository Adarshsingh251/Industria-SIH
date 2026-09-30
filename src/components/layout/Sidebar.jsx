import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  FileText,
  Files,
  CheckSquare,
  Award,
  Building2,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';

export function Sidebar({ onCloseMobile }) {
  const { 
    applications, 
    complianceTasks, 
    schemes, 
    currentUserRole, 
    setCurrentUserRole,
    resetDemoState,
    company,
    currentUser
  } = useApp();
  const navigate = useNavigate();

  // Pending action counts
  const pendingActionsCount = applications.filter(a => a.status === 'DOCUMENTS_REQUIRED' || a.status === 'INSPECTION_SCHEDULED').length;
  const complianceDueCount = complianceTasks.filter(c => c.status !== 'COMPLETED').length;
  const eligibleSchemesCount = schemes.filter(s => s.isEligible).length;

  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/discovery',
      label: 'Approval Discovery',
      icon: Compass,
      badge: { text: 'Engine', variant: 'brand' }
    },
    {
      to: '/applications',
      label: 'Applications',
      icon: FileText,
      badge: pendingActionsCount > 0 ? { text: `${pendingActionsCount} Action`, variant: 'warning' } : null
    },
    {
      to: '/documents',
      label: 'Document Center',
      icon: Files,
      badge: null
    },
    {
      to: '/compliance',
      label: 'Compliance',
      icon: CheckSquare,
      badge: complianceDueCount > 0 ? { text: `${complianceDueCount}`, variant: 'accent' } : null
    },
    {
      to: '/support',
      label: 'Government Support',
      icon: Award,
      badge: { text: `${eligibleSchemesCount} Grants`, variant: 'brand' }
    },
    {
      to: '/profile',
      label: 'Business Profile',
      icon: Building2,
      badge: { text: 'Edit', variant: 'default' }
    }
  ];

  const handleRoleToggle = () => {
    const nextRole = currentUserRole === 'business_admin' ? 'officer' : 'business_admin';
    setCurrentUserRole(nextRole);
    if (nextRole === 'officer') {
      navigate('/officer');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <aside className="w-64 h-screen bg-[#FAFBF9] border-r border-[#D1D9D0] flex flex-col shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E3E8E2] flex items-center justify-between">
        <NavLink 
          to="/" 
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#245C3A] text-[#7ED957] flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-[#1C4B2E] transition-colors">
            I
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#18201B] tracking-tight text-base">INDUSTRIA</span>
              <span className="text-[10px] bg-[#EBF8E5] text-[#245C3A] font-semibold px-1.5 py-0.5 rounded border border-[#D5EED0]">
                MH
              </span>
            </div>
            <p className="text-[10px] text-[#839187] font-medium leading-none mt-0.5">Industrial Lifecycle System</p>
          </div>
        </NavLink>
      </div>

      {/* Enterprise / User Banner */}
      <div className="px-4 py-3 bg-[#F1F4EE] border-b border-[#E3E8E2]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-2 h-2 rounded-full shrink-0 ${currentUserRole === 'officer' ? 'bg-[#C23934]' : 'bg-[#7ED957]'}`} />
            <div className="truncate">
              <p className="text-xs font-semibold text-[#18201B] truncate">
                {currentUserRole === 'officer' ? 'Govt Scrutiny Desk' : company.tradeName}
              </p>
              <p className="text-[10px] text-[#839187] truncate">
                {currentUserRole === 'officer' ? 'DISH / Fire / MPCB' : `${company.district}, MH`}
              </p>
            </div>
          </div>
          <button
            onClick={handleRoleToggle}
            title="Switch between Enterprise Admin and Scrutiny Officer"
            className="text-[10px] text-[#245C3A] hover:text-[#173B25] font-semibold bg-white px-2 py-1 rounded border border-[#D1D9D0] shadow-2xs hover:bg-[#EBF8E5] transition-colors shrink-0"
          >
            {currentUserRole === 'officer' ? 'Admin' : 'Officer'}
          </button>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[11px] font-semibold text-[#839187] uppercase tracking-wider mb-2">
          Workspace Navigation
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#245C3A] text-white shadow-xs'
                    : 'text-[#58655C] hover:bg-[#F1F4EE] hover:text-[#18201B]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#7ED957]' : 'text-[#839187]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && !isActive && (
                    <Badge variant={item.badge.variant} size="sm">
                      {item.badge.text}
                    </Badge>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Onboard New Company Link */}
        <div className="pt-4 mt-4 border-t border-[#E3E8E2]">
          <p className="px-3 text-[11px] font-semibold text-[#839187] uppercase tracking-wider mb-2">
            Enterprise Onboarding
          </p>
          <NavLink
            to="/register"
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#245C3A] text-white'
                  : 'text-[#245C3A] bg-[#EBF8E5] hover:bg-[#D5EED0]'
              }`
            }
          >
            <div className="flex items-center gap-2">
              <UserPlus className="w-3.5 h-3.5 text-[#245C3A]" />
              <span className="font-bold">Register New Company</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#245C3A]" />
          </NavLink>

          <NavLink
            to="/officer"
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 mt-1 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#245C3A] text-white'
                  : 'text-[#58655C] hover:bg-[#F1F4EE] hover:text-[#18201B]'
              }`
            }
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#B02824]" />
              <span>Officer Scrutiny Desk</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#839187]" />
          </NavLink>
        </div>
      </nav>

      {/* Footer controls: Reset demo data */}
      <div className="p-3 border-t border-[#E3E8E2] bg-[#FAFBF9] space-y-2">
        <button
          onClick={resetDemoState}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-[#58655C] hover:text-[#18201B] hover:bg-[#F1F4EE] rounded-lg border border-[#E3E8E2] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#839187]" />
          <span>Reset Sample Demo Data</span>
        </button>

        <div className="px-2 pt-1 text-center">
          <p className="text-[10px] text-[#839187]">SIH26130 · Govt of Maharashtra</p>
        </div>
      </div>
    </aside>
  );
}
