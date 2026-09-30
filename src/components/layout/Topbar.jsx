import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Building, 
  Sparkles, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  UserPlus,
  LogOut,
  Sliders
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SearchModal } from '../ui/SearchModal';
import { NotificationDrawer } from '../ui/NotificationDrawer';
import { Badge } from '../ui/Badge';

export function Topbar({ onOpenMobile }) {
  const { 
    company, 
    currentUser, 
    unreadNotificationCount, 
    currentUserRole, 
    setCurrentUserRole,
    logoutUser
  } = useApp();
  
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const getInitials = (name = "Vikram Patil") => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logoutUser();
    navigate('/login');
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-[#D1D9D0] px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        {/* Left Section: Mobile Menu + Active Context */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobile}
            className="md:hidden p-2 text-[#58655C] hover:text-[#18201B] hover:bg-[#F1F4EE] rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => navigate('/profile')}
            className="hidden sm:flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-[#FAFBF9] transition-colors"
            title="Click to view & edit company profile"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EBF8E5] text-[#245C3A] flex items-center justify-center font-bold text-xs border border-[#D5EED0]">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#18201B] leading-none hover:underline">
                  {company.legalName}
                </span>
                <Badge variant="brand" size="sm">
                  {company.industry}
                </Badge>
              </div>
              <p className="text-[11px] text-[#839187] mt-0.5">
                CIN: {company.cin} · {company.district}, MH
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Trigger Button */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 bg-[#F1F4EE] hover:bg-[#E8EDE5] text-[#839187] hover:text-[#18201B] rounded-lg border border-[#E3E8E2] text-xs transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#839187] group-hover:text-[#245C3A]" />
              <span>Search approvals, applications, documents, schemes...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white text-[#58655C] rounded border border-[#D1D9D0] shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Section: Quick Actions + Notifications + User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 text-[#58655C] hover:text-[#18201B] hover:bg-[#F1F4EE] rounded-lg"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 text-[#58655C] hover:text-[#18201B] hover:bg-[#F1F4EE] rounded-lg transition-colors"
            title="Open Notifications & Action Items"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#C23934] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* User Account / Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#F1F4EE] border border-transparent hover:border-[#D1D9D0] transition-colors"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                currentUserRole === 'officer' ? 'bg-[#B02824] text-white' : 'bg-[#245C3A] text-white'
              }`}>
                {getInitials(currentUser.name)}
              </div>
              <div className="hidden lg:block text-left pr-1">
                <p className="text-xs font-semibold text-[#18201B] leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-[#839187]">
                  {currentUser.roleLabel || currentUser.designation}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#839187] hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white border border-[#D1D9D0] rounded-xl shadow-xl z-50 py-2 text-xs divide-y divide-[#E3E8E2] animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2.5">
                    <p className="font-bold text-[#18201B]">{currentUser.name}</p>
                    <p className="text-[#839187] text-[11px] truncate">{currentUser.email}</p>
                    <p className="text-[10px] font-semibold text-[#245C3A] mt-1 bg-[#EBF8E5] px-2 py-0.5 rounded border border-[#D5EED0] inline-block">
                      {company.tradeName}
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate('/profile');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F1F4EE] flex items-center gap-2.5 text-[#18201B] font-medium"
                    >
                      <Sliders className="w-4 h-4 text-[#245C3A]" />
                      <span>Edit Business Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate('/register');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F1F4EE] flex items-center gap-2.5 text-[#18201B] font-medium"
                    >
                      <UserPlus className="w-4 h-4 text-[#7ED957]" />
                      <span>Register New Company</span>
                    </button>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-[#FDE8E8] flex items-center gap-2.5 text-[#B02824] font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out / Switch Account</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Global Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
}
