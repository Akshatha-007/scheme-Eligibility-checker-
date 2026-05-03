import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  User, 
  Bell, 
  Settings, 
  HelpCircle, 
  MessageSquare, 
  LayoutDashboard,
  Menu,
  X,
  Languages,
  ShieldCheck,
  ChevronRight,
  Bot
} from 'lucide-react';
import { UserProvider, useUser } from './UserContext';
import Dashboard from './pages/Dashboard';
import Schemes from './pages/Schemes';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import SettingsPage from './pages/Settings';
import Help from './pages/Help';
import ChatBot from './components/ChatBot';

const NavItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${active ? 'bg-ui-panel-bg text-gov-green' : 'text-slate-500 hover:bg-slate-50'}`}>
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    <span className="text-sm">{label}</span>
  </Link>
);

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { profile } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ui-bg text-slate-800">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-[260px] bg-white border-r border-slate-200 flex-col pt-8 pb-6 px-6 shrink-0">
          <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-12 bg-gov-green rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-2">Y</div>
            <h1 className="font-bold text-xl tracking-tighter text-slate-900">YOJANA AI</h1>
            <p className="text-[10px] text-slate-400 tracking-[0.1em] uppercase mt-1">सत्यमेव जयते</p>
          </div>
          
          <nav className="space-y-1 flex-1">
            <NavItem to="/" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/'} />
            <NavItem to="/schemes" icon={Search} label="All Schemes" active={location.pathname === '/schemes'} />
            <NavItem to="/notifications" icon={Bell} label="Notifications" active={location.pathname === '/notifications'} />
            <NavItem to="/profile" icon={User} label="Profile Settings" active={location.pathname === '/profile'} />
          </nav>

          <div className="mt-auto card-minimal p-4">
             <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Language Profile</p>
             <div className="flex gap-2">
               <span className="pill-minimal bg-green-100 text-gov-green uppercase tracking-tighter text-[10px]">Kannada</span>
               <span className="pill-minimal bg-green-100 text-gov-green uppercase tracking-tighter text-[10px]">English</span>
             </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-ui-panel-bg">
          {/* Header Mobile Only / Top Navigation */}
          <header className="md:hidden bg-white border-b border-slate-200 px-4 h-16 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gov-green rounded-md flex items-center justify-center text-white font-bold text-lg">Y</div>
              <h1 className="font-bold text-lg tracking-tight">YOJANA AI</h1>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            {profile && (
              <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Welcome back, {profile.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">We found eligible scheme matches for your profile in {profile.location}.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="card-minimal px-4 py-2 flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-none">{profile.name}</p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">{profile.occupation || 'User'} • {profile.location}</p>
                    </div>
                  </div>
                </div>
              </header>
            )}
            
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Right Panel - Desktop Only */}
        <aside className="hidden lg:flex w-[280px] bg-white border-l border-slate-200 flex-col p-6 overflow-y-auto gap-6 shrink-0">
          <div className="card-minimal p-4">
            <h4 className="text-sm font-bold flex items-center gap-2 mb-4">
              <Bot size={18} className="text-gov-green" /> AI Assistant
            </h4>
            <div className="bg-ui-panel-bg p-3 rounded-lg text-xs leading-relaxed text-slate-600">
              Hello! I'm active. Complete your profile to get more precise scheme recommendations.
            </div>
            <div className="mt-4 space-y-2">
              <button onClick={() => setIsChatOpen(true)} className="w-full bg-gov-green text-white text-[11px] font-bold py-2 rounded-md hover:bg-opacity-90 transition-all">
                Open AI Chat
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Document Privacy</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Aadhaar Vault</span>
                <span className="text-green-600 font-bold">✅ SECURE</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Data Encryption</span>
                <span className="text-green-600 font-bold">✅ ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="card-minimal p-4 bg-orange-50 border-orange-200">
            <h4 className="text-[10px] font-black text-gov-saffron uppercase tracking-widest mb-2">Regional Alerts</h4>
            <p className="text-xs text-orange-800 leading-relaxed">
              New Karnataka State Budget has introduced higher subsidies for organic farmers. Check the Agriculture section.
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile Bot Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-gov-green text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 transition-transform active:scale-90"
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Overlay */}
      <AnimatePresence>
        {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </UserProvider>
  );
}
