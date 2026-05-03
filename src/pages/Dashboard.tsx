import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  ChevronRight, 
  MapPin, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useUser } from '../UserContext';
import { SCHEMES, Scheme } from '../constants';
import { checkEligibility, EligibilityResult } from '../services/geminiService';
import { Link } from 'react-router-dom';

const StatCard = ({ label, value, color, icon: Icon }: { label: string, value: string | number, color: string, icon: any }) => (
  <div className="card-minimal p-5 flex items-center justify-between">
    <div>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{label}</p>
      <h3 className={`text-2xl font-bold mt-1 ${color}`}>{value}</h3>
    </div>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color.replace('text-', 'bg-').replace('-600', '-50')}`}>
      <Icon size={20} className={color} />
    </div>
  </div>
);

const SchemeMiniCard = ({ scheme, result }: { scheme: Scheme, result: EligibilityResult }) => (
  <Link to={`/schemes?id=${scheme.id}`} className="card-minimal p-5 hover:border-gov-green transition-all group border-l-4" style={{ borderLeftColor: result.status === 'Eligible' ? '#166534' : result.status === 'Partially Eligible' ? '#ea580c' : '#ef4444' }}>
    <div className="flex justify-between items-start mb-3">
      <span className="text-[10px] font-bold text-gov-green uppercase tracking-tight">{scheme.ministry.split(',')[0]}</span>
      <span className={`pill-minimal ${
        result.status === 'Eligible' ? 'bg-green-100 text-gov-green' : 
        result.status === 'Partially Eligible' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-700'
      }`}>
        {result.status}
      </span>
    </div>
    <h4 className="font-bold text-slate-900 group-hover:text-gov-green transition-colors uppercase tracking-tight text-sm">{scheme.name}</h4>
    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{result.reason}</p>
    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-3 text-[10px] font-bold text-slate-400">
      <div className="flex items-center gap-1"><TrendingUp size={12} /> {result.benefitValue} Benefit</div>
      <div className="flex items-center gap-1 text-gov-green">Score: {result.score}%</div>
    </div>
  </Link>
);

export default function Dashboard() {
  const { profile } = useUser();
  const [results, setResults] = useState<EligibilityResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setLoading(true);
      checkEligibility(profile, SCHEMES).then(res => {
        setResults(res);
        setLoading(false);
      });
    }
  }, [profile]);

  const eligibleCount = results.filter(r => r.status === 'Eligible').length;
  const partialCount = results.filter(r => r.status === 'Partially Eligible').length;

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-white rounded-3xl border border-slate-200">
        <div className="w-20 h-20 bg-ui-panel-bg rounded-2xl flex items-center justify-center text-gov-green mb-6 border border-slate-100 shadow-sm">
          <Sparkles size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Discover Your Future</h2>
        <p className="text-slate-500 max-w-md mb-8">YOJANA AI matches your profile with verified government schemes in Karnataka and India.</p>
        <Link to="/profile" className="bg-gov-green text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-opacity-90 transition-all flex items-center gap-3">
          Create Smart Profile <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Direct Matches" value={eligibleCount} color="text-gov-green" icon={CheckCircle2} />
        <StatCard label="Review Needed" value={partialCount} color="text-gov-saffron" icon={AlertCircle} />
        <StatCard label="Live Schemes" value={SCHEMES.length} color="text-slate-600" icon={TrendingUp} />
      </section>

      {/* Eligible Schemes section from Design HTML */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 border-l-4 border-gov-green pl-3">Direct Matches (Eligible)</h2>
          <Link to="/schemes" className="text-gov-green text-xs font-bold uppercase tracking-widest flex items-center gap-1">
            Browse All <ChevronRight size={14} />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2].map(i => <div key={i} className="h-48 bg-white rounded-2xl border border-slate-200" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.filter(r => r.status === 'Eligible').slice(0, 4).map(res => {
              const scheme = SCHEMES.find(s => s.id === res.schemeId);
              if (!scheme) return null;
              return <SchemeMiniCard key={scheme.id} scheme={scheme} result={res} />;
            })}
          </div>
        )}
      </section>

      {/* Life Journey Section */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 border-l-4 border-slate-900 pl-3 mb-6">Life Journey Roadmap</h2>
        <div className="card-minimal p-8 flex items-center justify-between gap-8 bg-gradient-to-r from-gov-green to-[#14532d] text-white border-0">
          <div>
            <p className="text-[10px] font-bold opacity-70 uppercase tracking-[0.2em] mb-2">Current Stage</p>
            <h3 className="text-2xl font-bold">{profile.occupation || 'Awaiting Details'}</h3>
            <p className="text-sm opacity-90 mt-2 font-medium">Next Unlock: Skill Development Grants (Age 25+)</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black">85%</div>
            <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Profile Completeness</p>
          </div>
        </div>
      </section>

      {/* Regional Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-minimal p-6">
          <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-gov-green" /> Local Assistance
          </h4>
          <div className="space-y-3">
             <div className="flex items-center justify-between p-3 bg-ui-panel-bg rounded-lg border border-slate-100">
                <span className="text-xs font-bold">Bengaluru One CSC</span>
                <button className="text-[10px] font-bold text-gov-green uppercase">Get Directions</button>
             </div>
             <div className="flex items-center justify-between p-3 bg-ui-panel-bg rounded-lg border border-slate-100">
                <span className="text-xs font-bold">Gram Panchayat Office</span>
                <button className="text-[10px] font-bold text-gov-green uppercase">Get Directions</button>
             </div>
          </div>
        </div>
        
        <div className="card-minimal p-6 bg-slate-900 border-slate-800 text-white">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-bold">Upcoming Deadlines</h4>
            <span className="pill-minimal bg-red-500/20 text-red-400 text-[10px]">Priority</span>
          </div>
          <div className="space-y-4">
             <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center text-orange-500 shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold">PM Kisan Verification</p>
                  <p className="text-[10px] text-slate-400 mt-1">Due in 5 days • Action Required</p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
