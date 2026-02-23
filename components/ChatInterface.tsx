
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await geminiService.sendMessage(input, history);
    
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark">
      <header className="h-16 bg-white dark:bg-card-dark border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Fiscal Mentor</h2>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse"></span> Online
          </span>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-chatPrimary/10 flex items-center justify-center text-chatPrimary">
              <span className="material-icons-round text-4xl">smart_toy</span>
            </div>
            <p className="text-center max-w-sm">Olá! Sou seu Mentor Fiscal. Em que posso ajudar com legislações tributárias brasileiras hoje?</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white shadow-lg ${
                msg.role === 'user' ? 'bg-primary' : 'bg-gradient-to-br from-indigo-500 to-pink-500'
              }`}>
                <span className="material-icons-round text-xl">
                  {msg.role === 'user' ? 'person' : 'auto_awesome'}
                </span>
              </div>
              <div className="flex-1">
                <div className={`p-5 rounded-2xl shadow-card border border-slate-100 dark:border-slate-700 ${
                  msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-card-dark text-slate-800 dark:text-slate-200 rounded-tl-none'
                }`}>
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                    {msg.text}
                  </div>
                </div>
                <div className={`mt-2 text-[10px] text-slate-400 font-medium ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white animate-pulse">
                <span className="material-icons-round">auto_awesome</span>
              </div>
              <div className="bg-white dark:bg-card-dark p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white dark:bg-card-dark border-t border-slate-200 dark:border-slate-700 shrink-0">
        <div className="max-w-4xl mx-auto relative flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="w-full pl-6 pr-14 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 resize-none shadow-inner text-slate-700 dark:text-slate-200 placeholder-slate-400 font-medium transition-all"
            placeholder="Faça uma nova pergunta sobre legislação fiscal..."
            rows={1}
            style={{ minHeight: '56px' }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3.5 bg-primary hover:bg-cyan-800 disabled:opacity-50 text-white rounded-xl shadow-lg transition-all flex items-center justify-center"
          >
            <span className="material-icons-round">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
