import React from 'react';
import { HelpCircle, Phone, Mail, MessageSquare, ExternalLink, ShieldAlert } from 'lucide-react';

export default function Help() {
  const faqs = [
    { q: "How does YOJANA AI work?", a: "Our AI engine analyzes your smart profile (age, income, location, etc.) and matches it with thousands of data points from official schemes across Karnataka and India." },
    { q: "Is my Aadhaar data safe?", a: "Yes. YOJANA AI uses bank-grade encryption and only masks your Aadhaar for eligibility verification. We never store your full sensitive documents on our servers." },
    { q: "Can I apply for schemes through the app?", a: "We provide step-by-step guides and direct links to official government portals like Seva Sindhu, UMANG, and MyScheme for the final application." }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-800 shadow-sm">
          <HelpCircle size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Help Center</h2>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Support & Documentation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FAQs */}
        <section className="space-y-4">
          <h3 className="font-bold text-lg text-slate-800">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-sm text-slate-800 mb-2">{faq.q}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Resources */}
        <section className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-100">
            <h3 className="font-bold mb-4">Contact Support</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Phone size={20} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Toll-Free Helpline</p>
                  <p className="text-sm font-bold">1800-425-4444 (10 AM - 6 PM)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Mail size={20} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Email Assistance</p>
                  <p className="text-sm font-bold">support@yojana-ai.gov.in</p>
                </div>
              </div>
            </div>
            <button className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-xl mt-6 hover:bg-orange-700 transition-all flex items-center justify-center gap-2">
              <MessageSquare size={18} /> Start Live Chat
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Official Links</h3>
            <div className="space-y-2">
              {[
                { name: 'Seva Sindhu Karnataka', url: 'https://sevasindhu.karnataka.gov.in' },
                { name: 'UMANG Portal India', url: 'https://web.umang.gov.in' },
                { name: 'MyScheme Portal', url: 'https://www.myscheme.gov.in' }
              ].map(link => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-xs font-bold text-slate-600 group-hover:text-orange-600">{link.name}</span>
                  <ExternalLink size={14} className="text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-start gap-4">
            <ShieldAlert className="text-red-600 shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-sm text-red-800">Fraud Alert</h4>
              <p className="text-[10px] text-red-700 leading-relaxed mt-1">
                YOJANA AI never asks for your bank password or PIN. Only apply through official government domains (.gov.in or .nic.in).
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
