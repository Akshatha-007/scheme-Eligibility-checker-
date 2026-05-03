import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Clock,
  BookOpen,
  Briefcase,
  Sprout,
  Heart,
  Users,
  Building,
  Info
} from 'lucide-react';
import { SCHEMES, Scheme } from '../constants';
import { useUser } from '../UserContext';
import { checkEligibility, EligibilityResult } from '../services/geminiService';

const CategoryIcon = ({ cat }: { cat: string }) => {
  switch (cat) {
    case 'Education': return <BookOpen size={16} />;
    case 'Agriculture': return <Sprout size={16} />;
    case 'Health': return <Heart size={16} />;
    case 'MSME': return <Building size={16} />;
    case 'Women & Child': return <Users size={16} />;
    default: return <Briefcase size={16} />;
  }
};

export default function Schemes() {
  const { profile } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [results, setResults] = useState<EligibilityResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const categories = ['All', 'Education', 'Agriculture', 'Health', 'MSME', 'Social Welfare'];

  useEffect(() => {
    if (profile) {
      setLoading(true);
      checkEligibility(profile, SCHEMES).then(res => {
        setResults(res);
        setLoading(false);
      });
    }
  }, [profile]);

  const filteredSchemes = SCHEMES.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.ministry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => b.priority - a.priority);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search schemes or ministries..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-gov-green text-white shadow-md' 
                : 'bg-white text-slate-400 border border-slate-200 hover:text-slate-600 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scheme List */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-bold text-slate-800">{filteredSchemes.length} Schemes Found</h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Sort By: <span className="text-orange-600">Priority</span>
            </div>
          </div>

          {filteredSchemes.length === 0 && (
            <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
                <Search size={32} />
              </div>
              <p className="text-slate-500 font-medium">No schemes found matching your search.</p>
            </div>
          )}

          {filteredSchemes.map(scheme => {
            const result = results.find(r => r.schemeId === scheme.id);
            return (
              <motion.div 
                key={scheme.id}
                layoutId={scheme.id}
                onClick={() => setSelectedScheme(scheme)}
                className={`group card-minimal p-6 border-l-4 transition-all cursor-pointer ${
                  selectedScheme?.id === scheme.id ? 'border-gov-green ring-4 ring-green-100 shadow-xl' : 'border-slate-200'
                }`}
                style={{ borderLeftColor: result?.status === 'Eligible' ? '#166534' : result?.status === 'Partially Eligible' ? '#ea580c' : '#e2e8f0' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    <CategoryIcon cat={scheme.category} />
                    {scheme.category}
                  </div>
                  {result && (
                    <div className={`pill-minimal ${
                      result.status === 'Eligible' ? 'bg-green-100 text-gov-green' : 
                      result.status === 'Partially Eligible' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-700'
                    }`}>
                      {result.status}
                    </div>
                  )}
                </div>
                
                <h3 className="text-base font-bold text-slate-900 group-hover:text-gov-green transition-colors uppercase tracking-tight leading-snug">{scheme.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider line-clamp-1">{scheme.ministry.split(',')[0]}</p>
                
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                  {result ? (
                    <div className="flex items-center gap-6">
                       <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Benefit</span>
                        <span className="text-xs font-bold text-slate-700">{result.benefitValue}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Complexity</span>
                        <span className="text-xs font-bold text-slate-700">{result.easeOfApproval}</span>
                      </div>
                    </div>
                  ) : <div></div>}
                  
                  <div className="w-8 h-8 bg-ui-panel-bg rounded flex items-center justify-center text-slate-400 group-hover:bg-gov-green group-hover:text-white transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scheme Detail / Application Guide (Shown when selected or on right side on XL) */}
        {selectedScheme && (
          <div className="xl:col-span-5 relative">
            <div className="sticky top-24 card-minimal overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300 shadow-2xl">
              <div className="bg-gov-green h-24 p-6 flex items-start justify-between">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                  <CategoryIcon cat={selectedScheme.category} />
                </div>
                <button 
                  onClick={() => setSelectedScheme(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 leading-tight uppercase tracking-tight">{selectedScheme.name}</h2>
                  <p className="text-[10px] font-bold text-gov-green mt-2 uppercase tracking-widest">{selectedScheme.ministry}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-ui-panel-bg p-4 rounded-xl border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Benefit Summary</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{selectedScheme.benefits}</p>
                  </div>
                  <div className="bg-ui-panel-bg p-4 rounded-xl border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Portal Status</p>
                    <p className="text-xs text-slate-600 flex items-center gap-2 font-bold uppercase tracking-tight">
                       <Clock size={14} className="text-gov-saffron" />
                       {selectedScheme.deadline || 'ACTIVE'}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                     Required Documentation
                  </h4>
                  <div className="space-y-2">
                    {selectedScheme.requiredDocuments.map(docName => (
                      <div key={docName} className="flex items-center justify-between p-3 bg-ui-panel-bg/50 rounded-lg border border-slate-200/50">
                        <span className="text-[11px] font-bold text-slate-600">{docName}</span>
                        <CheckCircle2 size={14} className="text-gov-green" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">Application Steps</h4>
                  <div className="space-y-3">
                    {[
                      { step: 1, text: 'Register on the Seva Sindhu or Official Portal' },
                      { step: 2, text: 'Upload the required documents listed above' },
                      { step: 3, text: 'Submit and get the acknowledgement number' },
                    ].map(s => (
                      <div key={s.step} className="flex gap-4">
                        <span className="w-6 h-6 bg-green-50 text-gov-green rounded-lg flex items-center justify-center shrink-0 text-xs font-bold border border-green-100">{s.step}</span>
                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{s.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <a 
                  href={selectedScheme.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-slate-900 text-white text-center font-bold py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest shadow-xl shadow-slate-100"
                >
                  Visit Official Portal <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
