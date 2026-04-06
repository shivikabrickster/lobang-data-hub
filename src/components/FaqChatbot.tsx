import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const suggestedQuestions = [
  'What features are available in Singapore?',
  'How do I build AI apps on Databricks?',
  'What free training is available?',
  'What are the options for SG agencies?',
  'Which models are in ap-southeast-1?',
];

// Fallback keyword matcher for when API is unavailable
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

export default function FaqChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! 👋 I'm the Lobang Bot — your AI assistant for Databricks in Singapore. Ask me anything about features, availability, training, or resources!" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', text: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Send last 10 messages for context (keep it light)
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
      // Fallback to keyword matching if API fails
      const answer = fallbackAnswer(text);
      setMessages((prev) => [...prev, { role: 'bot', text: answer }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[400px] max-h-[560px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: '#0f1318',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ background: 'linear-gradient(135deg, #FF3621, #e02e1b)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-[14px]">Lobang Bot</div>
                  <div className="text-white/70 text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AI-powered assistant
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1 cursor-pointer bg-transparent border-none">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[300px] max-h-[380px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-[#FF3621]/20 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={12} className="text-[#FF3621]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[#FF3621] text-white rounded-br-sm'
                        : 'bg-white/[0.06] text-white/85 rounded-bl-sm'
                    }`}
                  >
                    {msg.text.split(/(\*\*.*?\*\*)/).map((part, j) =>
                      part.startsWith('**') && part.endsWith('**') ? (
                        <strong key={j} className="font-semibold text-white">{part.slice(2, -2)}</strong>
                      ) : (
                        <span key={j}>{part}</span>
                      )
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                      <User size={12} className="text-white/60" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#FF3621]/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={12} className="text-[#FF3621]" />
                  </div>
                  <div className="bg-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested questions */}
              {messages.length === 1 && !isTyping && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[11px] px-3 py-1.5 rounded-full text-white/60 hover:text-white hover:bg-[#FF3621]/10 hover:border-[#FF3621]/30 transition-all cursor-pointer bg-transparent"
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Databricks in SG..."
                  disabled={isTyping}
                  className="flex-1 bg-white/[0.06] text-white text-[13px] px-4 py-2.5 rounded-xl border-none outline-none placeholder:text-white/25 focus:bg-white/[0.08] transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-9 h-9 rounded-xl bg-[#FF3621] flex items-center justify-center text-white shrink-0 hover:bg-[#e02e1b] transition-colors disabled:opacity-30 disabled:hover:bg-[#FF3621] cursor-pointer border-none"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 cursor-pointer border-none"
        style={{ background: '#FF3621', boxShadow: '0 4px 20px rgba(255,54,33,0.35)' }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
