import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  FileText,
  CreditCard,
  Target
} from 'lucide-react';
import { useUser } from '../UserContext';
import { UserProfile } from '../services/geminiService';

export default function Profile() {
  const { profile, setProfile } = useUser();
  const [formData, setFormData] = useState<UserProfile>(profile || {
    name: '',
    age: 0,
    gender: 'Male',
    income: 0,
    occupation: '',
    location: 'Karnataka',
    category: 'General',
    specialConditions: []
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [aadhaar, setAadhaar] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleVerifyAadhaar = async () => {
    if (aadhaar.length !== 12) return;
    setIsVerifying(true);
    try {
      const res = await fetch(`/api/mock/aadhaar/${aadhaar}`);
      const data = await res.json();
      setFormData({
        ...formData,
        name: data.name,
        location: data.address,
        gender: data.gender,
        category: data.category
      });
      setIsVerifying(false);
    } catch (e) {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-gov-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-100">
          <User size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Smart User Profile</h2>
          <p className="text-sm text-slate-500">The core engine for your scheme eligibility</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-8 space-y-6">
          <section className="card-minimal p-8">
            <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2 border-b border-slate-50 pb-4">
              <ShieldCheck size={20} className="text-gov-green" /> Identity Verification
            </h3>
            
            <div className="flex gap-4 mb-10">
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Aadhaar Card Number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value.replace(/[^0-9]/g, '').slice(0, 12))}
                    placeholder="Enter 12-digit Aadhaar"
                    className="w-full bg-ui-panel-bg border border-slate-200 rounded-xl px-4 py-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all font-mono"
                  />
                  {aadhaar.length === 12 && !isVerifying && (
                    <button 
                      onClick={handleVerifyAadhaar}
                      className="absolute right-3 top-3 bg-gov-green text-white text-[10px] font-bold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
                    >
                      VERIFY
                    </button>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-ui-panel-bg border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-green-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Age</label>
                  <input 
                    type="number" 
                    value={formData.age || ''}
                    onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
                    className="w-full bg-ui-panel-bg border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-green-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Gender</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full bg-ui-panel-bg border border-slate-100 rounded-xl px-4 py-3 appearance-none"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Annual Income (₹)</label>
                  <input 
                    type="number" 
                    value={formData.income || ''}
                    onChange={(e) => setFormData({...formData, income: Number(e.target.value)})}
                    className="w-full bg-ui-panel-bg border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-green-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Occupation</label>
                  <input 
                    type="text" 
                    value={formData.occupation}
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                    placeholder="e.g. Farmer, Student"
                    className="w-full bg-ui-panel-bg border border-slate-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-green-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-ui-panel-bg border border-slate-100 rounded-xl px-4 py-3 appearance-none"
                  >
                    <option>General</option>
                    <option>OBC</option>
                    <option>SC</option>
                    <option>ST</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-gov-green text-white font-bold py-4 rounded-xl shadow-lg shadow-green-100 hover:bg-opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-3 tracking-tight"
                >
                  {success ? <CheckCircle2 size={24} /> : <Target size={24} />}
                  {success ? 'PROFILE SAVED' : 'UPDATE SMART PROFILE'}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Right: Docs */}
        <div className="lg:col-span-4 space-y-6">
          <section className="card-minimal p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText size={20} className="text-gov-green" /> Verification Status
            </h3>
            
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-slate-100 flex items-center justify-between bg-ui-panel-bg/30">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-gov-green" size={18} />
                  <span className="text-xs font-bold text-slate-700">Aadhaar Card</span>
                </div>
                <CheckCircle2 className="text-gov-green" size={18} />
              </div>
              <div className="p-4 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center py-6 cursor-pointer hover:border-gov-green transition-all group">
                <Upload size={20} className="text-slate-400 group-hover:text-gov-green mb-2" />
                <p className="text-[10px] font-bold text-slate-400 uppercase">Upload Income Cert</p>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 p-6 rounded-2xl text-white">
            <h3 className="text-xs font-bold text-gov-saffron uppercase tracking-widest mb-4">AI Security Protocol</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              All data is end-to-end encrypted. We uses Zero-Knowledge proofs for eligibility verification without storing raw PII.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
              <ShieldCheck size={14} /> ISO 27001 COMPLIANT
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
