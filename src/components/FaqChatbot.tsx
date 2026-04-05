import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const faqs: { keywords: string[]; question: string; answer: string }[] = [
  {
    keywords: ['lakehouse', 'platform', 'what is', 'databricks'],
    question: 'What is the Databricks Lakehouse Platform?',
    answer: 'The Databricks Lakehouse Platform unifies data engineering, data science, machine learning, and analytics on a single platform. It combines the best of data warehouses and data lakes — giving you the reliability of a warehouse with the flexibility of a lake. For SG Gov agencies, it runs on both AWS (ap-southeast-1) and Azure (Southeast Asia) regions.',
  },
  {
    keywords: ['unity catalog', 'governance', 'catalog'],
    question: 'What is Unity Catalog and why should my agency use it?',
    answer: 'Unity Catalog is Databricks\' unified governance solution for all data and AI assets. It provides centralised access control, auditing, lineage tracking, and data discovery across all your workspaces. For government agencies, it helps meet compliance requirements with fine-grained permissions and full audit trails.',
  },
  {
    keywords: ['lakeflow', 'connect', 'ingestion', 'cdc', 'connector'],
    question: 'What is Lakeflow Connect?',
    answer: 'Lakeflow Connect is Databricks\' managed data ingestion service. It provides native connectors for databases (SQL Server, PostgreSQL, MySQL, Oracle), SaaS apps (Salesforce, ServiceNow), and supports CDC (Change Data Capture) for real-time replication. No infrastructure to manage — just configure and go.',
  },
  {
    keywords: ['ai', 'build', 'application', 'app', 'apps', 'genai', 'gen ai'],
    question: 'How do I build AI applications on Databricks?',
    answer: 'Databricks offers multiple paths:\n\n• **Databricks Apps** — Deploy full-stack web apps (Streamlit, Dash, FastAPI, React) directly on the platform\n• **Model Serving** — Host foundation models and custom ML models as REST APIs\n• **AI Dev Kit** — MCP server + IDE skills for AI-assisted development\n• **Agent Bricks** — Build compound AI systems with Knowledge Assistants and Genie Spaces',
  },
  {
    keywords: ['ai dev kit', 'mcp', 'ide', 'dev kit'],
    question: 'What is the AI Dev Kit?',
    answer: 'The Databricks AI Dev Kit is an open-source MCP (Model Context Protocol) server that brings Databricks capabilities directly into your IDE. It includes 20+ skills covering Jobs, Pipelines, Dashboards, Unity Catalog, and more. Works with Claude Code, VS Code, and other MCP-compatible tools. Get started: github.com/databricks-solutions/ai-dev-kit',
  },
  {
    keywords: ['singapore', 'region', 'sg', 'cloud', 'available'],
    question: 'Is Databricks available in Singapore?',
    answer: 'Yes! Databricks is available in two Singapore cloud regions:\n\n• **AWS** — ap-southeast-1 (Singapore)\n• **Azure** — Southeast Asia (Singapore)\n\nBoth regions support all Databricks features including Unity Catalog, Serverless, Model Serving, and Databricks Apps. Data residency stays within Singapore.',
  },
  {
    keywords: ['free', 'training', 'course', 'learn', 'certification', 'cert'],
    question: 'What free training is available?',
    answer: 'Databricks Academy offers several free courses:\n\n• **Generative AI Fundamentals** — LLMs, RAG, prompt engineering (includes free certification)\n• **Lakehouse Fundamentals** — Architecture, Delta Lake, Unity Catalog (~2 hrs)\n• **Data Engineering with Databricks** — ETL, pipelines, orchestration\n• **ML with Databricks** — Feature engineering, MLflow, model serving\n• **SQL for Data Analytics** — Dashboards using Databricks SQL\n• **Platform Administration** — Workspace setup, user management\n\nAll free at databricks.com/learn/training/home',
  },
  {
    keywords: ['on-premises', 'on premise', 'connect', 'database', 'hybrid'],
    question: 'How do I connect to on-premises databases?',
    answer: 'You can connect to on-premises databases using:\n\n• **Lakeflow Connect** — Managed CDC connectors for SQL Server, PostgreSQL, MySQL, Oracle\n• **Databricks Connect** — Run Spark code from your IDE against a remote cluster\n• **Partner Connect** — Pre-built integrations with Fivetran, Airbyte, etc.\n• **VPN/PrivateLink** — Secure network connectivity to your on-prem environment\n\nFor SG Gov agencies, we recommend Lakeflow Connect with VPN for secure, managed ingestion.',
  },
  {
    keywords: ['apps', 'databricks apps', 'deploy', 'web app', 'streamlit', 'dash'],
    question: 'What are Databricks Apps?',
    answer: 'Databricks Apps lets you build and deploy full-stack web applications directly on Databricks with built-in auth, service principals, and Unity Catalog integration. Supported frameworks:\n\n• **Streamlit** — Python dashboards\n• **Dash** — Interactive analytics\n• **Gradio** — ML model demos\n• **FastAPI + React** — Full-stack apps\n\nApps run as containers with automatic OAuth — no infrastructure to manage. Check out the Apps Cookbook: apps-cookbook.dev/resources/',
  },
  {
    keywords: ['compliance', 'security', 'certification', 'iso', 'soc', 'gdpr'],
    question: 'What compliance certifications does Databricks have?',
    answer: 'Databricks holds major compliance certifications:\n\n• **SOC 2 Type II** — Security, availability, confidentiality\n• **ISO 27001** — Information security management\n• **ISO 27017 & 27018** — Cloud security & privacy\n• **HIPAA** — Healthcare data protection\n• **CSA STAR** — Cloud security\n• **GDPR** compliant\n\nFor SG Gov agencies, data can be kept within Singapore cloud regions to meet local data residency requirements.',
  },
  {
    keywords: ['cost', 'pricing', 'free', 'edition', 'trial', 'price'],
    question: 'How much does Databricks cost?',
    answer: 'Databricks offers flexible pricing:\n\n• **Free Edition** — 2 users, community support, great for learning and prototyping (databricks.com/learn/free-edition)\n• **Pay-as-you-go** — DBU-based pricing, no commitments\n• **Committed use** — Discounts for annual commitments\n\nFor SG Gov agencies, contact your Databricks account team for government pricing and procurement options.',
  },
  {
    keywords: ['pipeline', 'sdp', 'dlt', 'etl', 'declarative'],
    question: 'What are Spark Declarative Pipelines?',
    answer: 'Spark Declarative Pipelines (formerly DLT) is Databricks\' SQL-first pipeline framework. Key features:\n\n• **CREATE FLOW** — Explicit streaming transformations\n• **AUTO CDC** — Automatic change data capture with SCD Type 1 & 2\n• **Data Quality** — Built-in expectations/constraints with ON VIOLATION actions\n• **Auto-scaling** — Serverless or classic compute\n• **Full lineage** — Visual DAG in the pipeline UI\n\nWrite SQL, get production-grade ETL pipelines.',
  },
];

const suggestedQuestions = [
  'What is the Lakehouse Platform?',
  'Is Databricks available in Singapore?',
  'What free training is available?',
  'How do I build AI apps?',
  'What are Databricks Apps?',
];

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  let bestMatch: typeof faqs[0] | null = null;
  let bestScore = 0;

  for (const faq of faqs) {
    let score = 0;
    for (const kw of faq.keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.answer;
  }

  return "I don't have a specific answer for that, but here are some resources that might help:\n\n• **Databricks Docs** — docs.databricks.com\n• **Community Forum** — community.databricks.com\n• **Starter Journey** — databricks-solutions.github.io/starter-journey/\n\nTry asking about training, Singapore availability, apps, AI, or pipelines!";
}

export default function FaqChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hi! 👋 I'm the Lobang Bot. Ask me anything about Databricks for SG Gov agencies, or pick a question below!" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(text);
      setMessages((prev) => [...prev, { role: 'bot', text: answer }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[380px] max-h-[520px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: '#0f1318',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ background: '#FF3621' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-[14px]">Lobang Bot</div>
                  <div className="text-white/70 text-[11px]">Databricks FAQ Assistant</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[280px] max-h-[340px] scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
                </div>
              ))}

              {/* Typing indicator */}
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

              {/* Suggested questions — show only at start */}
              {messages.length === 1 && !isTyping && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[11px] px-3 py-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
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
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-white/[0.06] text-white text-[13px] px-4 py-2.5 rounded-xl border-none outline-none placeholder:text-white/25 focus:bg-white/[0.08] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl bg-[#FF3621] flex items-center justify-center text-white shrink-0 hover:bg-[#e02e1b] transition-colors disabled:opacity-30 disabled:hover:bg-[#FF3621]"
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        style={{
          background: '#FF3621',
          boxShadow: '0 4px 20px rgba(255,54,33,0.35)',
        }}
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
