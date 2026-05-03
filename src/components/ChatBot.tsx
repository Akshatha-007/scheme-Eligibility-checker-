import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  X, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Sparkles,
  RefreshCcw,
  Volume2
} from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import { useUser } from '../UserContext';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function ChatBot({ onClose }: { onClose: () => void }) {
  const { profile } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Namaste! I'm YOJANA AI. How can I help you discover government schemes today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getChatResponse(messages, userMessage, profile || undefined);
      setMessages(prev => [...prev, { role: 'model', content: response || "I'm not sure how to answer that." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm experiencing technical difficulties." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-IN'; // Can be changed to 'kn-IN' or 'hi-IN'
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[95vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl z-[100] border border-slate-100 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-orange-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm">YOJANA Assistant</h3>
            <p className="text-[10px] text-orange-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Online & AI-Powered
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
              m.role === 'user' 
              ? 'bg-orange-600 text-white rounded-tr-none' 
              : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              {m.content}
              {m.role === 'model' && (
                <button className="mt-2 text-slate-400 hover:text-orange-600 block">
                  <Volume2 size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 py-2 bg-slate-50 flex gap-2 overflow-x-auto scrollbar-hide">
          {['Free Bus Scheme', 'Agri Subsidy', 'PM Kisan Status'].map(q => (
            <button 
              key={q}
              onClick={() => setInput(q)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 whitespace-nowrap hover:border-orange-300 active:scale-95 transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative flex items-center gap-2">
          <div className="flex-1 relative">
             <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-medium"
            />
            <button 
              onClick={toggleListening}
              className={`absolute right-3 top-2.5 ${isListening ? 'text-red-600' : 'text-slate-400'} hover:text-orange-600 transition-colors`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          </div>
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:bg-slate-300 transition-all active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[9px] text-center text-slate-400 mt-2 font-medium">
          Powered by Gemini AI • Supporting Kannada & Hindi
        </p>
      </div>
    </motion.div>
  );
}
