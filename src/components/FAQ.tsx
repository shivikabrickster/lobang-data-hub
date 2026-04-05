import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { faq } from '../data/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = faq.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" className="relative z-10 py-28 bg-db-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-db-red text-[13px] font-semibold tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-db-dark tracking-tight">
            Common Questions
          </h2>
          <p className="text-db-gray-300 mt-4 text-[15px] leading-relaxed">
            Quick answers for government agencies getting started.
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-db-gray-300" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIndex(null); }}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-db-gray-200 text-[14px] focus:outline-none focus:border-db-red/30 focus:ring-2 focus:ring-db-red/5 transition-all bg-white placeholder:text-db-gray-300"
          />
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {filtered.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className={`rounded-xl border transition-all ${
                  isOpen
                    ? 'border-db-gray-200 bg-white shadow-sm'
                    : 'border-transparent bg-white hover:bg-db-gray-50/50'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-db-dark text-[14px] pr-4 leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-db-gray-300 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-db-red' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-[13px] text-db-gray-600 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-db-gray-300 py-12 text-sm">
            No matching questions found.
          </p>
        )}
      </div>
    </section>
  );
}
