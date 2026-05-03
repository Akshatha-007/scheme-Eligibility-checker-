import React from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Languages, 
  Accessibility, 
  Shield, 
  Smartphone,
  Eye,
  Type,
  Bell
} from 'lucide-react';

export default function Settings() {
  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        { label: 'Display Language', value: 'English / Kannada', icon: Languages },
        { label: 'Appearance', value: 'Light Mode', icon: Moon },
        { label: 'Notification Settings', value: 'Push & Email', icon: Bell }
      ]
    },
    {
      title: 'Accessibility',
      items: [
        { label: 'Text Size', value: 'Medium', icon: Type },
        { label: 'High Contrast', value: 'Off', icon: Eye },
        { label: 'Dyslexia Friendly Font', value: 'Off', icon: Accessibility }
      ]
    },
    {
      title: 'System & Security',
      items: [
        { label: 'Biometric Lock', value: 'Face ID', icon: Shield },
        { label: 'Offline Mode', value: 'Enabled', icon: Smartphone }
      ]
    }
  ];

  return (
    <div className="space-y-8">
       <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-800 shadow-sm">
          <SettingsIcon size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">App Settings</h2>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Customize your AI experience</p>
        </div>
      </div>

      <div className="space-y-6">
        {settingsGroups.map(group => (
          <div key={group.title} className="space-y-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">{group.title}</h3>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
              {group.items.map((item, i) => (
                <div key={item.label} className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer ${i !== group.items.length - 1 ? 'border-b border-slate-50' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                      <item.icon size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
