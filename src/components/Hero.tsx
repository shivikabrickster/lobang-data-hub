import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SgFeaturesView from './SgFeaturesView';

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

const sections = [
  {
    title: 'Getting Started',
    tiles: [
      { label: 'Quick Start Guide', emoji: '📖', image: '/icons/databricks/book.svg', href: '#quick-start', drilldown: 'quick-start', desc: 'Learn the basics of Databricks in under an hour.' },
      { label: 'Setup Your Workspace', emoji: '⚙️', image: '/icons/databricks/gear.svg', href: '#workspace-setup', drilldown: 'workspace-setup', desc: 'Configure your first Databricks environment.' },
      { label: 'Trainings & Resources', emoji: '🎓', image: '/icons/databricks/databricks-academy.svg', href: '#learning', drilldown: 'learning', desc: 'Courses, tutorials, demos, and community.' },
    ],
  },
  {
    title: 'Architecture & Security',
    tiles: [
      { label: 'Secure Your Data', emoji: '🔒', image: '/icons/databricks/shield-check.svg', href: '#security', drilldown: 'security', desc: 'Implementing best practices for data security.' },
      { label: 'Build & Develop', emoji: '🔧', image: '/icons/databricks/lakeflow.svg', href: '#build', drilldown: 'build', desc: 'AI agents, pipelines, model serving, and apps.' },
      { label: 'Governance & Migration', emoji: '🛡️', image: '/icons/databricks/unity-catalog.svg', href: '#governance-migration', drilldown: 'governance-migration', desc: 'Data governance, sharing, and migration tools.' },
    ],
  },
  {
    title: 'Cloud Platforms',
    tiles: [
      { label: 'AWS Integration', emoji: '☁️', image: '/icons/aws.svg', href: '#aws', drilldown: 'aws', desc: 'Deploying Databricks on Amazon Web Services.' },
      { label: 'Azure Integration', emoji: '🔷', image: '/icons/azure.svg', href: '#azure', drilldown: 'azure', desc: 'Integrating Databricks with Microsoft Azure.' },
    ],
  },
  {
    title: 'Optimization',
    tiles: [
      { label: 'Cost Optimization Strategies', emoji: '💲', image: '/icons/databricks/chart-line.svg', href: '#cost-strategies', drilldown: 'cost-strategies', desc: 'Tips for reducing your cloud spend.' },
      { label: 'Performance Tuning', emoji: '🏆', image: '/icons/databricks/performance.svg', href: '#performance', drilldown: 'performance', desc: 'Optimizing query and job performance.' },
      { label: 'Sizing & Scaling', emoji: '⚡', image: '/icons/databricks/cluster.svg', href: '#sizing', drilldown: 'sizing', desc: 'Right-size compute and configure auto-scaling.' },
    ],
  },
];

type Tile = { label: string; emoji: string; image?: string; href: string; drilldown?: string; desc?: string };

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

function TileCard({ tile, index, onDrilldown }: { tile: Tile; index: number; onDrilldown?: (key: string) => void }) {
  const isDrilldown = !!tile.drilldown;

  const inner = (
    <div className="flex items-start gap-4 p-5 h-full">
      <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFF0EE]">
        {tile.image ? (
          <img src={tile.image} alt={tile.label} className="w-7 h-7 object-contain" />
        ) : (
          <span className="text-xl">{tile.emoji}</span>
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-[14px] font-semibold text-gray-900 leading-tight">{tile.label}</span>
        {tile.desc && (
          <span className="text-[12px] text-gray-500 leading-snug">{tile.desc}</span>
        )}
      </div>
      {isDrilldown && (
        <span className="ml-auto shrink-0 text-gray-300 group-hover:text-[#FF3621] transition-colors text-lg">&#8250;</span>
      )}
    </div>
  );

  const sharedClass = "group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#FF3621]/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer";

  if (isDrilldown) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 + index * 0.03 }}
        className={sharedClass + ' text-left w-full'}
        onClick={() => onDrilldown?.(tile.drilldown!)}
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
      transition={{ duration: 0.35, delay: 0.1 + index * 0.03 }}
      className={sharedClass + ' no-underline block'}
    >
      {inner}
    </motion.a>
  );
}

function EventTickerBadge() {
  const EVENT_DATE = new Date('2026-06-09T00:00:00');
  const EVENT_END = new Date('2026-06-12T23:59:59');
  const EVENT_URL = 'https://www.databricks.com/dataaisummit';

  const [daysLeft, setDaysLeft] = useState(() => {
    const diff = EVENT_DATE.getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = EVENT_DATE.getTime() - new Date().getTime();
      setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (new Date() > EVENT_END) return null;

  const isHappening = new Date() >= EVENT_DATE && new Date() <= EVENT_END;

  return (
    <a
      href={EVENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 flex items-center gap-3 px-5 py-1 no-underline z-10 transition-all duration-200 hover:brightness-105 group"
      style={{
        background: '#fff',
        borderLeft: '2px solid #FF3621',
      }}
    >
      {/* Pulsing attention dot */}
      <span className="relative flex h-3 w-3 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3621] opacity-60" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF3621]" />
      </span>

      <span className="text-[16px]">🎪</span>

      <div className="flex flex-col">
        <span className="text-[13px] font-extrabold text-gray-900 leading-tight whitespace-nowrap tracking-tight">
          DATA + AI SUMMIT 2026
        </span>
        <span className="text-[10px] text-gray-400 whitespace-nowrap">📍 San Francisco · June 9–12</span>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-gray-200" />

      {/* Countdown or Live badge */}
      {isHappening ? (
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          LIVE NOW
        </span>
      ) : (
        <div className="flex flex-col items-center">
          <span className="text-[18px] font-extrabold text-[#FF3621] leading-none">{daysLeft}</span>
          <span className="text-[8px] text-gray-400 uppercase tracking-wider">days</span>
        </div>
      )}

      {/* CTA with bouncing arrow */}
      <span className="flex items-center gap-1.5 text-[12px] font-bold text-white bg-[#FF3621] px-4 py-1.5 rounded-full whitespace-nowrap group-hover:bg-[#e02e1b] transition-all duration-200">
        {isHappening ? 'Watch Live' : 'Register Free'}
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block"
        >
          →
        </motion.span>
      </span>
    </a>
  );
}

function DrilldownView({ data, onBack, onDrilldown }: { data: typeof drilldownData['aws']; onBack: () => void; onDrilldown?: (key: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-8 max-w-5xl w-full"
    >
      {/* Back button + title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200 shadow-sm"
        >
          <span className="text-lg leading-none">&larr;</span> Back
        </button>
        <div className="flex items-center gap-3">
          {data.image && <img src={data.image} alt={data.title} className="w-8 h-8 object-contain" />}
          <h2 className="text-[22px] font-bold text-gray-900">{data.title}</h2>
        </div>
      </div>

      {/* Categories with resource tiles */}
      {data.groups.map((group, gi) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 + gi * 0.08 }}
        >
          {gi > 0 && <div className="w-full h-px bg-gray-200 mb-4" />}
          <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#FF3621] mb-4 block">
            {group.category}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {group.items.map((item, ii) => {
              const sharedProps = {
                initial: { opacity: 0, y: 12 } as const,
                animate: { opacity: 1, y: 0 } as const,
                transition: { duration: 0.25, delay: 0.1 + ii * 0.03 },
                className: "group flex items-start gap-3 p-4 rounded-xl no-underline transition-all duration-200 hover:-translate-y-0.5 cursor-pointer bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#FF3621]/30",
              };
              const content = (
                <>
                  {'icon' in item && item.icon && (
                    <span className="text-xl shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-[#FFF0EE]">{item.icon}</span>
                  )}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[13px] font-semibold text-gray-900 leading-tight">
                      {item.title}
                    </span>
                    {item.desc && (
                      <span className="text-[11px] text-gray-500 leading-snug">
                        {item.desc}
                      </span>
                    )}
                    {'source' in item && item.source && (
                      <span className="text-[10px] text-[#FF3621]/60 font-medium mt-1">{item.source}</span>
                    )}
                  </div>
                </>
              );
              if ('drilldown' in item && item.drilldown && onDrilldown) {
                return (
                  <motion.button key={item.title} {...sharedProps} onClick={() => onDrilldown(item.drilldown as string)}>
                    {content}
                  </motion.button>
                );
              }
              return (
                <motion.a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
                  {content}
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const newsItems = useTickerItems();
  const [activeDrilldown, setActiveDrilldown] = useState<string | null>(null);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col bg-white">
      <style>{`
        @keyframes tickerScroll { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-100%,0,0); } }
        .ticker-track { animation: tickerScroll 150s linear infinite; padding-right: 100%; }
        .ticker-container:hover .ticker-track { animation-play-state: paused !important; }
      `}</style>

      {/* News Ticker — top bar */}
      {newsItems.length > 0 && (
      <div className="relative z-10 w-full">
        <div
          className="ticker-container relative flex items-center h-10 overflow-hidden"
          style={{
            background: '#FF3621',
          }}
        >
          {/* LATEST label */}
          <div
            className="shrink-0 h-full flex items-center px-5 text-[11px] font-bold text-white uppercase tracking-wider z-10"
            style={{ background: '#e02e1b' }}
          >
            Latest
          </div>
          {/* Scrolling text with edge fade */}
          <div
            className="flex-1 overflow-hidden h-full flex items-center"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 20px, black 95%, transparent)' }}
          >
            <div className="inline-block whitespace-nowrap ticker-track">
              {[...newsItems, ...newsItems].map((item, i) => (
                <span key={i} className="inline-block text-[12px] font-medium text-white/90" style={{ padding: '0 3rem' }}>
                  <span className="text-white mr-2">•</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
          {/* Event highlight — fixed right side of ticker */}
          <EventTickerBadge />
        </div>
      </div>
      )}

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <img src="/icons/databricks/lakehouse.svg" alt="Lobang" className="w-6 h-6" />
              Lobang
            </span>
            <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-gray-500">
              <a href="https://docs.databricks.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF3621] transition-colors no-underline">Docs</a>
              <a href="https://community.databricks.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF3621] transition-colors no-underline">Community</a>
              <a href="https://www.databricks.com/resources/demos" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF3621] transition-colors no-underline">Demos</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.databricks.com/learn/free-edition" target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold text-white bg-[#FF3621] px-4 py-2 rounded-lg hover:bg-[#e02e1b] transition-colors no-underline">
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-[#FFF5F3] to-white">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-gray-900 leading-tight tracking-tight">
              Lobang
            </h1>
            <p className="text-gray-500 text-[16px] mt-2 max-w-xl">
              Don't say bojio! — Your one-stop Databricks resource hub. 🇸🇬
            </p>
            <button
              onClick={() => {
                document.getElementById('sections-start')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-6 text-[14px] font-semibold text-white bg-[#FF3621] px-6 py-3 rounded-lg hover:bg-[#e02e1b] transition-colors cursor-pointer border-none"
            >
              Explore Resources
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main content area */}
      <div id="sections-start" className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <AnimatePresence mode="wait">
          {activeDrilldown === 'sg-features' ? (
            <SgFeaturesView
              key="sg-features"
              onBack={() => setActiveDrilldown(null)}
            />
          ) : activeDrilldown && drilldownData[activeDrilldown] ? (
            <DrilldownView
              key={activeDrilldown}
              data={drilldownData[activeDrilldown]}
              onBack={() => {
                if (activeDrilldown.startsWith('azure-')) setActiveDrilldown('azure');
                else if (activeDrilldown.startsWith('aws-')) setActiveDrilldown('aws');
                else if (['ai-agents', 'data-engineering', 'model-serving', 'databricks-apps', 'database-storage'].includes(activeDrilldown)) setActiveDrilldown('build');
                else if (activeDrilldown === 'governance') setActiveDrilldown('governance-migration');
                else setActiveDrilldown(null);
              }}
              onDrilldown={(key) => setActiveDrilldown(key)}
            />
          ) : (
            <motion.div
              key="main-tiles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col gap-10"
            >
              {sections.map((section, si) => {
                const offset = sections.slice(0, si).reduce((acc, s) => acc + s.tiles.length, 0);
                return (
                  <div key={section.title}>
                    {si > 0 && <div className="w-full h-px bg-gray-100 mb-8" />}
                    <h2 className="text-[18px] font-bold text-gray-900 mb-6">
                      {section.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {section.tiles.map((tile, i) => (
                        <TileCard key={tile.label} tile={tile} index={offset + i} onDrilldown={setActiveDrilldown} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-gray-400">
          <span>Built for Databricks Field Engineering</span>
          <div className="flex items-center gap-6">
            <a href="https://docs.databricks.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF3621] transition-colors no-underline">Docs</a>
            <a href="https://www.databricks.com/trust/security-features" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF3621] transition-colors no-underline">Security</a>
            <a href="https://community.databricks.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF3621] transition-colors no-underline">Community</a>
          </div>
          <span>&copy; {new Date().getFullYear()} Lobang Data Hub</span>
        </div>
      </footer>
    </section>
  );
}
