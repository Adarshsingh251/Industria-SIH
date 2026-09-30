import React from 'react';
import { Award, ArrowRight, Bookmark, Sparkles, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function SupportOpportunityCard({ schemes, onToggleSave }) {
  const navigate = useNavigate();

  const topScheme = schemes[0];

  if (!topScheme) return null;

  return (
    <div className="bg-white border border-[#D1D9D0] rounded-xl p-6 shadow-2xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FDF0F5] text-[#C03B6B] flex items-center justify-center border border-[#F9D0E0]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#18201B]">Government Support Discovery</h3>
              <p className="text-xs text-[#58655C]">Subsidies and capital grants matching Aarohan's profile</p>
            </div>
          </div>

          <Badge variant="accent" size="sm" icon={Sparkles}>
            12 Schemes Identified
          </Badge>
        </div>

        {/* Featured Scheme Spotlight */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#FAFBF9] to-[#F4FBF1] border border-[#D5EED0]">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#245C3A] bg-[#EBF8E5] px-2 py-0.5 rounded border border-[#D5EED0]">
                  {topScheme.department}
                </span>
                <span className="text-[10px] font-bold text-[#C03B6B] bg-[#FDF0F5] px-2 py-0.5 rounded border border-[#F9D0E0]">
                  {topScheme.matchScore}% Match
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#18201B] mt-2 leading-snug">
                {topScheme.title}
              </h4>
            </div>

            <button
              onClick={() => onToggleSave(topScheme.id)}
              title="Save Scheme"
              className={`p-1.5 rounded-lg border transition-colors ${
                topScheme.saved
                  ? 'bg-[#FDF0F5] border-[#F9D0E0] text-[#C03B6B]'
                  : 'bg-white border-[#D1D9D0] text-[#839187] hover:text-[#18201B]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          <ul className="mt-3 space-y-1.5 text-xs text-[#58655C]">
            {topScheme.benefits.slice(0, 2).map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#245C3A] font-bold mt-0.5">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E3E8E2] flex items-center justify-between">
        <span className="text-xs text-[#839187]">Eligible grant up to ₹2.50 Cr</span>
        <Button
          variant="primary"
          size="sm"
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => navigate('/support')}
        >
          Explore All Schemes
        </Button>
      </div>
    </div>
  );
}
