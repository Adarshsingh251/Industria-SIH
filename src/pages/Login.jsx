import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function Login() {
  const { loginUser } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@aarohan.demo');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, email.includes('officer') ? 'officer' : 'business_admin');
    if (email.includes('officer')) {
      navigate('/officer');
    } else {
      navigate('/dashboard');
    }
  };

  const handleQuickDemoLogin = (roleType) => {
    if (roleType === 'officer') {
      loginUser('officer@industria.demo', 'officer');
      navigate('/officer');
    } else {
      loginUser('admin@aarohan.demo', 'business_admin');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F4] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#245C3A] text-[#7ED957] flex items-center justify-center font-bold text-xl shadow-xs">
            I
          </div>
          <span className="font-extrabold text-[#18201B] tracking-tight text-xl">INDUSTRIA</span>
        </Link>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18201B] tracking-tight">
          Sign In to Workspace
        </h2>

        <p className="text-xs sm:text-sm text-[#58655C]">
          Access your industrial approvals, document vault, and state compliance schedule.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white border border-[#D1D9D0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Quick Demo Login Triggers */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold text-[#839187] uppercase tracking-wider block">
              1-Click Demo Profiles:
            </span>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="p-3 bg-[#FAFBF9] hover:bg-[#EBF8E5] border border-[#D5EED0] rounded-xl flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF8E5] text-[#245C3A] flex items-center justify-center font-bold text-xs">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#18201B] group-hover:text-[#245C3A]">
                      Aarohan Precision Components
                    </p>
                    <p className="text-[10px] text-[#839187]">Managing Director (admin@aarohan.demo)</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#839187] group-hover:text-[#245C3A]" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('officer')}
                className="p-3 bg-[#FAFBF9] hover:bg-[#FDE8E8] border border-[#F9C3C3] rounded-xl flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FDE8E8] text-[#B02824] flex items-center justify-center font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#18201B] group-hover:text-[#B02824]">
                      Govt Scrutiny Officer
                    </p>
                    <p className="text-[10px] text-[#839187]">DISH / Fire Desk (officer@industria.demo)</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#839187] group-hover:text-[#B02824]" />
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#E3E8E2]"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-[#839187]">Or log in with email</span>
            <div className="flex-grow border-t border-[#E3E8E2]"></div>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#18201B]">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#839187] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#D1D9D0] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#18201B]">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#839187] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#D1D9D0] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full mt-2"
            >
              Sign In to Workspace
            </Button>
          </form>

          {/* Register link */}
          <div className="text-center pt-3 border-t border-[#E3E8E2] text-xs text-[#58655C]">
            New industrial facility?{' '}
            <Link to="/register" className="font-bold text-[#245C3A] hover:underline">
              Register new enterprise profile →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
