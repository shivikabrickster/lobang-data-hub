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

function StatusBadge({ status }: { status: AvailabilityStatus }) {
  const config: Record<AvailabilityStatus, { label: string; bg: string; text: string; dot: string }> = {
    yes: { label: 'Yes', bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400' },
    no: { label: 'No', bg: 'bg-red-500/15', text: 'text-red-400', dot: 'bg-red-400' },
    tbc: { label: 'TBC', bg: 'bg-amber-500/15', text: 'text-amber-400', dot: 'bg-amber-400' },
    na: { label: 'N/A', bg: 'bg-white/5', text: 'text-white/40', dot: 'bg-white/30' },
    depends: { label: 'Depends', bg: 'bg-amber-500/15', text: 'text-amber-400', dot: 'bg-amber-400' },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${c.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      <span className={`${c.text} font-semibold text-[11px]`}>{c.label}</span>
    </span>
  );
}

function isStale(dateStr: string): boolean {
  const diff = (new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24);
  return diff > 30;
}

const tabs = [
  { id: 'features', label: 'Feature Checker', icon: '🔍' },
  { id: 'admin', label: 'Admin Settings', icon: '⚙️' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
  { id: 'options', label: 'SG Options', icon: '🇸🇬' },
];

export default function SgFeaturesView({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('features');
  const [cloud, setCloud] = useState<CloudProvider>('aws');
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showModels, setShowModels] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const features = featureAvailability[cloud];
  const models = modelAvailability[cloud];
  const allNames = features.map((f) => f.feature);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setSelectedFeatures(new Set()); setShowModels(false); }, [cloud]);

  const filtered = selectedFeatures.size === 0 ? features : features.filter((f) => selectedFeatures.has(f.feature));

  function toggle(name: string) {
    setSelectedFeatures((prev) => { const n = new Set(prev); n.has(name) ? n.delete(name) : n.add(name); return n; });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-5 max-w-[960px] w-full"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white/60 hover:text-white bg-transparent border border-white/10 hover:border-white/20 cursor-pointer transition-all duration-200">
          <span className="text-lg leading-none">&larr;</span> Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🇸🇬</span>
          <h2 className="text-[20px] font-bold text-white">Agentic & ML Features in Singapore</h2>
        </div>
      </div>

      {isStale(LAST_UPDATED) && (
        <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[12px]">
          Data may be outdated (last updated {LAST_UPDATED}). <a href="https://docs.databricks.com/aws/en/resources/designated-services" target="_blank" rel="noopener noreferrer" className="underline">Verify with official docs</a>.
        </div>
      )}

      {/* Tab Bar */}
      <div className="flex gap-1 p-1 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold cursor-pointer transition-all duration-200 border-none ${
              activeTab === t.id
                ? 'bg-[#FF3621] text-white shadow-lg shadow-[#FF3621]/20'
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
            }`}
          >
            <span className="text-[14px]">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
        <AnimatePresence mode="wait">

          {/* ═══ TAB 1: Feature Checker ═══ */}
          {activeTab === 'features' && (
            <motion.div key="features" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-5">

              {/* Controls row */}
              <div className="flex flex-wrap gap-3 items-center">
                <select value={cloud} onChange={(e) => setCloud(e.target.value as CloudProvider)}
                  className="bg-white/5 border border-white/10 text-white text-[13px] px-3 py-2 rounded-xl cursor-pointer focus:outline-none focus:border-[#FF3621]/50">
                  <option value="aws">☁️ AWS</option>
                  <option value="azure">🔷 Azure</option>
                  <option value="gcp">🌐 GCP</option>
                </select>

                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-[13px] px-3 py-2 rounded-xl cursor-pointer hover:border-white/20 transition-colors">
                    {selectedFeatures.size === 0 ? 'All features' : `${selectedFeatures.size} selected`}
                    <span className="text-[10px]">▾</span>
                  </button>
                  {showDropdown && (
                    <div className="absolute top-full mt-1 left-0 w-[320px] max-h-[300px] overflow-y-auto bg-[#14161e] border border-white/10 rounded-xl shadow-2xl z-30 py-1">
                      <label className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 cursor-pointer border-b border-white/10">
                        <input type="checkbox" checked={selectedFeatures.size === allNames.length}
                          onChange={() => setSelectedFeatures(selectedFeatures.size === allNames.length ? new Set() : new Set(allNames))}
                          className="accent-[#FF3621]" />
                        <span className="text-[12px] text-white font-bold">Select All</span>
                      </label>
                      {allNames.map((name) => (
                        <label key={name} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 cursor-pointer">
                          <input type="checkbox" checked={selectedFeatures.has(name)} onChange={() => toggle(name)} className="accent-[#FF3621]" />
                          <span className="text-[12px] text-white/80">{name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {models.length > 0 && (
                  <button onClick={() => setShowModels(!showModels)}
                    className={`text-[12px] px-3 py-2 rounded-xl cursor-pointer border transition-all duration-200 ${showModels ? 'bg-[#FF3621]/10 border-[#FF3621]/30 text-[#FF3621]' : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80'}`}>
                    {showModels ? '✕ Hide Models' : '📋 Show Models'}
                  </button>
                )}
              </div>

              {/* Summary stats */}
              {features.length > 0 && (
                <div className="flex gap-3">
                  {[
                    { label: 'Service in SG', count: filtered.filter(f => f.serviceInSg === 'yes').length, total: filtered.length },
                    { label: 'Model in SG', count: filtered.filter(f => f.modelInSg === 'yes').length, total: filtered.filter(f => f.modelInSg !== 'na').length },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex flex-col flex-1">
                        <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">{s.label}</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-[22px] font-bold text-white">{s.count}</span>
                          <span className="text-[13px] text-white/25">/ {s.total}</span>
                        </div>
                      </div>
                      <div className="w-16 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${s.count === s.total ? 'bg-emerald-400' : s.count > s.total / 2 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${s.total > 0 ? (s.count / s.total) * 100 : 0}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Feature tables by category */}
              {features.length === 0 ? (
                <div className="text-center py-16 text-white/30 text-[14px] rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  Data coming soon for {cloud.toUpperCase()}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {(['agentic', 'ml'] as const).map((cat) => {
                    const rows = filtered.filter((f) => f.category === cat);
                    if (rows.length === 0) return null;
                    return (
                      <div key={cat}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#FF3621]">
                            {cat === 'agentic' ? 'Agentic AI' : 'ML & Platform'}
                          </span>
                          <span className="text-[11px] text-white/20">{rows.length}</span>
                          <div className="flex-1 h-px bg-white/6" />
                        </div>
                        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          {/* Column headers */}
                          <div className="flex items-center px-5 py-2.5" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="w-[38%]"><span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Feature</span></div>
                            <div className="w-[14%] text-center"><span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Service in SG 🇸🇬</span></div>
                            <div className="w-[14%] text-center"><span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Model in SG 🇸🇬</span></div>
                            <div className="w-[34%] pl-3"><span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Comments</span></div>
                          </div>
                          {rows.map((f, i) => (
                            <div key={f.feature}
                              className="flex items-center px-5 py-3 hover:bg-white/[0.02] transition-colors group"
                              style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : undefined }}>
                              <div className="w-[38%] pr-3">
                                <span className="text-[12px] text-white/90 font-medium">{f.feature}</span>
                              </div>
                              <div className="w-[14%] flex justify-center"><StatusBadge status={f.serviceInSg} /></div>
                              <div className="w-[14%] flex justify-center"><StatusBadge status={f.modelInSg} /></div>
                              <div className="w-[34%] pl-3 flex items-center gap-1">
                                {f.comments && <span className="text-[11px] text-white/70">{f.comments}</span>}
                                {f.source && <a href={f.source} target="_blank" rel="noopener noreferrer" className="text-[#FF3621]/40 hover:text-[#FF3621] text-[10px] no-underline shrink-0">↗</a>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Model table */}
              <AnimatePresence>
                {showModels && models.length > 0 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#FF3621]">Model Availability</span>
                      <span className="text-[11px] text-white/20">{models.length}</span>
                      <div className="flex-1 h-px bg-white/6" />
                    </div>
                    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {models.map((m, i) => (
                        <div key={m.model} className="flex items-center px-5 py-2.5 hover:bg-white/[0.02]"
                          style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : undefined }}>
                          <div className="w-[40%]"><span className="text-[12px] text-white/90 font-medium">{m.model}</span></div>
                          <div className="w-[15%] flex justify-center">
                            <StatusBadge status={m.availableInSg ? 'yes' : 'no'} />
                          </div>
                          <div className="w-[45%] pl-3"><span className="text-[11px] text-white/70">{m.comments}</span></div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-2 text-[11px] text-white/30 pt-1">
                <span>Last updated: {LAST_UPDATED}</span>
                <span className="text-white/15">·</span>
                <a href="https://docs.databricks.com/aws/en/resources/designated-services" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 underline">Verify with official docs</a>
              </div>
            </motion.div>
          )}

          {/* ═══ TAB 2: Genie Admin Settings ═══ */}
          {activeTab === 'admin' && (
            <motion.div key="admin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-5">
              <div className="px-4 py-3 rounded-xl text-[12px] text-white/50 leading-relaxed" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {genieAdminNote}
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-[25%]"><span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Partner-Powered AI</span><br/><span className="text-[9px] text-white/25">(workspace admin)</span></div>
                  <div className="w-[25%]"><span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Cross-Geo</span><br/><span className="text-[9px] text-white/25">(account admin)</span></div>
                  <div className="w-[25%] text-center"><span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Chat</span><br/><span className="text-[9px] text-white/25">(model in SG 🇸🇬)</span></div>
                  <div className="w-[25%] text-center"><span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Agent</span><br/><span className="text-[9px] text-white/25">(model in JP 🇯🇵)</span></div>
                </div>
                {genieAdminSettings.map((row, i) => (
                  <div key={i} className="flex items-center px-5 py-4" style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : undefined }}>
                    <div className="w-[25%]"><StatusBadge status={row.partnerPowered === 'Enabled' ? 'yes' : 'no'} /></div>
                    <div className="w-[25%]"><StatusBadge status={row.crossGeo === 'Enabled' ? 'yes' : 'no'} /></div>
                    <div className="w-[25%] flex flex-col items-center gap-1">
                      <span className={`text-[11px] font-semibold ${row.chatGenie === 'ON' ? 'text-emerald-400' : 'text-red-400'}`}>Genie: {row.chatGenie}</span>
                      <span className={`text-[11px] font-semibold ${row.chatGenieCode === 'ON' ? 'text-emerald-400' : 'text-red-400'}`}>Code: {row.chatGenieCode}</span>
                    </div>
                    <div className="w-[25%] flex flex-col items-center gap-1">
                      <span className={`text-[11px] font-semibold ${row.agentGenie === 'ON' ? 'text-emerald-400' : 'text-red-400'}`}>Genie: {row.agentGenie}</span>
                      <span className={`text-[11px] font-semibold ${row.agentGenieCode === 'ON' ? 'text-emerald-400' : 'text-red-400'}`}>Code: {row.agentGenieCode}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══ TAB 3: FAQ ═══ */}
          {activeTab === 'faq' && (
            <motion.div key="faq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-5">
              {(['general', 'genie-code'] as const).map((cat) => (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#FF3621]">
                      {cat === 'general' ? 'General' : 'Genie Code'}
                    </span>
                    <div className="flex-1 h-px bg-white/6" />
                  </div>
                  <div className="flex flex-col gap-2">
                    {faqItems.filter((f) => f.category === cat).map((faq) => {
                      const idx = faqItems.indexOf(faq);
                      return (
                        <div key={idx} className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <button onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                            className="w-full flex items-center gap-3 px-5 py-3.5 text-left cursor-pointer bg-transparent border-none transition-colors hover:bg-white/[0.02]">
                            <motion.span animate={{ rotate: expandedFaq === idx ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-[#FF3621]/50 text-[12px] shrink-0">▾</motion.span>
                            <span className="text-[13px] text-white/90 font-medium">{faq.question}</span>
                          </button>
                          <AnimatePresence>
                            {expandedFaq === idx && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                <div className="px-5 pb-4 pt-0 ml-7 text-[12px] text-white/60 leading-[1.7]">{faq.answer}</div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ═══ TAB 4: Options for SG Agencies ═══ */}
          {activeTab === 'options' && (
            <motion.div key="options" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-4">
              {sgAgencyOptions.map((opt, i) => (
                <motion.div key={opt.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="rounded-2xl px-6 py-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-bold text-white shrink-0" style={{ background: '#FF3621' }}>{opt.label}</span>
                    <h3 className="text-[15px] font-bold text-white">{opt.title}</h3>
                  </div>
                  <p className="text-[12px] text-white/55 leading-[1.7] ml-[52px]">{opt.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
