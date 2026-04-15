import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


function useTickerItems() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const url = 'https://api.rss2json.com/v1/api.json?rss_url=' +
      encodeURIComponent('https://docs.databricks.com/en/feed.xml');

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok' && data.items?.length > 0) {
          const titles = data.items
            .slice(0, 50)
            .map((item: { title: string }) => item.title)
            .filter(Boolean);
          if (titles.length > 0) setItems(titles);
        }
      })
      .catch(() => {});
  }, []);

  return items;
}

type SidebarItem = { label: string; key?: string; href?: string };
const sidebarNav: { title: string; items: SidebarItem[] }[] = [
  {
    title: 'GET STARTED',
    items: [
      { label: 'Quick Start Guide', key: 'quick-start' },
      { label: 'Trainings & Learning', key: 'learning' },
    ],
  },
  {
    title: 'BUILD',
    items: [
      { label: 'AI & Agents', key: 'ai-agents' },
      { label: 'Data Engineering', key: 'data-engineering' },
      { label: 'Model & Serving', key: 'model-serving' },
      { label: 'Databricks Apps', key: 'databricks-apps' },
      { label: 'Database & Storage', key: 'database-storage' },
    ],
  },
  {
    title: 'SECURITY & GOVERNANCE',
    items: [
      { label: 'Security & Trust', key: 'security' },
      { label: 'Data Exfiltration', key: 'data-exfiltration' },
      { label: 'Governance', key: 'governance' },
    ],
  },
  {
    title: 'EXPLORE',
    items: [
      { label: 'Demo Centre', href: 'https://www.databricks.com/resources/demos' },
      { label: 'Release Hub', key: 'release-hub' },
      { label: 'NextGen Lakehouse', href: 'https://www.nextgenlakehouse.com/' },
      { label: 'Skill Builder', href: 'https://www.youtube.com/@databricksskillbuilder/' },
      { label: 'Community', href: 'https://community.databricks.com/tmcxu86974/' },
    ],
  },
  {
    title: 'MIGRATE',
    items: [
      { label: 'Lakebridge', href: 'https://databrickslabs.github.io/lakebridge/docs/overview/' },
      { label: 'Migrate with LLM', href: 'https://github.com/databricks-solutions/databricks-migrator-with-llm' },
    ],
  },
  {
    title: 'SIZING',
    items: [
      { label: 'Compute & Cluster Sizing', key: 'compute-sizing' },
      { label: 'Pricing & Cost Calculators', key: 'pricing' },
    ],
  },
  {
    title: 'COST & PERFORMANCE',
    items: [
      { label: 'Cost Monitoring', key: 'cost-monitoring' },
      { label: 'Cost Optimization', key: 'cost-optimization' },
      { label: 'Benchmarks', key: 'benchmarks' },
    ],
  },
];

const genieResourceGroups = [
  {
    category: 'Learn',
    items: [
      { title: 'Databricks Genie Explained', desc: 'Video walkthrough of Genie capabilities', icon: '▶️', href: 'https://www.youtube.com/watch?v=cg6OeWTtqPA', source: 'YouTube' },
      { title: 'Genie Best Practices', desc: 'Official guide for effective Genie Spaces', icon: '📖', href: 'https://docs.databricks.com/aws/en/genie/best-practices', source: 'Databricks Docs' },
      { title: 'From Data to Dialogue', desc: 'Building high-performing Genie Spaces', icon: '💬', href: 'https://www.databricks.com/blog/data-dialogue-best-practices-guide-building-high-performing-genie-spaces', source: 'Databricks Blog' },
    ],
  },
  {
    category: 'Build & Integrate',
    items: [
      { title: 'Production-Ready Genie Spaces', desc: 'End-to-end build and trust guide', icon: '🏗️', href: 'https://www.databricks.com/blog/how-build-production-ready-genie-spaces-and-build-trust-along-way', source: 'Databricks Blog' },
      { title: 'Genie–Teams Integration', desc: 'Embed in Teams with SSO', icon: '💼', href: 'https://linkedin.com/pulse/databricks-genie-teams-integration-sso-auto-generated-modarressi-morqc/', source: 'LinkedIn' },
      { title: 'Genie in Power BI', desc: 'Integrate into Power BI dashboards', icon: '📊', href: 'https://medium.com/@ajit.kalura/embedding-databricks-genie-in-powerbi-e8b67bea7774', source: 'Medium' },
      { title: 'Genie Workbench', desc: 'Creating, scoring, and optimizing Genie Spaces', icon: '🔧', href: 'https://github.com/databricks-solutions/databricks-genie-workbench', source: 'GitHub' },
      { title: 'Genie Rails', desc: 'Create and govern Genie Spaces', icon: '🛤️', href: 'https://github.com/databricks-solutions/genierails', source: 'GitHub' },
      { title: 'AI Genie Space Generator (GitHub)', desc: 'Auto-generate Genie Spaces with AI', icon: '✨', href: 'https://github.com/sunnysingh-db/ai-genie-space-generator', source: 'GitHub' },
      { title: 'AI Genie Space Generator (GitLab)', desc: 'Auto-generate Genie Spaces with AI', icon: '✨', href: 'https://gitlab.com/sunny.singh7/ai-genie-space-generator', source: 'GitLab' },
    ],
  },
  {
    category: 'Security & Access',
    items: [
      { title: 'Genie Everywhere with OAuth', desc: 'Enterprise-grade external access', icon: '🔐', href: 'https://www.databricks.com/blog/access-genie-everywhere', source: 'Databricks Blog' },
    ],
  },
];

const genieCodeResourceGroups = [
  {
    category: 'Learn',
    items: [
      { title: 'Genie Code in Action', desc: 'Video demo of capabilities', icon: '▶️', href: 'https://www.youtube.com/watch?v=heouBA5U1bE', source: 'YouTube' },
      { title: 'Introducing Genie Code', desc: 'Features and use cases', icon: '🚀', href: 'https://www.databricks.com/blog/introducing-genie-code', source: 'Databricks Blog' },
    ],
  },
  {
    category: 'Documentation',
    items: [
      { title: 'Use Genie Code (Azure)', desc: 'Official Azure Databricks guide', icon: '📖', href: 'https://learn.microsoft.com/en-us/azure/databricks/genie-code/use-genie-code', source: 'Microsoft Docs' },
    ],
  },
];

const awsResourceGroups = [
  {
    category: 'Getting Started',
    items: [
      { title: 'Databricks on AWS', desc: 'Official quickstart guide', icon: '🚀', href: 'https://docs.databricks.com/en/getting-started/index.html', source: 'Databricks Docs' },
    ],
  },
  {
    category: 'Workspace Setup',
    items: [
      { title: 'Terraform Deployment', desc: 'BYOVPC & PrivateLink Terraform templates', icon: '🏗️', href: '#aws-terraform', source: '', drilldown: 'aws-terraform' },
      { title: 'Manual Deployment', desc: 'Classic workspace configuration', icon: '📄', href: 'https://databricks-solutions.github.io/starter-journey/pdfs/AWS-Automated-Configuration-Classic-Workspace-Deployment.pdf', source: 'Starter Journey' },
    ],
  },
  {
    category: 'Security & Identity',
    items: [
      { title: 'Identity & SSO', desc: 'SCIM provisioning & SSO configuration', icon: '🔐', href: '#aws-identity', source: '', drilldown: 'aws-identity' },
      { title: 'Unity Catalog Storage', desc: 'S3 storage credentials & external locations', icon: '🗄️', href: '#aws-uc-storage', source: '', drilldown: 'aws-uc-storage' },
    ],
  },
];

const azureResourceGroups = [
  {
    category: 'Getting Started',
    items: [
      { title: 'Databricks on Azure', desc: 'Official Azure Databricks docs', icon: '🚀', href: 'https://learn.microsoft.com/en-us/azure/databricks/', source: 'Microsoft Docs' },
    ],
  },
  {
    category: 'Workspace Setup',
    items: [
      { title: 'Manual Deployment', desc: 'Deploy via Azure Portal', icon: '📄', href: 'https://databricks-solutions.github.io/starter-journey/docs/infra-setup/create-workspaces/azure/manual', source: 'Starter Journey' },
      { title: 'Terraform Deployment', desc: 'IaC workspace provisioning guides & examples', icon: '🏗️', href: '#azure-terraform', source: '', drilldown: 'azure-terraform' },
    ],
  },
  {
    category: 'Security & Identity',
    items: [
      { title: 'Automatic Identity Management', desc: 'Sync from Entra ID', icon: '👤', href: 'https://learn.microsoft.com/en-us/azure/databricks/admin/users-groups/automatic-identity-management', source: 'Microsoft Docs' },
      { title: 'Storage Credentials and External Locations', desc: 'Setup walkthrough for Azure', icon: '▶️', href: 'https://www.youtube.com/watch?v=kRfNXFh9T3U', source: 'YouTube' },
    ],
  },
];

const costMonitoringGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Cloud Infra Costs', desc: 'Monitor and optimize cloud costs', icon: '📈', href: 'https://github.com/databricks-solutions/cloud-infra-costs', source: 'GitHub' },
      { title: 'Unify Databricks and Cloud Costs', desc: 'Full picture cost unification', icon: '🔄', href: 'https://www.databricks.com/blog/getting-full-picture-unifying-databricks-and-cloud-infrastructure-costs', source: 'Databricks Blog' },
      { title: 'Platform Observability', desc: 'Observability dashboard for Databricks', icon: '📡', href: 'https://github.com/databricks-solutions/databricks-blogposts/tree/main/2026-02-platform-observability-dashboard', source: 'GitHub' },
    ],
  },
];

const aiDevKitResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'GitHub Repository', desc: 'Source code, docs, and examples', icon: '💻', href: 'https://github.com/databricks-solutions/ai-dev-kit', source: 'GitHub' },
      { title: 'AI Dev Kit Demo', desc: 'Video walkthrough', icon: '▶️', href: 'https://www.youtube.com/watch?v=HFSIKrG8bRg', source: 'YouTube' },
      { title: 'Cursor IDE + Databricks', desc: 'Step-by-step AI coding tutorial', icon: '⌨️', href: 'https://www.youtube.com/watch?v=Ii2LuEJ0gpc', source: 'YouTube' },
      { title: 'Install for Copilot + VS Code', desc: 'Setup guide', icon: '🧩', href: 'https://www.youtube.com/watch?v=8Ehzr8ajzhc', source: 'YouTube' },
      { title: 'Databricks VS Code Extension', desc: 'Extension walkthrough', icon: '🔌', href: 'https://www.youtube.com/watch?v=o4qMWHgT1zM&t=371s', source: 'YouTube' },
      { title: 'Databricks Agent Skills', desc: 'Pre-built skills for AI agents', icon: '🛠️', href: 'https://github.com/databricks/databricks-agent-skills', source: 'GitHub' },
    ],
  },
];

const databricksAppsResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Apps Cookbook', desc: 'Recipes for building Databricks Apps', icon: '👨‍🍳', href: 'https://apps-cookbook.dev/resources/', source: 'Apps Cookbook' },
      { title: 'Databricks Apps + AI Agents Template', desc: 'Agent monitoring demo app', icon: '🤖', href: 'https://github.com/databricks-solutions/agent-monitoring-demo-app', source: 'GitHub' },
      { title: 'Databricks Apps Examples', desc: 'Sample apps and templates', icon: '📦', href: 'https://github.com/databricks-solutions/databricks-apps-examples', source: 'GitHub' },
      { title: 'Interactive Apps with Databricks', desc: 'Build interactive applications', icon: '🖥️', href: 'https://github.com/databricks-solutions/databricks-blogposts/tree/main/2025-04-interactive-apps-with-databricks', source: 'GitHub' },
    ],
  },
];

const agentBricksResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'AgentBricks Utilities', desc: 'Utility tools and helpers', icon: '🧰', href: 'https://github.com/databricks-solutions/agentbricks-utilities/tree/main/utilities', source: 'GitHub' },
      { title: 'How to Build Agents', desc: 'AI agents with conversation memory using Lakebase', icon: '🧠', href: 'https://github.com/databricks-solutions/databricks-blogposts/tree/main/2026-01-how-to-build-ai-agents-with-conversation-memory-using-lakebase', source: 'GitHub' },
      { title: 'Build a Multi-Agent GenAI System', desc: 'Multi-agent orchestration pattern', icon: '🔀', href: 'https://github.com/databricks-solutions/databricks-blogposts/tree/main/2025-11-Multi-Agent-GenAI-System', source: 'GitHub' },
    ],
  },
];

const lakeflowConnectResourceGroups = [
  {
    category: 'Getting Started',
    items: [
      { title: 'Create a Connection', desc: 'Step-by-step tutorial for managed connectors', icon: '🔌', href: 'https://databricks-solutions.github.io/starter-journey/docs/access-your-data/managed-connectors/create-connection#step-by-step-tutorial', source: 'Starter Journey' },
      { title: 'Create an Ingestion Pipeline', desc: 'Set up a managed ingestion pipeline', icon: '📥', href: 'https://databricks-solutions.github.io/starter-journey/docs/access-your-data/managed-connectors/create-ingestion-pipeline/', source: 'Starter Journey' },
      { title: 'YouTube Tutorials', desc: 'Video walkthroughs for Lakeflow Connect', icon: '▶️', href: 'https://databricks-solutions.github.io/starter-journey/docs/access-your-data/managed-connectors/create-ingestion-pipeline/#youtube-tutorials', source: 'Starter Journey' },
    ],
  },
  {
    category: 'Advanced',
    items: [
      { title: 'Query Federation', desc: 'Query external data sources without ingestion', icon: '🔗', href: 'https://databricks-solutions.github.io/starter-journey/docs/access-your-data/managed-connectors/create-connection/query-federation', source: 'Starter Journey' },
      { title: 'Using Terraform', desc: 'Deploy and manage with Terraform', icon: '🏗️', href: 'https://github.com/databricks-solutions/lakeflow-connect-terraform', source: 'GitHub' },
    ],
  },
];

const computeSizingResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Compute Configuration Recommendations', desc: 'Cores, memory, instance type guidance', icon: '🖥️', href: 'https://docs.databricks.com/aws/en/compute/cluster-config-best-practices', source: 'Databricks Docs' },
      { title: 'SQL Warehouse Sizing & Scaling', desc: 'T-shirt sizes, autoscaling, concurrency', icon: '📐', href: 'https://docs.databricks.com/aws/en/compute/sql-warehouse/warehouse-behavior', source: 'Databricks Docs' },
      { title: 'Databricks Apps Compute Sizing', desc: 'CPU/memory config for apps', icon: '📱', href: 'https://docs.databricks.com/aws/en/dev-tools/databricks-apps/compute-size', source: 'Databricks Docs' },
    ],
  },
];

const benchmarksResourceGroups = [
  {
    category: 'SQL Warehousing',
    items: [
      { title: 'TPC-DS Evaluation Guide', desc: 'Run TPC-DS benchmarks on your warehouse (1GB & 1TB datasets)', icon: '📊', href: 'https://docs.databricks.com/aws/en/sql/tpcds-eval', source: 'Databricks Docs' },
      { title: '100TB TPC-DS World Record', desc: 'Official benchmark results', icon: '🥇', href: 'https://www.databricks.com/blog/2021/11/02/databricks-sets-official-data-warehousing-performance-record.html', source: 'Databricks Blog' },
      { title: 'DBSQL 5x Performance Gains', desc: '3-year customer workload improvements', icon: '🚀', href: 'https://www.databricks.com/blog/databricks-sql-accelerates-customer-workloads-5x-just-three-years', source: 'Databricks Blog' },
      { title: '2025 Review: DBSQL Faster for Every Workload', desc: 'Up to 40% faster, no tuning needed', icon: '📈', href: 'https://www.databricks.com/blog/2025-review-databricks-sql-faster-every-workload', source: 'Databricks Blog' },
    ],
  },
  {
    category: 'ETL & Pipelines',
    items: [
      { title: 'ETL 1 Billion Records Under $1', desc: 'DLT cost benchmark', icon: '⚡', href: 'https://www.databricks.com/blog/2023/04/14/how-we-performed-etl-one-billion-records-under-1-delta-live-tables.html', source: 'Databricks Blog' },
      { title: 'Cost-effective ETL with Serverless DLT', desc: '5x better cost-performance, 85% lower latency', icon: '💰', href: 'https://www.databricks.com/blog/cost-effective-incremental-etl-serverless-compute-delta-live-tables-pipelines', source: 'Databricks Blog' },
    ],
  },
];

const costOptimizationResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Cost Management Best Practices', desc: 'Blog guide to managing Databricks costs', icon: '📝', href: 'https://www.databricks.com/blog/best-practices-cost-management-databricks', source: 'Databricks Blog' },
      { title: 'Cost Optimization Best Practices', desc: 'Official docs on cost optimization', icon: '📖', href: 'https://docs.databricks.com/aws/en/lakehouse-architecture/cost-optimization/best-practices', source: 'Databricks Docs' },
    ],
  },
];

const pricingResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Pricing Calculator', desc: 'Instance types and cost calculator', icon: '🧮', href: 'https://www.databricks.com/product/pricing/product-pricing/instance-types', source: 'Databricks' },
      { title: 'Pricing Overview', desc: 'DBU rates by SKU and tier (AWS/Azure/GCP)', icon: '📊', href: 'https://www.databricks.com/product/pricing', source: 'Databricks' },
    ],
  },
];

const releaseHubResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Release Hub Timeline', desc: 'Visual timeline of all Databricks releases', icon: '📅', href: 'https://databricksreleasehub.com/timeline', source: 'Release Hub' },
      { title: 'Release Notes', desc: 'Official Databricks release notes', icon: '📝', href: 'https://docs.databricks.com/aws/en/release-notes/', source: 'Databricks Docs' },
    ],
  },
];

const trainingsResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Training Home', desc: 'All Databricks training courses', icon: '🎓', href: 'https://www.databricks.com/learn/training/home', source: 'Databricks' },
      { title: 'Free Trainings', desc: 'Self-paced free learning paths', icon: '🆓', href: 'https://docs.databricks.com/aws/en/getting-started/free-training', source: 'Databricks Docs' },
    ],
  },
];

const productHelpResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Help Centre', desc: 'Browse knowledge base and support articles', icon: '📚', href: 'https://help.databricks.com/s/', source: 'Databricks' },
      { title: 'Contact Support', desc: 'Open a support ticket', icon: '🎧', href: 'https://docs.databricks.com/aws/en/resources/support', source: 'Databricks Docs' },
      { title: 'Submit Product Feedback', desc: 'Share ideas and feature requests', icon: '💡', href: 'https://docs.databricks.com/aws/en/resources/ideas', source: 'Databricks Docs' },
    ],
  },
];

// ── Grouped Build tiles ──

const aiAgentsResourceGroups = [
  {
    category: 'AI Dev Kit',
    items: [
      ...aiDevKitResourceGroups[0].items,
    ],
  },
  {
    category: 'AgentBricks',
    items: [
      ...agentBricksResourceGroups[0].items,
    ],
  },
  ...genieResourceGroups.map(g => ({ ...g, category: `Genie — ${g.category}` })),
  ...genieCodeResourceGroups.map(g => ({ ...g, category: `Genie Code — ${g.category}` })),
  {
    category: 'AI Playground & Functions',
    items: [
      { title: 'AI Playground', desc: 'Test and compare foundation models', icon: '🧪', href: 'https://docs.databricks.com/aws/en/large-language-models/ai-playground', source: 'Databricks Docs' },
      { title: 'AI Functions', desc: 'SQL functions for AI (ai_query, ai_classify, ai_extract)', icon: '⚡', href: 'https://docs.databricks.com/aws/en/large-language-models/ai-functions', source: 'Databricks Docs' },
    ],
  },
];

const dataEngineeringResourceGroups = [
  {
    category: 'Lakeflow Connect',
    items: [
      ...lakeflowConnectResourceGroups[0].items,
      ...lakeflowConnectResourceGroups[1].items,
    ],
  },
  {
    category: 'Pipelines & Orchestration',
    items: [
      { title: 'Declarative Pipelines (DLT)', desc: 'SQL-first pipeline framework', icon: '📊', href: 'https://docs.databricks.com/aws/en/delta-live-tables/', source: 'Databricks Docs' },
      { title: 'Auto Loader', desc: 'Incremental file ingestion from cloud storage', icon: '📥', href: 'https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/', source: 'Databricks Docs' },
      { title: 'Jobs & Workflows', desc: 'Schedule and orchestrate tasks', icon: '⏱️', href: 'https://docs.databricks.com/aws/en/jobs/', source: 'Databricks Docs' },
      { title: 'Asset Bundles (DABs)', desc: 'CI/CD infrastructure-as-code', icon: '⚙️', href: 'https://docs.databricks.com/en/dev-tools/bundles/index.html', source: 'Databricks Docs' },
    ],
  },
];

const modelServingResourceGroups = [
  {
    category: 'Model Serving',
    items: [
      { title: 'Model Serving Overview', desc: 'Deploy models as REST APIs', icon: '🚀', href: 'https://docs.databricks.com/aws/en/machine-learning/model-serving/', source: 'Databricks Docs' },
      { title: 'Foundation Model APIs', desc: 'Pay-per-token and provisioned throughput', icon: '🧠', href: 'https://docs.databricks.com/aws/en/machine-learning/model-serving/foundation-model-overview', source: 'Databricks Docs' },
      { title: 'Serving Limits & Regions', desc: 'Rate limits and region availability', icon: '📋', href: 'https://docs.databricks.com/aws/en/machine-learning/model-serving/model-serving-limits', source: 'Databricks Docs' },
    ],
  },
  {
    category: 'Search & Retrieval',
    items: [
      { title: 'Vector Search', desc: 'Semantic search and RAG retrieval', icon: '🔍', href: 'https://docs.databricks.com/aws/en/vector-search/', source: 'Databricks Docs' },
      { title: 'MCP Servers', desc: 'Model Context Protocol for agents', icon: '🔌', href: 'https://docs.databricks.com/aws/en/generative-ai/mcp/', source: 'Databricks Docs' },
    ],
  },
  {
    category: 'MLflow & Feature Store',
    items: [
      { title: 'MLflow', desc: 'Experiment tracking, model registry', icon: '📈', href: 'https://docs.databricks.com/aws/en/mlflow/', source: 'Databricks Docs' },
      { title: 'Feature Store', desc: 'Manage and serve ML features', icon: '🗂️', href: 'https://docs.databricks.com/aws/en/machine-learning/feature-store/', source: 'Databricks Docs' },
      { title: 'AutoML', desc: 'Automated model training and tuning', icon: '🤖', href: 'https://docs.databricks.com/aws/en/machine-learning/automl/', source: 'Databricks Docs' },
    ],
  },
];

const databaseStorageResourceGroups = [
  {
    category: 'Databases',
    items: [
      { title: 'Lakebase', desc: 'Managed PostgreSQL for apps and agents', icon: '🗄️', href: 'https://docs.databricks.com/aws/en/oltp', source: 'Databricks Docs' },
    ],
  },
  {
    category: 'Table Formats',
    items: [
      { title: 'Delta Lake', desc: 'ACID transactions, time travel, optimization', icon: '🔺', href: 'https://docs.databricks.com/aws/en/delta/', source: 'Databricks Docs' },
      { title: 'Apache Iceberg', desc: 'Open table format interoperability', icon: '🧊', href: 'https://docs.databricks.com/aws/en/iceberg/', source: 'Databricks Docs' },
    ],
  },
];

const governanceResourceGroups = [
  {
    category: 'Unity Catalog',
    items: [
      { title: 'Unity Catalog', desc: 'Unified governance for data and AI', icon: '📚', href: 'https://docs.databricks.com/aws/en/data-governance/unity-catalog/', source: 'Databricks Docs' },
      { title: 'Data Classification', desc: 'Automated sensitive data tagging', icon: '🏷️', href: 'https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-classification', source: 'Databricks Docs' },
      { title: 'System Tables', desc: 'Audit logs, lineage, billing data', icon: '📊', href: 'https://docs.databricks.com/aws/en/admin/system-tables/', source: 'Databricks Docs' },
    ],
  },
  {
    category: 'Sharing & Collaboration',
    items: [
      { title: 'Delta Sharing', desc: 'Open protocol for secure data sharing', icon: '🤝', href: 'https://docs.databricks.com/aws/en/delta-sharing/', source: 'Databricks Docs' },
      { title: 'Catalog Federation', desc: 'Query external catalogs without copying', icon: '🔗', href: 'https://docs.databricks.com/aws/en/query-federation/catalog-federation', source: 'Databricks Docs' },
      { title: 'Clean Rooms', desc: 'Privacy-safe collaboration on sensitive data', icon: '🔒', href: 'https://docs.databricks.com/aws/en/clean-rooms/', source: 'Databricks Docs' },
      { title: 'Marketplace', desc: 'Discover and share data products', icon: '🏪', href: 'https://www.databricks.com/product/marketplace', source: 'Databricks' },
    ],
  },
];

const dataExfiltrationResourceGroups = [
  {
    category: 'Overview',
    items: [
      { title: 'Unified Approach to Data Exfiltration Protection', desc: 'End-to-end exfiltration prevention strategy on Databricks', icon: '📄', href: 'https://www.databricks.com/blog/unified-approach-data-exfiltration-protection-databricks', source: 'Databricks Blog' },
      { title: 'Security & Trust Genie', desc: 'Natural language security queries over audit logs', icon: '🔍', href: 'https://github.com/andyweaves/security-and-trust-genie', source: 'GitHub' },
    ],
  },
  {
    category: 'Detection & Monitoring',
    items: [
      { title: 'Cybersec Workspace Detection App', desc: '31 security detections incl. data movement via downloads, SQL COPY INTO, session hijacking, privilege escalation', icon: '🛡️', href: 'https://github.com/databricks-solutions/cybersec-workspace-detection-app', source: 'GitHub' },
      { title: 'System Tables Audit Log Alerts', desc: 'Community-built audit log queries with scheduled DBSQL alerting', icon: '🔔', href: 'https://github.com/andyweaves/system-tables-audit-logs', source: 'GitHub' },
      { title: 'Security Analysis Tool (SAT)', desc: 'Workspace configuration posture checks — baseline compliance assessment', icon: '✅', href: 'https://github.com/databricks-industry-solutions/security-analysis-tool', source: 'GitHub' },
    ],
  },
  {
    category: 'Infrastructure as Code',
    items: [
      { title: 'Terraform SRA — Audit Log Module', desc: 'Automate security queries and alerts deployment across workspaces via Terraform', icon: '🏗️', href: 'https://github.com/databricks/terraform-databricks-sra', source: 'GitHub' },
    ],
  },
  {
    category: 'Demos & Tutorials',
    items: [
      { title: 'dbdemos — System Tables', desc: 'Install with dbdemos.install("uc-04-system-tables") — audit log notebook templates', icon: '🎓', href: 'https://www.databricks.com/resources/demos/tutorials/governance/system-tables', source: 'Databricks Demos' },
    ],
  },
];

const awsIdentityResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'User Provisioning — SCIM', desc: 'Automate user and group sync', icon: '👥', href: 'https://databricks-solutions.github.io/starter-journey/docs/infra-setup/add-users/scim', source: 'Starter Journey' },
      { title: 'Configure SSO', desc: 'SAML 2.0 or OIDC setup', icon: '🔐', href: 'https://docs.databricks.com/aws/en/security/auth/single-sign-on/', source: 'Databricks Docs' },
    ],
  },
];

const awsUcStorageResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'UC Storage Credentials & External Locations for S3', desc: 'Setup walkthrough for AWS S3', icon: '▶️', href: 'https://www.youtube.com/watch?v=oysb7Kef0Bk&t=23s', source: 'YouTube' },
      { title: 'S3 External Location Manual', desc: 'Manual setup for S3 external locations', icon: '📄', href: 'https://docs.databricks.com/aws/en/connect/unity-catalog/cloud-storage/s3/s3-external-location-manual', source: 'Databricks Docs' },
    ],
  },
];

const awsTerraformResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Customer-Managed VPC', desc: 'BYOVPC Terraform templates for AWS workspaces', icon: '🔒', href: 'https://github.com/databricks-solutions/technical-services-solutions/tree/main/workspace-setup/terraform-examples/aws/aws-byovpc', source: 'GitHub' },
      { title: 'Private Link (BYOVPC)', desc: 'Secure connectivity via AWS PrivateLink', icon: '🔗', href: 'https://github.com/databricks-solutions/technical-services-solutions/tree/main/workspace-setup/terraform-examples/aws/aws-byovpc-classic-privatelink', source: 'GitHub' },
    ],
  },
];

const azureTerraformResourceGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Terraform Deployment Guide', desc: 'Step-by-step IaC workspace provisioning on Azure', icon: '📖', href: 'https://databricks-solutions.github.io/starter-journey/docs/infra-setup/create-workspaces/azure/terraform', source: 'Starter Journey' },
      { title: 'Terraform Setup Examples', desc: 'Production-ready Terraform configs for Azure Databricks workspaces', icon: '📐', href: 'https://github.com/databricks-solutions/technical-services-solutions/tree/main/workspace-setup/terraform-examples', source: 'GitHub' },
    ],
  },
];

// ── Consolidated drilldown groups for top-level cards ──

const quickStartGroups = [
  {
    category: 'Resources',
    items: [
      { title: 'Starter Journey', desc: 'Step-by-step guide to get started with Databricks', icon: '🗺️', href: 'https://databricks-solutions.github.io/starter-journey/', source: 'Starter Journey' },
      { title: 'Free Edition', desc: 'Try Databricks free with no commitment', icon: '⚡', href: 'https://www.databricks.com/learn/free-edition', source: 'Databricks' },
      { title: 'Cheatsheet', desc: 'Quick reference for common Databricks operations', icon: '📋', href: 'https://databricks-solutions.github.io/starter-journey/pdfs/Databricks-Cheatsheet-2026-Ready.pdf', source: 'Starter Journey' },
    ],
  },
];

const workspaceSetupGroups = [
  {
    category: 'Cloud Providers',
    items: [
      { title: 'AWS Setup', desc: 'Workspace deployment, Terraform, and networking', icon: '☁️', href: '#aws', source: '', drilldown: 'aws' },
      { title: 'Azure Setup', desc: 'Workspace deployment, Terraform, and networking', icon: '🔷', href: '#azure', source: '', drilldown: 'azure' },
    ],
  },
];

const learningGroups = [
  {
    category: 'Training',
    items: [
      ...trainingsResourceGroups[0].items,
      { title: 'Skill Builder', desc: 'YouTube tutorials and video walkthroughs', icon: '▶️', href: 'https://www.youtube.com/@databricksskillbuilder/', source: 'YouTube' },
    ],
  },
  {
    category: 'Support',
    items: [...productHelpResourceGroups[0].items],
  },
  {
    category: 'Explore',
    items: [
      { title: 'Demo Centre', desc: 'Interactive demos and showcases', icon: '🎬', href: 'https://www.databricks.com/resources/demos', source: 'Databricks' },
      ...releaseHubResourceGroups[0].items,
      { title: 'NextGen Lakehouse', desc: 'Community-built resource hub', icon: '🏠', href: 'https://www.nextgenlakehouse.com/', source: 'Community' },
      { title: 'Community Forum', desc: 'Join the Databricks community', icon: '💬', href: 'https://community.databricks.com/tmcxu86974/', source: 'Databricks' },
      { title: 'User Groups', desc: 'Local and virtual user groups', icon: '👥', href: 'https://usergroups.databricks.com/', source: 'Databricks' },
    ],
  },
];

const securityGroups = [
  {
    category: 'Overview',
    items: [
      { title: 'Security & Trust Center', desc: 'Security features and compliance certifications', icon: '🛡️', href: 'https://www.databricks.com/trust/security-features', source: 'Databricks' },
    ],
  },
  ...dataExfiltrationResourceGroups,
];

const buildGroups = [
  {
    category: 'AI & Agents',
    items: [
      { title: 'AI & Agents', desc: 'Build AI agents and intelligent applications', icon: '🤖', href: '#ai-agents', source: '', drilldown: 'ai-agents' },
    ],
  },
  {
    category: 'Data Platform',
    items: [
      { title: 'Data Engineering', desc: 'ETL pipelines, Lakeflow Connect, orchestration', icon: '🔧', href: '#data-engineering', source: '', drilldown: 'data-engineering' },
      { title: 'Model & Serving', desc: 'Train, deploy, and serve ML models', icon: '🧠', href: '#model-serving', source: '', drilldown: 'model-serving' },
      { title: 'Databricks Apps', desc: 'Build interactive web applications', icon: '📱', href: '#databricks-apps', source: '', drilldown: 'databricks-apps' },
      { title: 'Database & Storage', desc: 'Lakebase, Delta Lake, and Iceberg', icon: '🗄️', href: '#database-storage', source: '', drilldown: 'database-storage' },
    ],
  },
];

const governanceMigrationGroups = [
  ...governanceResourceGroups,
  {
    category: 'Migration',
    items: [
      { title: 'Lakebridge', desc: 'Migrate data to the Databricks lakehouse', icon: '🌉', href: 'https://databrickslabs.github.io/lakebridge/docs/overview/', source: 'Databricks Labs' },
      { title: 'Migrate with LLM', desc: 'AI-assisted SQL and workload migration', icon: '🤖', href: 'https://github.com/databricks-solutions/databricks-migrator-with-llm', source: 'GitHub' },
    ],
  },
];

const costStrategiesGroups = [
  { category: 'Cost Monitoring', items: [...costMonitoringGroups[0].items] },
  { category: 'Cost Optimization', items: [...costOptimizationResourceGroups[0].items] },
  { category: 'Pricing', items: [...pricingResourceGroups[0].items] },
];

const performanceGroups = [
  ...benchmarksResourceGroups,
];

const sizingGroups = [
  { category: 'Compute Sizing', items: [...computeSizingResourceGroups[0].items] },
  { category: 'Lakemeter', items: [{ title: 'Coming Soon', desc: 'Lakemeter content is being prepared', icon: '🔜', href: '', source: '' }] },
];

const drilldownData: Record<string, { title: string; image: string; groups: typeof awsResourceGroups }> = {
  // ── Top-level consolidated drilldowns ──
  'quick-start': { title: 'Quick Start Guide', image: '/icons/databricks/book.svg', groups: quickStartGroups },
  'workspace-setup': { title: 'Setup Your Workspace', image: '/icons/databricks/gear.svg', groups: workspaceSetupGroups },
  'learning': { title: 'Trainings & Resources', image: '/icons/databricks/databricks-academy.svg', groups: learningGroups },
  'security': { title: 'Secure Your Data', image: '/icons/databricks/shield-check.svg', groups: securityGroups },
  'build': { title: 'Build & Develop', image: '/icons/databricks/lakeflow.svg', groups: buildGroups },
  'governance-migration': { title: 'Governance & Migration', image: '/icons/databricks/unity-catalog.svg', groups: governanceMigrationGroups },
  'cost-strategies': { title: 'Cost Optimization Strategies', image: '/icons/databricks/chart-line.svg', groups: costStrategiesGroups },
  'performance': { title: 'Performance Tuning', image: '/icons/databricks/performance.svg', groups: performanceGroups },
  'sizing': { title: 'Sizing & Scaling', image: '/icons/databricks/cluster.svg', groups: sizingGroups },
  // ── Existing sub-drilldowns (accessed from within consolidated views) ──
  'release-hub': { title: 'Release Hub', image: '', groups: releaseHubResourceGroups },
  'trainings': { title: 'Trainings', image: '', groups: trainingsResourceGroups },
  'product-help': { title: 'Product Help', image: '', groups: productHelpResourceGroups },
  'data-exfiltration': { title: 'Data Exfiltration Controls', image: '/icons/databricks/lock-shield.svg', groups: dataExfiltrationResourceGroups },
  aws: { title: 'Databricks on AWS', image: '/icons/aws.svg', groups: awsResourceGroups },
  'aws-terraform': { title: 'Terraform Deployment', image: '', groups: awsTerraformResourceGroups },
  'aws-identity': { title: 'Identity & SSO', image: '', groups: awsIdentityResourceGroups },
  'aws-uc-storage': { title: 'Unity Catalog Storage', image: '', groups: awsUcStorageResourceGroups },
  azure: { title: 'Databricks on Azure', image: '/icons/azure.svg', groups: azureResourceGroups },
  'azure-terraform': { title: 'Terraform Deployment', image: '', groups: azureTerraformResourceGroups },
  'ai-agents': { title: 'AI & Agents', image: '/icons/databricks/agent-bricks.svg', groups: aiAgentsResourceGroups },
  'data-engineering': { title: 'Data Engineering', image: '/icons/databricks/lakeflow.svg', groups: dataEngineeringResourceGroups },
  'model-serving': { title: 'Model & Serving', image: '/icons/databricks/mosaic-ai.svg', groups: modelServingResourceGroups },
  'databricks-apps': { title: 'Databricks Apps', image: '/icons/databricks/apps.svg', groups: databricksAppsResourceGroups },
  'database-storage': { title: 'Database & Storage', image: '/icons/databricks/lakebase.svg', groups: databaseStorageResourceGroups },
  'governance': { title: 'Governance', image: '/icons/databricks/unity-catalog.svg', groups: governanceResourceGroups },
  'benchmarks': { title: 'Benchmarks', image: '', groups: benchmarksResourceGroups },
  'cost-optimization': { title: 'Cost Optimization', image: '', groups: costOptimizationResourceGroups },
  'compute-sizing': { title: 'Compute & Cluster Sizing', image: '', groups: computeSizingResourceGroups },
  'lakemeter': { title: 'Lakemeter', image: '', groups: [{ category: 'Resources', items: [{ title: 'Coming Soon', desc: 'Lakemeter content is being prepared', icon: '🔜', href: '', source: '' }] }] },
  'pricing': { title: 'Pricing & Cost Calculators', image: '', groups: pricingResourceGroups },
  'cost-monitoring': { title: 'Cost Monitoring', image: '', groups: costMonitoringGroups },
};

function ResourceCard({ item, index, onNavigate }: { item: { title: string; desc: string; icon: string; href: string; source: string; drilldown?: string }; index: number; onNavigate?: (key: string) => void }) {
  const hasDrilldown = 'drilldown' in item && item.drilldown && onNavigate;

  const content = (
    <div className="flex flex-col gap-3 p-5 h-full">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ background: 'rgba(255,54,33,0.15)' }}>
        <span className="text-xl">{item.icon}</span>
      </div>
      <span className="text-[14px] font-bold text-white leading-tight">{item.title}</span>
      {item.desc && <span className="text-[12px] font-medium text-white/70 leading-snug">{item.desc}</span>}
      <div className="mt-auto pt-2 flex items-center gap-2">
        {item.source && <span className="text-[10px] font-bold text-white/40">{item.source}</span>}
        <span className="ml-auto text-[11px] font-bold text-[#FF3621] border border-[#FF3621]/30 px-3 py-1 rounded-full hover:bg-[#FF3621]/10 transition-colors">
          {hasDrilldown ? 'Explore' : 'Quick Link'}
        </span>
      </div>
    </div>
  );

  const cls = "group rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer";
  const style = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' };
  const hoverHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = 'rgba(255,54,33,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; },
  };

  if (hasDrilldown) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 + index * 0.03 }}
        className={cls + ' text-left'} style={style} {...hoverHandlers}
        onClick={() => onNavigate!(item.drilldown!)}
      >{content}</motion.button>
    );
  }

  return (
    <motion.a
      href={item.href} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 + index * 0.03 }}
      className={cls + ' no-underline block'} style={style} {...hoverHandlers}
    >{content}</motion.a>
  );
}

function TickerBar({ newsItems }: { newsItems: string[] }) {
  if (newsItems.length === 0) return null;
  return (
    <div className="relative z-10 w-full">
      <div
        className="ticker-container relative flex items-center h-9 overflow-hidden"
        style={{ background: '#0a0e14', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="shrink-0 h-full flex items-center justify-center px-5 text-[10px] font-bold text-white uppercase tracking-wider z-10"
          style={{ background: '#FF3621', minWidth: '140px' }}
        >Latest on Databricks</div>
        <div
          className="flex-1 overflow-hidden h-full flex items-center"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 20px, black 90%, transparent)' }}
        >
          <div className="inline-block whitespace-nowrap ticker-track">
            {[...newsItems, ...newsItems].map((item, i) => (
              <span key={i} className="inline-block text-[11px] font-bold text-white" style={{ padding: '0 2.5rem' }}>
                <span className="text-[#FF3621] mr-2">•</span>{item}
              </span>
            ))}
          </div>
        </div>
        {/* Event badge removed — summit link now in landing sidebar */}
      </div>
    </div>
  );
}


export default function Hero() {
  const newsItems = useTickerItems();
  const [selectedCloud, setSelectedCloud] = useState<'aws' | 'azure' | null>(null);
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const currentData = activeNav ? drilldownData[activeNav] : null;

  // ── Landing page: choose cloud provider ──
  if (!selectedCloud) {
    const landingSections: { title: string; items: { label: string; href: string; tag?: string }[] }[] = [
      { title: 'GET STARTED', items: [
        { label: 'Try the Free Edition', href: 'https://www.databricks.com/learn/free-edition', tag: 'Free' },
        { label: 'Starter Journey', href: 'https://databricks-solutions.github.io/starter-journey/' },
        { label: 'Databricks Cheatsheet', href: 'https://databricks-solutions.github.io/starter-journey/pdfs/Databricks-Cheatsheet-2026-Ready.pdf', tag: 'PDF' },
      ]},
      { title: 'LEARN', items: [
        { label: 'Training Home', href: 'https://www.databricks.com/learn/training/home' },
        { label: 'Free Trainings', href: 'https://docs.databricks.com/aws/en/getting-started/free-training', tag: 'Free' },
        { label: 'Skill Builder', href: 'https://www.youtube.com/@databricksskillbuilder/', tag: 'YouTube' },
      ]},
      { title: 'EXPLORE', items: [
        { label: 'Demo Centre', href: 'https://www.databricks.com/resources/demos' },
        { label: 'NextGen Lakehouse', href: 'https://www.nextgenlakehouse.com/' },
        { label: 'Community Forum', href: 'https://community.databricks.com/tmcxu86974/' },
        { label: 'User Groups', href: 'https://usergroups.databricks.com/' },
      ]},
      { title: 'SECURITY & COMPLIANCE', items: [
        { label: 'Security & Trust Centre', href: 'https://www.databricks.com/trust/security-features' },
      ]},
      { title: 'MIGRATE', items: [
        { label: 'Lakebridge', href: 'https://databrickslabs.github.io/lakebridge/docs/overview/' },
        { label: 'Migrate with LLM', href: 'https://github.com/databricks-solutions/databricks-migrator-with-llm' },
      ]},
      { title: 'HELP & SUPPORT', items: [
        { label: 'Help Centre', href: 'https://help.databricks.com/s/' },
        { label: 'Contact Support', href: 'https://docs.databricks.com/aws/en/resources/support' },
        { label: 'Product Feedback', href: 'https://docs.databricks.com/aws/en/resources/ideas' },
      ]},
    ];

    return (
      <section className="min-h-screen flex flex-col" style={{ background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' }}>
        <style>{`
          @keyframes tickerScroll { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-100%,0,0); } }
          .ticker-track { animation: tickerScroll 150s linear infinite; padding-right: 100%; }
          .ticker-container:hover .ticker-track { animation-play-state: paused !important; }
          .sidebar-card {
            background: rgba(255,255,255,0.025);
            border: 1px solid rgba(255,171,0,0.12);
            border-radius: 12px;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .sidebar-card:hover {
            background: rgba(255,171,0,0.06);
            border-color: rgba(255,171,0,0.3);
            box-shadow: 0 0 20px rgba(255,171,0,0.06);
            transform: translateX(3px);
          }
        `}</style>
        <TickerBar newsItems={newsItems} />

        {/* Centered header with bottom divider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center py-6 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-center gap-3 mb-1">
            <img src="/icons/databricks/lakehouse.svg" alt="" className="w-9 h-9" />
            <h1 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold text-white tracking-tight">
              The <span className="text-[#FF3621]">Lobang</span> Data Hub 🇸🇬
            </h1>
          </div>
          <p className="text-white/50 text-[15px]">Don't say bojio! — Your one-stop Databricks resource hub.</p>
        </motion.div>

        {/* Main area: sidebar cards + cloud chooser */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Left sidebar — card-style links */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="w-[420px] shrink-0 overflow-y-auto scrollbar-hide px-8 py-6"
            style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
          >
            {landingSections.map((section, si) => (
              <div key={section.title} className={si < landingSections.length - 1 ? 'mb-5' : 'mb-4'}>
                <h3 className="text-[13px] font-extrabold text-[#FFAB00] tracking-[0.1em] mb-2.5 pl-1">
                  {section.title}
                </h3>
                <div className="flex flex-col gap-2">
                  {section.items.map(item => (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="sidebar-card">
                      <div className="min-w-0">
                        <div className="text-[14px] font-semibold text-[#FFAB00] leading-tight">{item.label}</div>
                        {item.tag && <span className="text-[10px] font-bold text-[#FFAB00]/50 mt-0.5 block">{item.tag}</span>}
                      </div>
                      <span className="text-[#FFAB00]/30 text-[15px] shrink-0" style={{ fontFamily: 'system-ui' }}>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* Events — special feature card */}
            <div
              className="rounded-xl p-5 mt-1"
              style={{ background: 'rgba(255,171,0,0.04)', border: '1px solid rgba(255,171,0,0.18)' }}
            >
              <p className="text-[12px] text-white/40 font-medium mb-1">Jun 9–12 · San Francisco</p>
              <h3 className="text-[16px] font-bold text-white mb-0.5">Data+AI Summit 2026</h3>
              <p className="text-[13px] text-white/45 mb-4">The future of data and AI</p>
              <a href="https://www.databricks.com/dataaisummit" target="_blank" rel="noopener noreferrer"
                className="block w-full text-center py-2.5 rounded-lg font-bold text-[14px] no-underline transition-all duration-200"
                style={{ background: '#FFAB00', color: '#0b1219' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FFC033'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255,171,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FFAB00'; e.currentTarget.style.boxShadow = 'none'; }}
              >Register</a>
            </div>
          </motion.aside>

          {/* Cloud provider chooser — centered on full page */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
              className="pointer-events-auto text-center"
            >
              <p className="text-white/40 text-[13px] font-semibold tracking-[0.15em] uppercase mb-8">Choose your cloud</p>
              <div className="flex gap-6">
                {[
                  { id: 'aws' as const, icon: '/icons/aws.svg', label: 'AWS' },
                  { id: 'azure' as const, icon: '/icons/azure.svg', label: 'Azure' },
                ].map(cloud => (
                  <motion.button key={cloud.id} whileHover={{ scale: 1.04, y: -4 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCloud(cloud.id)}
                    className="flex flex-col items-center gap-4 w-48 py-12 rounded-2xl cursor-pointer border-none transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,54,33,0.4)'; e.currentTarget.style.background = 'rgba(255,54,33,0.06)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(255,54,33,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <img src={cloud.icon} alt={cloud.label} className="w-14 h-14 object-contain" />
                    <span className="text-[18px] font-bold text-white">{cloud.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // ── Main view: sidebar + content ──
  return (
    <section className="min-h-screen flex flex-col" style={{ background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' }}>
      <style>{`
        @keyframes tickerScroll { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-100%,0,0); } }
        .ticker-track { animation: tickerScroll 150s linear infinite; padding-right: 100%; }
        .ticker-container:hover .ticker-track { animation-play-state: paused !important; }
      `}</style>
      <TickerBar newsItems={newsItems} />

      {/* Hero Header — centered branding */}
      <div className="w-full py-8 text-center shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <img src="/icons/databricks/lakehouse.svg" alt="" className="w-7 h-7" />
          <h1 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold text-white tracking-tight">
            The <span className="text-[#FF3621]">Lobang</span> Data Hub 🇸🇬
          </h1>
        </div>
        <p className="text-white/60 text-[14px] font-bold">
          Don't say bojio! — Your one-stop Databricks resource hub.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          {(['aws', 'azure'] as const).map(c => (
            <button
              key={c}
              onClick={() => { setSelectedCloud(c); setActiveNav(null); }}
              className={`text-[11px] font-bold px-4 py-1.5 rounded-full cursor-pointer border-none transition-all ${
                selectedCloud === c ? 'bg-[#FF3621] text-white' : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >{c.toUpperCase()}</button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-52 shrink-0 overflow-y-auto py-4 px-3" style={{ background: 'rgba(0,0,0,0.15)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Cloud-specific section */}
          <div className="mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#FF3621] px-2 mb-2">
              {selectedCloud === 'aws' ? 'AWS' : 'AZURE'}
            </h3>
            <button
              onClick={() => setActiveNav(selectedCloud)}
              className={`block w-full text-left text-[12px] font-bold px-2 py-1.5 rounded transition-colors cursor-pointer border-none ${
                activeNav === selectedCloud ? 'bg-[#FF3621]/15 text-[#FF3621]' : 'text-white hover:text-[#FF3621] hover:bg-white/5 bg-transparent'
              }`}
            >Workspace Setup</button>
          </div>

          {sidebarNav.map(section => (
            <div key={section.title} className="mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#FF3621] px-2 mb-2">{section.title}</h3>
              {section.items.map(item => {
                if (item.href) {
                  return (
                    <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between text-[12px] font-bold text-white hover:text-[#FF3621] px-2 py-1.5 rounded hover:bg-white/5 no-underline transition-colors">
                      {item.label}
                      <span className="text-[10px] text-white/40">↗</span>
                    </a>
                  );
                }
                return (
                  <button key={item.label}
                    onClick={() => setActiveNav(item.key || null)}
                    className={`block w-full text-left text-[12px] font-bold px-2 py-1.5 rounded transition-colors cursor-pointer border-none ${
                      activeNav === item.key ? 'bg-[#FF3621]/15 text-[#FF3621]' : 'text-white hover:text-[#FF3621] hover:bg-white/5 bg-transparent'
                    }`}
                  >{item.label}</button>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {currentData ? (
              <motion.div
                key={activeNav}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  {currentData.image && <img src={currentData.image} alt="" className="w-7 h-7" />}
                  <h2 className="text-xl font-bold text-white">{currentData.title}</h2>
                </div>
                {currentData.groups.map((group, gi) => (
                  <div key={group.category} className="mb-8">
                    {gi > 0 && <div className="w-full h-px mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />}
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#FF3621] mb-4">{group.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.items.map((item, ii) => (
                        <ResourceCard key={item.title} item={item} index={ii} onNavigate={setActiveNav} />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <h2 className="text-2xl font-bold text-white mb-3">
                  Welcome to Lobang 🇸🇬
                </h2>
                <p className="text-white/60 text-[14px] font-bold max-w-md">
                  Select a section from the sidebar to explore Databricks resources for {selectedCloud === 'aws' ? 'AWS' : 'Azure'}.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="shrink-0 py-3 px-6 text-center text-[11px] font-bold text-white/40" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        &copy; {new Date().getFullYear()} Lobang Data Hub. All rights reserved.
      </footer>
    </section>
  );
}
