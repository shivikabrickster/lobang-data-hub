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
      { label: 'Genie', emoji: '🧞', href: '#genie', drilldown: 'genie' },
      { label: 'Genie Code', emoji: '👨‍💻', image: '/icons/genie-code.png', href: '#genie-code', drilldown: 'genie-code' },
    ],
  },
  {
    title: 'Explore',
    tiles: [
      { label: 'Demo Centre', emoji: '🎬', href: 'https://www.databricks.com/resources/demos' },
      { label: 'Release Hub', emoji: '🚀', href: 'https://databricksreleasehub.com/timeline' },
      { label: 'NextGen Lakehouse', emoji: '🏠', href: 'https://www.nextgenlakehouse.com/' },
      { label: 'Community', emoji: '💬', href: 'https://community.databricks.com/tmcxu86974/' },
      { label: 'Cost Monitoring', emoji: '💰', href: '#cost-monitoring', drilldown: 'cost-monitoring' },
    ],
  },
  {
    title: 'Cloud Provider',
    tiles: [
      { label: 'AWS', emoji: '☁️', image: '/icons/aws.svg', href: '#aws', drilldown: 'aws' },
      { label: 'Azure', emoji: '🔷', image: '/icons/azure.svg', href: '#azure', drilldown: 'azure' },
    ],
  },
];

const categoryEmojis: Record<string, string> = {
  'Getting Started': '🚀',
  'Workspace Setup': '🏗️',
  'Security & Identity': '🔐',
  'Learn': '📚',
  'Build & Integrate': '🔧',
  'Security & Access': '🔐',
  'Documentation': '📖',
  'Resources': '📁',
};

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

type Tile = { label: string; emoji: string; image?: string; href: string; modal?: string; drilldown?: string };

const genieResourceGroups = [
  {
    category: 'Learn',
    items: [
      { title: 'Databricks Genie Explained', desc: 'Video walkthrough of Genie capabilities and use cases', href: 'https://www.youtube.com/watch?v=cg6OeWTtqPA', source: 'YouTube' },
      { title: 'Genie Best Practices', desc: 'Official guide for building effective Genie Spaces', href: 'https://docs.databricks.com/aws/en/genie/best-practices', source: 'Databricks Docs' },
      { title: 'From Data to Dialogue', desc: 'Best practices for building high-performing Genie Spaces', href: 'https://www.databricks.com/blog/data-dialogue-best-practices-guide-building-high-performing-genie-spaces', source: 'Databricks Blog' },
    ],
  },
  {
    category: 'Build & Integrate',
    items: [
      { title: 'Build Production-Ready Genie Spaces', desc: 'End-to-end guide to building and trusting Genie Spaces', href: 'https://www.databricks.com/blog/how-build-production-ready-genie-spaces-and-build-trust-along-way', source: 'Databricks Blog' },
      { title: 'Genie–Teams Integration', desc: 'Embed Genie in Microsoft Teams with SSO and auto-generated responses', href: 'https://linkedin.com/pulse/databricks-genie-teams-integration-sso-auto-generated-modarressi-morqc/', source: 'LinkedIn' },
      { title: 'Embedding Genie in Power BI', desc: 'Integrate Genie directly into Power BI dashboards', href: 'https://medium.com/@ajit.kalura/embedding-databricks-genie-in-powerbi-e8b67bea7774', source: 'Medium' },
      { title: 'Genie Workbench', desc: 'Open-source workbench for developing and testing Genie Spaces', href: 'https://github.com/databricks-solutions/databricks-genie-workbench', source: 'GitHub' },
      { title: 'Genie Rails', desc: 'Guardrails and governance framework for Genie Spaces', href: 'https://github.com/databricks-solutions/genierails', source: 'GitHub' },
    ],
  },
  {
    category: 'Security & Access',
    items: [
      { title: 'Use Genie Everywhere with Enterprise OAuth', desc: 'Access Genie from external apps with enterprise-grade authentication', href: 'https://www.databricks.com/blog/access-genie-everywhere', source: 'Databricks Blog' },
    ],
  },
];

const genieCodeResourceGroups = [
  {
    category: 'Learn',
    items: [
      { title: 'Genie Code in Action', desc: 'Video demo of Genie Code capabilities', href: 'https://www.youtube.com/watch?v=heouBA5U1bE', source: 'YouTube' },
      { title: 'Introducing Genie Code', desc: 'Blog post introducing Genie Code and its features', href: 'https://www.databricks.com/blog/introducing-genie-code', source: 'Databricks Blog' },
    ],
  },
  {
    category: 'Documentation',
    items: [
      { title: 'Use Genie Code (Azure Databricks)', desc: 'Official guide for using Genie Code on Azure Databricks', href: 'https://learn.microsoft.com/en-us/azure/databricks/genie-code/use-genie-code', source: 'Microsoft Docs' },
    ],
  },
];

const awsResourceGroups = [
  {
    category: 'Getting Started',
    items: [
      { title: 'Databricks on AWS', desc: 'Official quickstart guide for setting up Databricks on AWS', href: 'https://docs.databricks.com/en/getting-started/index.html', source: 'Databricks Docs' },
    ],
  },
  {
    category: 'Workspace Setup',
    items: [
      { title: 'Customer-Managed VPC (BYOVPC)', desc: 'Terraform templates for deploying with your own VPC', href: 'https://github.com/databricks-solutions/technical-services-solutions/tree/main/workspace-setup/terraform-examples/aws/aws-byovpc', source: 'GitHub' },
      { title: 'Private Link (BYOVPC)', desc: 'Terraform templates with AWS PrivateLink for secure connectivity', href: 'https://github.com/databricks-solutions/technical-services-solutions/tree/main/workspace-setup/terraform-examples/aws/aws-byovpc-classic-privatelink', source: 'GitHub' },
      { title: 'Manual Workspace Deployment', desc: 'Step-by-step guide for classic workspace configuration', href: 'https://databricks-solutions.github.io/starter-journey/pdfs/AWS-Automated-Configuration-Classic-Workspace-Deployment.pdf', source: 'Starter Journey' },
    ],
  },
  {
    category: 'Security & Identity',
    items: [
      { title: 'User Provisioning — SCIM', desc: 'Automate user and group sync from your identity provider', href: 'https://databricks-solutions.github.io/starter-journey/docs/infra-setup/add-users/scim', source: 'Starter Journey' },
      { title: 'Configure SSO', desc: 'Set up single sign-on with SAML 2.0 or OIDC', href: 'https://docs.databricks.com/aws/en/security/auth/single-sign-on/', source: 'Databricks Docs' },
    ],
  },
];

const azureResourceGroups = [
  {
    category: 'Getting Started',
    items: [
      { title: 'Databricks on Azure', desc: 'Official Azure Databricks documentation and quickstart', href: 'https://learn.microsoft.com/en-us/azure/databricks/', source: 'Microsoft Docs' },
    ],
  },
  {
    category: 'Workspace Setup',
    items: [
      { title: 'Manual Workspace Deployment', desc: 'Deploy Azure Databricks workspace via Azure Portal', href: 'https://databricks-solutions.github.io/starter-journey/docs/infra-setup/create-workspaces/azure/manual', source: 'Starter Journey' },
      { title: 'Terraform Deployment', desc: 'Infrastructure-as-code workspace provisioning with Terraform', href: 'https://databricks-solutions.github.io/starter-journey/docs/infra-setup/create-workspaces/azure/terraform', source: 'Starter Journey' },
    ],
  },
  {
    category: 'Security & Identity',
    items: [
      { title: 'Automatic Identity Management', desc: 'Sync users and groups automatically from Entra ID', href: 'https://learn.microsoft.com/en-us/azure/databricks/admin/users-groups/automatic-identity-management', source: 'Microsoft Docs' },
    ],
  },
];

const costMonitoringGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Cloud Infra Costs', desc: 'Monitor and optimize cloud infrastructure costs for Databricks workloads', href: 'https://github.com/databricks-solutions/cloud-infra-costs', source: 'GitHub' },
      { title: 'Unify Databricks and Cloud Costs', desc: 'Get the full picture by unifying Databricks and cloud infrastructure costs', href: 'https://www.databricks.com/blog/getting-full-picture-unifying-databricks-and-cloud-infrastructure-costs', source: 'Databricks Blog' },
    ],
  },
];

const drilldownData: Record<string, { title: string; image: string; groups: typeof awsResourceGroups }> = {
  aws: { title: 'Databricks on AWS', image: '/icons/aws.svg', groups: awsResourceGroups },
  azure: { title: 'Databricks on Azure', image: '/icons/azure.svg', groups: azureResourceGroups },
  genie: { title: 'Genie', image: '', groups: genieResourceGroups },
  'genie-code': { title: 'Genie Code', image: '/icons/genie-code.png', groups: genieCodeResourceGroups },
  'cost-monitoring': { title: 'Cost Monitoring', image: '', groups: costMonitoringGroups },
};

const aiDevKitResources = [
  { title: 'AI Dev Kit GitHub Repository', href: 'https://github.com/databricks-solutions/ai-dev-kit', source: 'GitHub', icon: '💻' },
  { title: 'AI Dev Kit Demo', href: 'https://www.youtube.com/watch?v=HFSIKrG8bRg', source: 'YouTube', icon: '▶️' },
];

function ResourceModal({ title, emoji, resources, onClose }: { title: string; emoji: string; resources: { title: string; href: string; source: string; icon: string }[]; onClose: () => void }) {
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

function TileCard({ tile, index, onModalOpen, onDrilldown }: { tile: Tile; index: number; onModalOpen?: (modal: string) => void; onDrilldown?: (key: string) => void }) {
  const isModal = !!tile.modal;
  const isDrilldown = !!tile.drilldown;

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

  if (isDrilldown) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 + index * 0.04 }}
        className={sharedClass + ' border-none'}
        style={sharedStyle}
        onMouseEnter={enter}
        onMouseLeave={leave}
        onClick={() => onDrilldown?.(tile.drilldown!)}
      >
        {inner}
      </motion.button>
    );
  }

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

function DrilldownView({ data, onBack }: { data: typeof drilldownData['aws']; onBack: () => void }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-6 max-w-[820px] w-full"
    >
      {/* Back button + title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white/60 hover:text-white bg-transparent border border-white/10 hover:border-white/20 cursor-pointer transition-all duration-200"
        >
          <span className="text-lg leading-none">&larr;</span> Back
        </button>
        <div className="flex items-center gap-3">
          <img src={data.image} alt={data.title} className="w-8 h-8 object-contain" />
          <h2 className="text-[22px] font-bold text-white">{data.title}</h2>
        </div>
      </div>

      {/* Category tiles */}
      <div className="flex flex-wrap justify-center gap-4">
        {data.groups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + gi * 0.08 }}
            className="w-full"
          >
            <button
              onClick={() => setExpandedCategory(expandedCategory === group.category ? null : group.category)}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-200 border-none text-left"
              style={{
                background: expandedCategory === group.category ? 'rgba(255,54,33,0.08)' : 'rgba(255,255,255,0.035)',
                border: expandedCategory === group.category ? '1px solid rgba(255,54,33,0.25)' : '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={(e) => {
                if (expandedCategory !== group.category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (expandedCategory !== group.category) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.035)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                }
              }}
            >
              <span className="text-2xl">{categoryEmojis[group.category] || '📁'}</span>
              <div className="flex flex-col gap-0.5 flex-1">
                <span className="text-[15px] font-bold text-white">{group.category}</span>
                <span className="text-[12px] text-white/40">{group.items.length} resource{group.items.length > 1 ? 's' : ''}</span>
              </div>
              <motion.span
                animate={{ rotate: expandedCategory === group.category ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-white/30 text-lg"
              >
                ▾
              </motion.span>
            </button>

            {/* Expanded resource list */}
            <AnimatePresence>
              {expandedCategory === group.category && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1 pt-2 pl-2">
                    {group.items.map((item, ii) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: ii * 0.03 }}
                        className="group flex items-center gap-3 px-4 py-2.5 rounded-lg no-underline transition-all duration-150"
                        style={{ background: 'transparent' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255,54,33,0.06)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <span className="text-[#FF3621] text-[10px] shrink-0">&#9654;</span>
                        <span className="text-[13px] font-medium text-white/90 flex-1">{item.title}</span>
                        <span className="text-[11px] text-white/25 shrink-0">{item.source}</span>
                        <span className="text-white/20 group-hover:text-[#FF3621] text-sm shrink-0 transition-colors">↗</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const newsItems = useTickerItems();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeDrilldown, setActiveDrilldown] = useState<string | null>(null);

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

      {/* Main content area */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {activeDrilldown && drilldownData[activeDrilldown] ? (
            <DrilldownView
              key={activeDrilldown}
              data={drilldownData[activeDrilldown]}
              onBack={() => setActiveDrilldown(null)}
            />
          ) : (
            <motion.div
              key="main-tiles"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col gap-8 max-w-[820px] w-full"
            >
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
                        <TileCard key={tile.label} tile={tile} index={offset + i} onModalOpen={setActiveModal} onDrilldown={setActiveDrilldown} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals (for non-drilldown items) */}
      <AnimatePresence>
        {activeModal === 'ai-dev-kit' && <ResourceModal title="AI Dev Kit Resources" emoji="🤖" resources={aiDevKitResources} onClose={() => setActiveModal(null)} />}
      </AnimatePresence>

    </section>
  );
}
