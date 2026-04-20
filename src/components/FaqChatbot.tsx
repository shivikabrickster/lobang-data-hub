import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const suggestedQuestions = [
  '🇸🇬 What features are available in Singapore?',
  '🤖 How do I build AI apps?',
  '🎓 What free training is available?',
  '🏛️ Options for SG agencies?',
  '📋 Which models are in SG?',
  '🔐 What about data residency?',
];

const fallbackFaqs: { keywords: string[]; answer: string }[] = [
  { keywords: ['singapore', 'sg', 'region', 'available'], answer: 'Databricks is available in Singapore on AWS (ap-southeast-1), Azure (Southeast Asia), and GCP (asia-southeast1). Check the **"Agentic & ML Features in SG"** tile under Security & Compliance for detailed feature availability.' },
  { keywords: ['training', 'learn', 'course', 'free'], answer: 'Check out the **Trainings** tile under Get Started for Training Home and Free Trainings links.' },
  { keywords: ['ai', 'app', 'build', 'agent'], answer: 'Explore the **Build** section — it has tiles for AI Dev Kit, Databricks Apps, AgentBricks, Genie, and more.' },
  { keywords: ['cost', 'pricing', 'price'], answer: 'Check the **Sizing** section for Pricing & Cost Calculators and Compute & Cluster Sizing.' },
  { keywords: ['model', 'fmapi', 'llm', 'claude', 'gpt'], answer: 'Click **"Agentic & ML Features in SG"** under Security & Compliance, then toggle **Show Models** to see all models available in ap-southeast-1.' },
];

function fallbackAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of fallbackFaqs) {
    if (faq.keywords.some((kw) => lower.includes(kw))) return faq.answer;
  }
  return "I'm having trouble connecting right now. Browse the tiles on the main page — they're organized by topic (Build, Explore, Security & Compliance, etc.) to help you find what you need!";
}

// Render markdown-like text: **bold**, [links](url), bullet points
function RenderText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, li) => {
        const isBullet = line.trimStart().startsWith('- ') || line.trimStart().startsWith('• ');
        const content = isBullet ? line.replace(/^\s*[-•]\s*/, '') : line;

        // Parse **bold** and [links](url)
        const parts = content.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/).map((part, pi) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pi} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
          }
          const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
          if (linkMatch) {
            return <a key={pi} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-[#FF7A59] hover:text-[#ff9477] underline underline-offset-2">{linkMatch[1]}</a>;
          }
          return <span key={pi}>{part}</span>;
        });

        if (isBullet) {
          return (
            <div key={li} className="flex gap-2 mt-1">
              <span className="text-[#FF7A59] shrink-0 mt-0.5">•</span>
              <span>{parts}</span>
            </div>
          );
        }
        return <div key={li} className={li > 0 && line === '' ? 'h-2' : ''}>{parts}</div>;
      })}
    </>
  );
}

export default function FaqChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! 👋 I'm the **Lobang Bot** — your AI assistant for Databricks in Singapore.\n\nI can help with feature availability, training, pricing, security, and more. What would you like to know?\n\n⚠️ *Disclaimer: Responses are AI-generated and may not always be accurate. Please verify with official [Databricks documentation](https://docs.databricks.com) before making any decisions.*" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    // Strip emoji prefix from suggested questions
    const cleanText = text.replace(/^[^\w\s]*\s/, '').trim() || text.trim();

    const userMsg: Message = { role: 'user', text: cleanText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const recentMessages = updatedMessages.slice(-10);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: recentMessages }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
    } catch {
      const answer = fallbackAnswer(cleanText);
      setMessages((prev) => [...prev, { role: 'bot', text: answer }]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    setMessages([
      { role: 'bot', text: "Hi! 👋 I'm the **Lobang Bot** — your AI assistant for Databricks in Singapore.\n\nI can help with feature availability, training, pricing, security, and more. What would you like to know?\n\n⚠️ *Disclaimer: Responses are AI-generated and may not always be accurate. Please verify with official [Databricks documentation](https://docs.databricks.com) before making any decisions.*" },
    ]);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-20 right-6 z-50 w-[420px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              height: '580px',
              background: 'linear-gradient(180deg, #0d1117, #0f1419)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(255,122,89,0.10)',
            }}
          >
            {/* Header */}
            <div className="relative px-5 py-4" style={{ background: 'linear-gradient(135deg, #FF7A59 0%, #e8623f 100%)' }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-[15px] flex items-center gap-2">
                      Lobang Bot
                      <span className="text-[9px] font-semibold bg-white/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">AI</span>
                    </div>
                    <div className="text-white/60 text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Powered by Llama 3.3 + Databricks Docs
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={resetChat} className="text-white/50 hover:text-white transition-colors p-2 cursor-pointer bg-transparent border-none rounded-lg hover:bg-white/10" title="Reset chat">
                    <RotateCcw size={14} />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors p-2 cursor-pointer bg-transparent border-none rounded-lg hover:bg-white/10">
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-[#FF7A59]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={14} className="text-[#FF7A59]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13px] leading-[1.6] ${
                      msg.role === 'user'
                        ? 'bg-[#FF7A59] text-white rounded-br-md'
                        : 'text-white/80 rounded-bl-md'
                    }`}
                    style={msg.role === 'bot' ? { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' } : {}}
                  >
                    <RenderText text={msg.text} />
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={14} className="text-white/50" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-[#FF7A59]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={14} className="text-[#FF7A59]" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md px-4 py-3.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex gap-1.5 items-center">
                      <span className="text-[11px] text-white/30 mr-1">Thinking</span>
                      <span className="w-1.5 h-1.5 bg-[#FF7A59]/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#FF7A59]/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#FF7A59]/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggested questions */}
              {messages.length === 1 && !isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-1.5 pt-1">
                  <span className="text-[10px] text-white/25 uppercase tracking-wider font-bold px-1 mb-1">Try asking</span>
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-left text-[12px] px-3 py-2 rounded-xl text-white/60 hover:text-white transition-all cursor-pointer bg-transparent hover:bg-white/[0.04]"
                      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
              <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Databricks in SG..."
                  disabled={isTyping}
                  className="flex-1 bg-white/[0.06] text-white text-[13px] px-4 py-3 rounded-xl border-none outline-none placeholder:text-white/20 focus:bg-white/[0.08] focus:ring-1 focus:ring-[#FF7A59]/30 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 transition-all cursor-pointer border-none disabled:opacity-20"
                  style={{ background: !input.trim() || isTyping ? 'rgba(255,255,255,0.05)' : '#FF7A59' }}
                >
                  <Send size={15} />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[9px] text-white/15">Powered by Databricks Lobang Data Hub</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 cursor-pointer border-none"
        style={{ background: 'linear-gradient(135deg, #FF7A59, #e8623f)', boxShadow: '0 4px 24px rgba(255,122,89,0.42)' }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
