import React from 'react';
import { Bell, Calendar, Sparkles, AlertCircle, ChevronRight } from 'lucide-react';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: 'New Scheme: PM Yashasvi Scholarship',
      body: 'Scholarships for students in OBC, EBC, and DNT categories. Application deadline: June 30th.',
      time: '2 hours ago',
      type: 'scheme',
      important: true
    },
    {
      id: 2,
      title: 'Eligibility Update: Age limit increase',
      body: 'The Karnataka Gruha Jyothi scheme age requirements have been updated. You might now qualify.',
      time: '1 day ago',
      type: 'system',
      important: false
    },
    {
      id: 3,
      title: 'Document Expiry Warning',
      body: 'Your Income Certificate will expire in 15 days. Renew it to keep scholarship eligibility.',
      time: '3 days ago',
      type: 'alert',
      important: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-800 shadow-sm">
          <Bell size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Smart Notifications</h2>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Real-time Scheme Updates</p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map(notif => (
          <div 
            key={notif.id} 
            className={`p-5 rounded-3xl border transition-all flex gap-4 ${
              notif.important ? 'bg-orange-50 border-orange-100' : 'bg-white border-slate-100'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              notif.type === 'scheme' ? 'bg-orange-600 text-white' : 
              notif.type === 'system' ? 'bg-indigo-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {notif.type === 'scheme' ? <Sparkles size={18} /> : 
               notif.type === 'system' ? <Calendar size={18} /> : <AlertCircle size={18} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-slate-800 uppercase tracking-tight">{notif.title}</h3>
                <span className="text-[10px] font-bold text-slate-400">{notif.time}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{notif.body}</p>
              <button className="mt-4 text-orange-600 text-[10px] font-bold uppercase flex items-center gap-1 hover:gap-2 transition-all">
                Take Action <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
