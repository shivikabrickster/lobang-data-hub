import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Calendar, ChevronDown } from 'lucide-react';
import { announcements, filterCategories } from '../data/content';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-SG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const badgeColors: Record<string, string> = {
  GA: 'bg-emerald-500/15 text-emerald-400',
  New: 'bg-blue-500/15 text-blue-400',
  Preview: 'bg-amber-500/15 text-amber-400',
};

export default function WhatsNew() {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);

  const filtered =
    filter === 'all'
      ? announcements
      : announcements.filter((a) => a.category === filter);

  const visible = expanded ? filtered : filtered.slice(0, 4);

  return (
    <section id="whats-new" className="relative z-10 py-20" style={{ background: '#0d1117' }}>
      <div className="max-w-[820px] mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[#FF3621] text-[12px] font-semibold tracking-widest uppercase mb-2">
            What's New
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Latest Updates
          </h2>
          <p className="text-[#52525b] text-[14px] mt-2">
            The newest Databricks features and platform announcements.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filterCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setFilter(cat.key); setExpanded(false); }}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                filter === cat.key
                  ? 'bg-[#FF3621] text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
              style={filter !== cat.key ? { border: '1px solid rgba(255,255,255,0.08)' } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {visible.map((a, i) => (
              <motion.a
                key={a.title}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="group rounded-xl p-5 no-underline transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,54,33,0.25)';
                  e.currentTarget.style.background = 'rgba(255,54,33,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-[11px] text-[#52525b]">
                    <Calendar size={10} />
                    {formatDate(a.date)}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColors[a.badge]}`}>
                    {a.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-white/90 text-[14px] mb-1.5 group-hover:text-white transition-colors leading-snug">
                  {a.title}
                </h3>
                <p className="text-[12px] text-[#52525b] leading-relaxed line-clamp-2">{a.summary}</p>
                <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#FF3621] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more <ArrowUpRight size={11} />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show more */}
        {filtered.length > 4 && !expanded && (
          <div className="text-center mt-6">
            <button
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-1 text-[13px] text-white/40 hover:text-white/70 transition-colors"
            >
              Show all {filtered.length} updates <ChevronDown size={14} />
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-[#52525b] py-12 text-[13px]">
            No announcements in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
