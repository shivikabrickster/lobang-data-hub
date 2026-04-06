import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  featureAvailability,
  modelAvailability,
  genieAdminSettings,
  genieAdminNote,
  faqItems,
  sgAgencyOptions,
  LAST_UPDATED,
  type CloudProvider,
  type AvailabilityStatus,
} from '../data/sgFeaturesData';

// ── Helpers ──────────────────────────────────────────────

function StatusBadge({ status }: { status: AvailabilityStatus }) {
  const config: Record<AvailabilityStatus, { text: string; color: string }> = {
    yes: { text: '✅ YES', color: 'text-emerald-400' },
    no: { text: '❌ NO', color: 'text-red-400' },
    tbc: { text: '⏳ TBC', color: 'text-amber-400' },
    na: { text: '➖ N/A', color: 'text-white/40' },
    depends: { text: '⚠️ Depends', color: 'text-amber-400' },
  };
  const { text, color } = config[status];
  return <span className={`${color} font-semibold text-[13px]`}>{text}</span>;
}

function isStale(dateStr: string): boolean {
  const updated = new Date(dateStr);
  const now = new Date();
  const diffDays = (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays > 30;
}

const sections = [
  { id: 'features', label: 'Feature Checker' },
  { id: 'admin', label: 'Admin Settings' },
  { id: 'faq', label: 'FAQ' },
  { id: 'options', label: 'SG Options' },
];

// ── Main Component ──────────────────────────────────────

export default function SgFeaturesView({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState('features');
  const [cloud, setCloud] = useState<CloudProvider>('aws');
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [showFeatureDropdown, setShowFeatureDropdown] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showModels, setShowModels] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const features = featureAvailability[cloud];
  const models = modelAvailability[cloud];
  const allFeatureNames = features.map((f) => f.feature);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowFeatureDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Reset selections when cloud changes
  useEffect(() => {
    setSelectedFeatures(new Set());
    setShowModels(false);
  }, [cloud]);

  const filteredFeatures = selectedFeatures.size === 0
    ? features
    : features.filter((f) => selectedFeatures.has(f.feature));

  function toggleFeature(name: string) {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function selectAll() {
    if (selectedFeatures.size === allFeatureNames.length) {
      setSelectedFeatures(new Set());
    } else {
      setSelectedFeatures(new Set(allFeatureNames));
    }
  }

  function scrollTo(id: string) {
    setActiveSection(id);
    const el = document.getElementById(`sg-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-4 max-w-[960px] w-full"
    >
      {/* Back + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white/60 hover:text-white bg-transparent border border-white/10 hover:border-white/20 cursor-pointer transition-all duration-200"
        >
          <span className="text-lg leading-none">&larr;</span> Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🇸🇬</span>
          <h2 className="text-[20px] font-bold text-white">Agentic & ML Features in Singapore</h2>
        </div>
      </div>

      {/* Stale data warning */}
      {isStale(LAST_UPDATED) && (
        <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[12px]">
          Data may be outdated (last updated {LAST_UPDATED}). Please verify with{' '}
          <a href="https://docs.databricks.com/aws/en/resources/designated-services" target="_blank" rel="noopener noreferrer" className="underline">official docs</a>.
        </div>
      )}

      {/* Nav Pills */}
      <div className="flex gap-2 sticky top-0 z-20 py-2" style={{ background: 'rgba(9,10,15,0.9)', backdropFilter: 'blur(8px)' }}>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`px-4 py-2 rounded-full text-[12px] font-bold cursor-pointer transition-all duration-200 border-none ${
              activeSection === s.id
                ? 'bg-[#FF3621] text-white'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="flex flex-col gap-10 overflow-y-auto max-h-[calc(100vh-240px)] pr-2" style={{ scrollBehavior: 'smooth' }}>

        {/* ══════════════════════════════════════════════════════ */}
        {/* SECTION 1: Feature Availability Checker               */}
        {/* ══════════════════════════════════════════════════════ */}
        <div id="sg-features" className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-[#FF3621]">Feature Availability</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Cloud Provider */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-white/50 font-semibold">Cloud:</span>
              <select
                value={cloud}
                onChange={(e) => setCloud(e.target.value as CloudProvider)}
                className="bg-white/5 border border-white/10 text-white text-[13px] px-3 py-1.5 rounded-lg cursor-pointer focus:outline-none focus:border-[#FF3621]/50"
              >
                <option value="aws">AWS</option>
                <option value="azure">Azure</option>
                <option value="gcp">GCP</option>
              </select>
            </div>

            {/* Feature multi-select */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowFeatureDropdown(!showFeatureDropdown)}
                className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-[13px] px-3 py-1.5 rounded-lg cursor-pointer hover:border-white/20 transition-colors"
              >
                {selectedFeatures.size === 0
                  ? 'All features'
                  : `${selectedFeatures.size} selected`}
                <span className="text-[10px]">▾</span>
              </button>
              {showFeatureDropdown && (
                <div className="absolute top-full mt-1 left-0 w-[320px] max-h-[300px] overflow-y-auto bg-[#14161e] border border-white/10 rounded-xl shadow-2xl z-30 py-1">
                  {/* Select All */}
                  <label className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 cursor-pointer border-b border-white/10">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.size === allFeatureNames.length}
                      onChange={selectAll}
                      className="accent-[#FF3621]"
                    />
                    <span className="text-[12px] text-white font-bold">Select All</span>
                  </label>
                  {allFeatureNames.map((name) => (
                    <label key={name} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.has(name)}
                        onChange={() => toggleFeature(name)}
                        className="accent-[#FF3621]"
                      />
                      <span className="text-[12px] text-white/80">{name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Model toggle */}
            {models.length > 0 && (
              <button
                onClick={() => setShowModels(!showModels)}
                className={`text-[12px] px-3 py-1.5 rounded-lg cursor-pointer border transition-all duration-200 ${
                  showModels
                    ? 'bg-[#FF3621]/10 border-[#FF3621]/30 text-[#FF3621]'
                    : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80'
                }`}
              >
                {showModels ? 'Hide Models' : 'Show Models'}
              </button>
            )}
          </div>

          {/* Feature Table */}
          {features.length === 0 ? (
            <div className="text-center py-10 text-white/30 text-[14px]">
              Data coming soon for {cloud.toUpperCase()}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ background: 'rgba(255,54,33,0.08)' }}>
                    <th className="text-left px-4 py-3 text-white/70 font-bold">Feature</th>
                    <th className="text-center px-3 py-3 text-white/70 font-bold whitespace-nowrap">Service in SG 🇸🇬?</th>
                    <th className="text-center px-3 py-3 text-white/70 font-bold whitespace-nowrap">Model in SG 🇸🇬?</th>
                    <th className="text-left px-4 py-3 text-white/70 font-bold">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeatures.map((f, i) => (
                    <tr
                      key={f.feature}
                      className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                      style={i % 2 === 0 ? { background: 'rgba(255,255,255,0.01)' } : {}}
                    >
                      <td className="px-4 py-2.5 text-white font-medium">{f.feature}</td>
                      <td className="px-3 py-2.5 text-center"><StatusBadge status={f.serviceInSg} /></td>
                      <td className="px-3 py-2.5 text-center"><StatusBadge status={f.modelInSg} /></td>
                      <td className="px-4 py-2.5 text-white/40">
                        {f.comments}
                        {f.source && (
                          <a href={f.source} target="_blank" rel="noopener noreferrer" className="ml-1 text-[#FF3621]/60 hover:text-[#FF3621] text-[10px]">[docs]</a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Model Availability Table */}
          <AnimatePresence>
            {showModels && models.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-3 mt-2">
                  <span className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#FF3621]/70">Model Availability in ap-southeast-1</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr style={{ background: 'rgba(255,54,33,0.08)' }}>
                        <th className="text-left px-4 py-3 text-white/70 font-bold">Model</th>
                        <th className="text-center px-3 py-3 text-white/70 font-bold">In SG 🇸🇬?</th>
                        <th className="text-left px-4 py-3 text-white/70 font-bold">Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {models.map((m, i) => (
                        <tr
                          key={m.model}
                          className="border-t border-white/5 hover:bg-white/[0.02]"
                          style={i % 2 === 0 ? { background: 'rgba(255,255,255,0.01)' } : {}}
                        >
                          <td className="px-4 py-2.5 text-white font-medium">{m.model}</td>
                          <td className="px-3 py-2.5 text-center">
                            <span className={m.availableInSg ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                              {m.availableInSg ? '✅ YES' : '❌ NO'}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-white/40">{m.comments}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Last updated */}
          <div className="flex items-center gap-2 text-[11px] text-white/25">
            <span>Last updated: {LAST_UPDATED}</span>
            <span>·</span>
            <a href="https://docs.databricks.com/aws/en/resources/designated-services" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/50 underline">Verify with official docs</a>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════ */}
        {/* SECTION 2: Genie Key Admin Settings                   */}
        {/* ══════════════════════════════════════════════════════ */}
        <div id="sg-admin" className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-[#FF3621]">Genie — Key Admin Settings</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="text-[11px] text-white/40 px-1">{genieAdminNote}</div>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-[12px]">
              <thead>
                <tr style={{ background: 'rgba(255,54,33,0.08)' }}>
                  <th className="text-left px-4 py-3 text-white/70 font-bold">Partner-Powered AI<br/><span className="text-[10px] text-white/40 font-normal">(workspace admin)</span></th>
                  <th className="text-left px-4 py-3 text-white/70 font-bold">Cross-Geo<br/><span className="text-[10px] text-white/40 font-normal">(account admin)</span></th>
                  <th className="text-center px-3 py-3 text-white/70 font-bold">Chat<br/><span className="text-[10px] text-white/40 font-normal">(model in SG 🇸🇬)</span></th>
                  <th className="text-center px-3 py-3 text-white/70 font-bold">Agent<br/><span className="text-[10px] text-white/40 font-normal">(model in Japan 🇯🇵)</span></th>
                </tr>
              </thead>
              <tbody>
                {genieAdminSettings.map((row, i) => (
                  <tr key={i} className="border-t border-white/5" style={i % 2 === 0 ? { background: 'rgba(255,255,255,0.01)' } : {}}>
                    <td className="px-4 py-3">
                      <span className={row.partnerPowered === 'Enabled' ? 'text-emerald-400 font-semibold text-[12px]' : 'text-red-400 font-semibold text-[12px]'}>
                        {row.partnerPowered}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={row.crossGeo === 'Enabled' ? 'text-emerald-400 font-semibold text-[12px]' : 'text-red-400 font-semibold text-[12px]'}>
                        {row.crossGeo}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-[11px] font-medium ${row.chatGenie === 'ON' ? 'text-emerald-400' : 'text-red-400'}`}>Genie: {row.chatGenie}</span>
                        <span className={`text-[11px] font-medium ${row.chatGenieCode === 'ON' ? 'text-emerald-400' : 'text-red-400'}`}>Genie Code: {row.chatGenieCode}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-[11px] font-medium ${row.agentGenie === 'ON' ? 'text-emerald-400' : 'text-red-400'}`}>Genie: {row.agentGenie}</span>
                        <span className={`text-[11px] font-medium ${row.agentGenieCode === 'ON' ? 'text-emerald-400' : 'text-red-400'}`}>Genie Code: {row.agentGenieCode}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════ */}
        {/* SECTION 3: FAQ                                        */}
        {/* ══════════════════════════════════════════════════════ */}
        <div id="sg-faq" className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-[#FF3621]">Frequently Asked Questions</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* General FAQ */}
          <div className="text-[11px] text-white/40 font-bold uppercase tracking-wider px-1 mt-1">General</div>
          {faqItems.filter((f) => f.category === 'general').map((faq, i) => {
            const idx = faqItems.indexOf(faq);
            return (
              <div key={idx} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer bg-transparent border-none transition-colors hover:bg-white/[0.02]"
                >
                  <motion.span
                    animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/30 text-[12px] shrink-0"
                  >
                    ▾
                  </motion.span>
                  <span className="text-[13px] text-white font-medium">{faq.question}</span>
                </button>
                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 ml-7 text-[12px] text-white/50 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Genie Code FAQ */}
          <div className="text-[11px] text-white/40 font-bold uppercase tracking-wider px-1 mt-3">Genie Code</div>
          {faqItems.filter((f) => f.category === 'genie-code').map((faq) => {
            const idx = faqItems.indexOf(faq);
            return (
              <div key={idx} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer bg-transparent border-none transition-colors hover:bg-white/[0.02]"
                >
                  <motion.span
                    animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/30 text-[12px] shrink-0"
                  >
                    ▾
                  </motion.span>
                  <span className="text-[13px] text-white font-medium">{faq.question}</span>
                </button>
                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 ml-7 text-[12px] text-white/50 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════════ */}
        {/* SECTION 4: Options for SG Agencies                    */}
        {/* ══════════════════════════════════════════════════════ */}
        <div id="sg-options" className="flex flex-col gap-4 pb-8">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-[#FF3621]">Options for SG Agencies</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="flex flex-col gap-4">
            {sgAgencyOptions.map((opt) => (
              <motion.div
                key={opt.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl px-5 py-4"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold text-white shrink-0"
                    style={{ background: '#FF3621' }}
                  >
                    {opt.label}
                  </span>
                  <h3 className="text-[14px] font-bold text-white">{opt.title}</h3>
                </div>
                <p className="text-[12px] text-white/45 leading-relaxed ml-11">
                  {opt.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
