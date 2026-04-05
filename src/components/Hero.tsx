import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fallbackItems = [
  'Lakeflow Connect — SQL Server Connector Now GA',
  'Databricks Apps — Now Generally Available',
  'AI/BI Dashboards — External Embedding SDK',
  'Spark Declarative Pipelines — CREATE FLOW & AUTO CDC',
  'Unity Catalog — Metric Views (Preview)',
  'Multi-Agent Supervisor — Compound AI Systems',
  'Lakebase — Managed PostgreSQL on Databricks',
  'Vector Search — Managed Embeddings & Retrieval',
];

function useTickerItems() {
  const [items, setItems] = useState<string[]>(fallbackItems);

  useEffect(() => {
    const url = 'https://api.rss2json.com/v1/api.json?rss_url=' +
      encodeURIComponent('https://docs.databricks.com/en/feed.xml');

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok' && data.items?.length > 0) {
          const titles = data.items
            .slice(0, 15)
            .map((item: { title: string }) => item.title)
            .filter(Boolean);
          if (titles.length > 0) setItems(titles);
        }
      })
      .catch(() => {
        // keep fallback items
      });
  }, []);

  return items;
}

const sections = [
  {
    title: 'Get Started',
    tiles: [
      { label: 'Starter Journey', emoji: '🗺️', href: 'https://databricks-solutions.github.io/starter-journey/' },
      { label: 'Free Edition', emoji: '⚡', href: 'https://www.databricks.com/learn/free-edition' },
      { label: 'Trainings', emoji: '🎓', href: 'https://www.databricks.com/learn/training/home' },
    ],
  },
  {
    title: 'Build',
    tiles: [
      { label: 'AI Dev Kit', emoji: '🤖', href: 'https://github.com/databricks-solutions/ai-dev-kit', modal: 'ai-dev-kit' },
      { label: 'Apps Cookbook', emoji: '👨‍🍳', href: 'https://apps-cookbook.dev/resources/' },
      { label: 'Cheatsheet', emoji: '📋', href: 'https://databricks-solutions.github.io/starter-journey/pdfs/Databricks-Cheatsheet-2026-Ready.pdf' },
      { label: 'Genie', emoji: '🧞', href: '#genie', modal: 'genie' },
      { label: 'Genie Code', emoji: '👨‍💻', image: '/icons/genie-code.png', href: '#genie-code', modal: 'genie-code' },
    ],
  },
  {
    title: 'Explore',
    tiles: [
      { label: 'Demo Centre', emoji: '🎬', href: 'https://www.databricks.com/resources/demos' },
      { label: 'Release Hub', emoji: '🚀', href: 'https://databricksreleasehub.com/timeline' },
      { label: 'NextGen Lakehouse', emoji: '🏠', href: 'https://www.nextgenlakehouse.com/' },
      { label: 'Community', emoji: '💬', href: 'https://community.databricks.com/tmcxu86974/' },
    ],
  },
  {
    title: 'Cloud Provider',
    tiles: [
      { label: 'AWS', emoji: '☁️', image: '/icons/aws.svg', href: '#aws', modal: 'aws' },
      { label: 'Azure', emoji: '🔷', image: '/icons/azure.svg', href: '#azure', modal: 'azure' },
    ],
  },
];

// Parallax stars
function generateStars(count: number) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 2000,
    y: Math.random() * 2000,
  }));
}
const stars1 = generateStars(50);
const stars2 = generateStars(100);
const stars3 = generateStars(80);

function StarLayer({ stars, size, duration, opacity }: { stars: { x: number; y: number }[]; size: number; duration: number; opacity: number }) {
  const shadow = stars.map(s => `${s.x}px ${s.y}px #FFF`).join(', ');
  return (
    <>
      <div className="absolute" style={{ width: `${size}px`, height: `${size}px`, background: 'transparent', boxShadow: shadow, animation: `starScroll ${duration}s linear infinite`, opacity }} />
      <div className="absolute" style={{ width: `${size}px`, height: `${size}px`, top: '2000px', background: 'transparent', boxShadow: shadow, animation: `starScroll ${duration}s linear infinite`, opacity }} />
    </>
  );
}

type Tile = { label: string; emoji: string; image?: string; href: string; modal?: string };

const genieResources = [
  { title: 'Databricks Genie Explained', href: 'https://www.youtube.com/watch?v=cg6OeWTtqPA', source: 'YouTube', icon: '▶️' },
  { title: 'Genie–Teams Integration (SSO & Auto-Generated)', href: 'https://linkedin.com/pulse/databricks-genie-teams-integration-sso-auto-generated-modarressi-morqc/', source: 'LinkedIn', icon: '💼' },
  { title: 'Embedding Genie in Power BI', href: 'https://medium.com/@ajit.kalura/embedding-databricks-genie-in-powerbi-e8b67bea7774', source: 'Medium', icon: '📝' },
  { title: 'How to Build Production-Ready Genie Spaces', href: 'https://www.databricks.com/blog/how-build-production-ready-genie-spaces-and-build-trust-along-way', source: 'Databricks Blog', icon: '🏗️' },
  { title: 'Use Genie Everywhere with Enterprise OAuth', href: 'https://www.databricks.com/blog/access-genie-everywhere', source: 'Databricks Blog', icon: '🔐' },
  { title: 'Genie Best Practices', href: 'https://docs.databricks.com/aws/en/genie/best-practices', source: 'Databricks Docs', icon: '📖' },
  { title: 'From Data to Dialogue: Building High-Performing Genie Spaces', href: 'https://www.databricks.com/blog/data-dialogue-best-practices-guide-building-high-performing-genie-spaces', source: 'Databricks Blog', icon: '💬' },
];

const genieCodeResources = [
  { title: 'Genie Code in Action', href: 'https://www.youtube.com/watch?v=heouBA5U1bE', source: 'YouTube', icon: '▶️' },
  { title: 'Introducing Genie Code', href: 'https://www.databricks.com/blog/introducing-genie-code', source: 'Databricks Blog', icon: '🚀' },
  { title: 'Use Genie Code (Azure Databricks)', href: 'https://learn.microsoft.com/en-us/azure/databricks/genie-code/use-genie-code', source: 'Microsoft Docs', icon: '📖' },
];

const awsResources = [
  { title: 'Databricks on AWS — Getting Started', href: 'https://docs.databricks.com/en/getting-started/index.html', source: 'Databricks Docs', icon: '📖' },
  { title: 'Databricks on AWS with Customer-Managed VPC (BYOVPC)', href: 'https://github.com/databricks-solutions/technical-services-solutions/tree/main/workspace-setup/terraform-examples/aws/aws-byovpc', source: 'GitHub', icon: '🔒' },
  { title: 'Databricks on AWS with Private Link (BYOVPC)', href: 'https://github.com/databricks-solutions/technical-services-solutions/tree/main/workspace-setup/terraform-examples/aws/aws-byovpc-classic-privatelink', source: 'GitHub', icon: '🔗' },
  { title: 'Manual Workspace Deployment', href: 'https://databricks-solutions.github.io/starter-journey/pdfs/AWS-Automated-Configuration-Classic-Workspace-Deployment.pdf', source: 'Starter Journey', icon: '📄' },
  { title: 'User Provisioning - SCIM', href: 'https://databricks-solutions.github.io/starter-journey/docs/infra-setup/add-users/scim', source: 'Starter Journey', icon: '👥' },
];

const azureResources = [
  { title: 'Databricks on Azure — Getting Started', href: 'https://learn.microsoft.com/en-us/azure/databricks/', source: 'Microsoft Docs', icon: '📖' },
  { title: 'Manual Workspace Deployment', href: 'https://databricks-solutions.github.io/starter-journey/docs/infra-setup/create-workspaces/azure/manual', source: 'Starter Journey', icon: '📄' },
  { title: 'Terraform Deployment', href: 'https://databricks-solutions.github.io/starter-journey/docs/infra-setup/create-workspaces/azure/terraform', source: 'Starter Journey', icon: '🏗️' },
  { title: 'Automatic Identity Management', href: 'https://learn.microsoft.com/en-us/azure/databricks/admin/users-groups/automatic-identity-management', source: 'Microsoft Docs', icon: '👤' },
];

const aiDevKitResources = [
  { title: 'AI Dev Kit GitHub Repository', href: 'https://github.com/databricks-solutions/ai-dev-kit', source: 'GitHub', icon: '💻' },
  { title: 'AI Dev Kit Demo', href: 'https://www.youtube.com/watch?v=HFSIKrG8bRg', source: 'YouTube', icon: '▶️' },
];

function ResourceModal({ title, emoji, resources, onClose }: { title: string; emoji: string; resources: typeof genieResources; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(20,22,30,0.98), rgba(12,13,18,0.98))',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{emoji}</span>
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors text-2xl leading-none cursor-pointer bg-transparent border-none"
          >
            &times;
          </button>
        </div>
        <div className="px-6 pb-6 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
          {resources.map((r) => (
            <a
              key={r.href}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl no-underline transition-all duration-150"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,54,33,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,54,33,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              }}
            >
              <span className="text-xl shrink-0">{r.icon}</span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[14px] font-semibold text-white leading-snug">{r.title}</span>
                <span className="text-[11px] text-white/40 font-medium">{r.source}</span>
              </div>
              <span className="ml-auto text-white/20 text-sm shrink-0">↗</span>
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function TileCard({ tile, index, onModalOpen }: { tile: Tile; index: number; onModalOpen?: (modal: string) => void }) {
  const isModal = !!tile.modal;

  const inner = (
    <>
      {tile.image ? (
        <img src={tile.image} alt={tile.label} className="w-10 h-10 object-contain rounded" />
      ) : (
        <span className="text-3xl">{tile.emoji}</span>
      )}
      <span className="text-[13px] font-extrabold text-white transition-colors leading-tight text-center">
        {tile.label}
      </span>
    </>
  );

  const sharedClass = "group flex flex-col items-center justify-center gap-3 w-[150px] h-[120px] rounded-2xl no-underline transition-all duration-200 hover:-translate-y-1 cursor-pointer";
  const sharedStyle = {
    background: 'rgba(255,255,255,0.035)',
    border: '1px solid rgba(255,255,255,0.07)',
  };
  const enter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = 'rgba(255,54,33,0.1)';
    e.currentTarget.style.borderColor = 'rgba(255,54,33,0.3)';
    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,54,33,0.08)';
  };
  const leave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.035)';
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
    e.currentTarget.style.boxShadow = 'none';
  };

  if (isModal) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 + index * 0.04 }}
        className={sharedClass + ' border-none'}
        style={sharedStyle}
        onMouseEnter={enter}
        onMouseLeave={leave}
        onClick={() => onModalOpen?.(tile.modal!)}
      >
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={tile.href}
      target={tile.href.startsWith('http') ? '_blank' : undefined}
      rel={tile.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.25 + index * 0.04 }}
      className={sharedClass}
      style={sharedStyle}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {inner}
    </motion.a>
  );
}

export default function Hero() {
  const newsItems = useTickerItems();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <section id="hero" className="relative overflow-hidden min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' }}>
        <StarLayer stars={stars1} size={1} duration={150} opacity={0.3} />
        <StarLayer stars={stars2} size={2} duration={100} opacity={0.2} />
        <StarLayer stars={stars3} size={3} duration={50} opacity={0.1} />
      </div>
      <style>{`
        @keyframes starScroll { from { transform: translateY(0); } to { transform: translateY(-2000px); } }
        @keyframes tickerScroll { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-100%,0,0); } }
        .ticker-track { animation: tickerScroll 150s linear infinite; padding-right: 100%; }
        .ticker-container:hover .ticker-track { animation-play-state: paused !important; }
      `}</style>

      {/* News Ticker — above header, full width */}
      <div className="relative z-10 w-full">
        <div
          className="ticker-container relative flex items-center h-10 overflow-hidden"
          style={{
            background: '#000',
            borderTop: '1px solid #FF3621',
            borderBottom: '1px solid #FF3621',
          }}
        >
          {/* LATEST label */}
          <div
            className="shrink-0 h-full flex items-center px-5 text-[12px] font-bold text-white uppercase tracking-wider z-10"
            style={{ background: '#FF3621', boxShadow: '5px 0 15px rgba(0,0,0,0.5)' }}
          >
            Latest
          </div>
          {/* Scrolling text with edge fade */}
          <div
            className="flex-1 overflow-hidden h-full flex items-center"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 20px, black 95%, transparent)' }}
          >
            <div
              className="inline-block whitespace-nowrap ticker-track"
            >
              {[...newsItems, ...newsItems].map((item, i) => (
                <span key={i} className="inline-block text-[13px] font-medium text-white" style={{ padding: '0 3rem' }}>
                  <span className="text-[#FF3621] mr-2.5">•</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Title + Punchline — centered */}
      <div className="relative z-10 w-full px-6 pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-[clamp(2rem,4.5vw,3rem)] font-bold text-white leading-tight tracking-tight">
            The <span className="text-[#FF3621]">Lobang</span> Data Hub 🇸🇬
          </h1>
          <p className="text-[#71717a] text-[15px] mt-4">
            Don't say bojio! — Your one-stop Databricks resource hub.
          </p>
        </motion.div>
      </div>

      {/* Tile Sections */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="flex flex-col gap-8 max-w-[820px] w-full">
          {sections.map((section, si) => {
            const offset = sections.slice(0, si).reduce((acc, s) => acc + s.tiles.length, 0);
            return (
              <div key={section.title} className="flex flex-col items-center gap-3">
                {si > 0 && <div className="w-full h-px bg-white/10" />}
                <span className="text-[16px] font-extrabold uppercase tracking-[0.15em] text-[#FF3621]">
                  {section.title}
                </span>
                <div className="flex flex-wrap justify-center gap-4">
                  {section.tiles.map((tile, i) => (
                    <TileCard key={tile.label} tile={tile} index={offset + i} onModalOpen={setActiveModal} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'genie' && <ResourceModal title="Genie Resources" emoji="🧞" resources={genieResources} onClose={() => setActiveModal(null)} />}
        {activeModal === 'genie-code' && <ResourceModal title="Genie Code Resources" emoji="👨‍💻" resources={genieCodeResources} onClose={() => setActiveModal(null)} />}
        {activeModal === 'aws' && <ResourceModal title="AWS Resources" emoji="☁️" resources={awsResources} onClose={() => setActiveModal(null)} />}
        {activeModal === 'azure' && <ResourceModal title="Azure Resources" emoji="🔷" resources={azureResources} onClose={() => setActiveModal(null)} />}
        {activeModal === 'ai-dev-kit' && <ResourceModal title="AI Dev Kit Resources" emoji="🤖" resources={aiDevKitResources} onClose={() => setActiveModal(null)} />}
      </AnimatePresence>

    </section>
  );
}
