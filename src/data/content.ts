export interface Announcement {
  title: string;
  date: string;
  category: string;
  summary: string;
  url: string;
  badge: 'GA' | 'New' | 'Preview';
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export interface Training {
  title: string;
  provider: string;
  url: string;
  duration: string;
  cost: string;
  badge: 'Certification' | 'Learning Path';
  description: string;
}

export interface QuickLink {
  title: string;
  description: string;
  url: string;
  icon: string;
}

export const announcements: Announcement[] = [
  {
    title: "Lakeflow Connect — SQL Server Connector Now GA",
    date: "2026-03-10",
    category: "data-engineering",
    summary: "Production-ready CDC replication from SQL Server to Delta Lake with automatic schema evolution and exactly-once delivery.",
    url: "https://docs.databricks.com/en/ingestion/lakeflow-connect/index.html",
    badge: "GA"
  },
  {
    title: "Databricks Apps — Now Generally Available",
    date: "2026-02-20",
    category: "apps",
    summary: "Build and deploy full-stack web applications directly on Databricks with built-in auth, service principals, and Unity Catalog integration.",
    url: "https://docs.databricks.com/en/dev-tools/databricks-apps/index.html",
    badge: "GA"
  },
  {
    title: "AI/BI Dashboards — External Embedding SDK",
    date: "2026-02-15",
    category: "ai-ml",
    summary: "Embed AI/BI dashboards into external apps without requiring users to log into Databricks. Scoped token minting for secure, governed access.",
    url: "https://docs.databricks.com/en/dashboards/index.html",
    badge: "New"
  },
  {
    title: "Spark Declarative Pipelines — CREATE FLOW & AUTO CDC",
    date: "2026-02-01",
    category: "data-engineering",
    summary: "New SQL-first pipeline syntax with CREATE FLOW for explicit streaming transforms, AUTO CDC for SCD Type 1 & 2, and built-in data quality constraints.",
    url: "https://docs.databricks.com/en/sql/language-manual/index.html",
    badge: "New"
  },
  {
    title: "Unity Catalog — Metric Views",
    date: "2026-01-20",
    category: "governance",
    summary: "Define governed business metrics once in Unity Catalog and reuse across dashboards, notebooks, and AI agents with consistent definitions.",
    url: "https://docs.databricks.com/en/data-governance/unity-catalog/index.html",
    badge: "Preview"
  },
  {
    title: "Multi-Agent Supervisor — Compound AI Systems",
    date: "2026-01-10",
    category: "ai-ml",
    summary: "Build supervisor agents that route questions to specialised sub-agents (Genie for data, Knowledge Assistants for documents) automatically.",
    url: "https://docs.databricks.com/en/generative-ai/agent-framework/index.html",
    badge: "GA"
  },
  {
    title: "Lakebase — Managed PostgreSQL on Databricks",
    date: "2025-12-15",
    category: "apps",
    summary: "Fully managed PostgreSQL databases for application state, user data, and OLTP workloads — integrated with Unity Catalog governance.",
    url: "https://docs.databricks.com/en/database/lakebase/index.html",
    badge: "Preview"
  },
  {
    title: "Vector Search — Managed Embeddings & Retrieval",
    date: "2025-12-01",
    category: "ai-ml",
    summary: "Create and query vector search indexes for RAG applications. Automatic sync from Delta tables with managed embeddings.",
    url: "https://docs.databricks.com/en/generative-ai/vector-search/index.html",
    badge: "GA"
  }
];

export const faq: FAQ[] = [
  {
    question: "What is the Databricks Lakehouse Platform?",
    answer: "The Lakehouse combines the best of data warehouses and data lakes into a single platform. It provides ACID transactions, schema enforcement, and governance (via Unity Catalog) on top of open formats like Delta Lake — giving you one platform for data engineering, analytics, and AI.",
    category: "platform"
  },
  {
    question: "What is Unity Catalog and why should my agency use it?",
    answer: "Unity Catalog is Databricks' unified governance solution. It provides centralised access control, audit logging, data lineage, and discovery across all your data assets — tables, files, ML models, and AI agents. For government agencies, it ensures data governance compliance and full traceability.",
    category: "governance"
  },
  {
    question: "What is Lakeflow Connect?",
    answer: "Lakeflow Connect provides managed, zero-code data ingestion connectors. It supports CDC (Change Data Capture) replication from databases like SQL Server, PostgreSQL, MySQL, and SaaS sources like Salesforce, ServiceNow, and SharePoint — directly into Delta tables with automatic schema evolution.",
    category: "data-engineering"
  },
  {
    question: "How do I build AI applications on Databricks?",
    answer: "Databricks provides a complete AI stack: Foundation Model APIs for LLM access, Vector Search for RAG, Knowledge Assistants for document Q&A, Genie Spaces for natural language SQL, and Agent Framework for building multi-agent systems. Deploy as Databricks Apps with built-in auth.",
    category: "ai-ml"
  },
  {
    question: "What is the AI Dev Kit?",
    answer: "The AI Dev Kit is an open-source toolkit that brings Databricks capabilities into your IDE (Cursor, VS Code, Claude Code). It includes an MCP server for live workspace interaction and 20+ skills that teach AI assistants Databricks-specific patterns and best practices.",
    category: "developer"
  },
  {
    question: "Is Databricks available in Singapore?",
    answer: "Yes. Databricks is available on both AWS (ap-southeast-1) and Azure (Southeast Asia / Singapore) regions. All major features including Unity Catalog, Serverless Compute, Databricks Apps, and AI/BI are available in these regions.",
    category: "platform"
  },
  {
    question: "What free training is available?",
    answer: "Databricks Academy offers free self-paced courses including Generative AI Fundamentals (with free certification), Lakehouse Fundamentals, and Data Engineering with Databricks. Visit databricks.com/learn to browse all available courses.",
    category: "training"
  },
  {
    question: "How do I connect to on-premises databases?",
    answer: "Databricks supports multiple connectivity options: JDBC/ODBC direct connections, Unity Catalog Foreign Connections (federated queries), and Lakeflow Connect for managed CDC replication. For network connectivity, use VPN, PrivateLink, or ExpressRoute.",
    category: "data-engineering"
  },
  {
    question: "What are Databricks Apps?",
    answer: "Databricks Apps lets you build and deploy full-stack web applications (Streamlit, Dash, FastAPI, React) directly on Databricks. Apps get dedicated service principals, built-in OAuth authentication, and seamless access to Unity Catalog data — no separate infrastructure needed.",
    category: "apps"
  },
  {
    question: "What compliance certifications does Databricks have?",
    answer: "Databricks holds SOC 2 Type II, ISO 27001, ISO 27017, ISO 27018, HIPAA, PCI DSS, and FedRAMP certifications. The platform supports compliance security profiles for workspaces handling regulated data.",
    category: "governance"
  }
];

export const training: Training[] = [
  {
    title: "Generative AI Fundamentals",
    provider: "Databricks Academy",
    url: "https://www.databricks.com/learn/training/generative-ai-fundamentals",
    duration: "1.5 hours",
    cost: "Free",
    badge: "Certification",
    description: "Learn the fundamentals of generative AI, including LLMs, RAG, and prompt engineering. Includes a free certification."
  },
  {
    title: "Lakehouse Fundamentals",
    provider: "Databricks Academy",
    url: "https://www.databricks.com/learn/training/lakehouse-fundamentals",
    duration: "2 hours",
    cost: "Free",
    badge: "Certification",
    description: "Introduction to the Lakehouse architecture, Delta Lake, Unity Catalog, and the Databricks platform."
  },
  {
    title: "Data Engineering with Databricks",
    provider: "Databricks Academy",
    url: "https://www.databricks.com/learn/training/data-engineer-learning-plan",
    duration: "Self-paced",
    cost: "Free",
    badge: "Learning Path",
    description: "Comprehensive learning path for data engineers covering ETL, pipelines, orchestration, and best practices."
  },
  {
    title: "Machine Learning with Databricks",
    provider: "Databricks Academy",
    url: "https://www.databricks.com/learn/training/machine-learning-learning-plan",
    duration: "Self-paced",
    cost: "Free",
    badge: "Learning Path",
    description: "End-to-end ML workflow: feature engineering, model training, MLflow tracking, and model serving."
  },
  {
    title: "SQL for Data Analytics",
    provider: "Databricks Academy",
    url: "https://www.databricks.com/learn/training/data-analyst-learning-plan",
    duration: "Self-paced",
    cost: "Free",
    badge: "Learning Path",
    description: "Learn to query, visualise, and build dashboards using Databricks SQL and AI/BI."
  },
  {
    title: "Platform Administration",
    provider: "Databricks Academy",
    url: "https://www.databricks.com/learn/training/platform-administrator",
    duration: "Self-paced",
    cost: "Free",
    badge: "Learning Path",
    description: "Workspace setup, user management, Unity Catalog administration, security, and cost management."
  }
];

export const quickLinks: QuickLink[] = [
  {
    title: "Starter Journey",
    description: "Step-by-step onboarding for new Databricks agencies",
    url: "https://docs.databricks.com/en/getting-started/index.html",
    icon: "Rocket"
  },
  {
    title: "AI Dev Kit",
    description: "MCP server + IDE skills for AI-assisted development",
    url: "https://github.com/databricks/databricks-ai-dev-kit",
    icon: "Cpu"
  },
  {
    title: "Apps Cookbook",
    description: "Templates for Streamlit, Dash, FastAPI & React apps",
    url: "https://github.com/databricks/app-templates",
    icon: "BookOpen"
  },
  {
    title: "Release Notes",
    description: "Latest platform updates and feature releases",
    url: "https://docs.databricks.com/en/release-notes/index.html",
    icon: "Bell"
  },
  {
    title: "Databricks Academy",
    description: "Free self-paced courses and certifications",
    url: "https://www.databricks.com/learn",
    icon: "GraduationCap"
  },
  {
    title: "Community Forum",
    description: "Connect with other Databricks practitioners",
    url: "https://community.databricks.com/",
    icon: "Users"
  }
];

export const filterCategories = [
  { key: 'all', label: 'All' },
  { key: 'data-engineering', label: 'Data Engineering' },
  { key: 'ai-ml', label: 'AI / ML' },
  { key: 'governance', label: 'Governance' },
  { key: 'apps', label: 'Apps & Platform' },
];
export interface LibraryItem {
  title: string;
  description: string;
  url: string;
  source: string;
}

export interface LibraryLane {
  key: string;
  number: string;
  label: string;
  kicker: string;
  items: LibraryItem[];
}

export interface LibraryFeature {
  kicker: string;
  title: string;
  blurb: string;
  url: string;
  source: string;
  meta: string;
}

export const libraryFeature: LibraryFeature = {
  kicker: "Editor's pick",
  title: "Databricks AI DevKit",
  blurb: "A field-engineering toolkit for coding agents on Databricks. Prebuilt skills, prompts, and workflows so your team builds with Claude Code against Databricks from day one.",
  url: "https://github.com/databricks-solutions/ai-dev-kit",
  source: "GitHub · databricks-solutions",
  meta: "Open source · Field Engineering",
};

export const libraryLanes: LibraryLane[] = [
  {
    key: "deploy",
    number: "I",
    label: "Deploy",
    kicker: "Land a workspace",
    items: [
      { title: "Databricks on AWS", description: "Official quickstart, ap-southeast-1 ready.", url: "https://docs.databricks.com/en/getting-started/index.html", source: "Databricks Docs" },
      { title: "Databricks on Azure", description: "Southeast Asia region, Entra ID setup.", url: "https://learn.microsoft.com/en-us/azure/databricks/", source: "Microsoft Docs" },
      { title: "Terraform SRA", description: "Security reference architecture for workspaces.", url: "https://github.com/databricks/terraform-databricks-sra", source: "GitHub" },
    ],
  },
  {
    key: "govern",
    number: "II",
    label: "Govern",
    kicker: "Control the data",
    items: [
      { title: "Unity Catalog", description: "Unified governance for data and AI.", url: "https://docs.databricks.com/aws/en/data-governance/unity-catalog/", source: "Databricks Docs" },
      { title: "System Tables", description: "Audit logs, lineage, billing — queryable.", url: "https://docs.databricks.com/aws/en/admin/system-tables/", source: "Databricks Docs" },
      { title: "Security Analysis Tool", description: "Workspace posture checks against best practice.", url: "https://github.com/databricks-industry-solutions/security-analysis-tool", source: "GitHub" },
    ],
  },
  {
    key: "build",
    number: "III",
    label: "Build",
    kicker: "Ship data & AI",
    items: [
      { title: "Lakeflow Declarative Pipelines", description: "SQL-first pipelines with AUTO CDC.", url: "https://docs.databricks.com/aws/en/delta-live-tables/", source: "Databricks Docs" },
      { title: "Databricks Apps", description: "Full-stack apps on Databricks, auth included.", url: "https://docs.databricks.com/en/dev-tools/databricks-apps/index.html", source: "Databricks Docs" },
      { title: "Genie Best Practices", description: "High-performing natural-language spaces.", url: "https://docs.databricks.com/aws/en/genie/best-practices", source: "Databricks Docs" },
      { title: "Solution Accelerators", description: "Pre-built notebooks & reference implementations for common industry use cases.", url: "https://www.databricks.com/solutions/accelerators", source: "Databricks" },
    ],
  },
  {
    key: "optimize",
    number: "IV",
    label: "Optimize",
    kicker: "Right-size the cost",
    items: [
      { title: "Pricing Calculator", description: "Instance types, DBU rates by SKU.", url: "https://www.databricks.com/product/pricing/product-pricing/instance-types", source: "Databricks" },
      { title: "Cost Optimization Guide", description: "Official best-practice playbook.", url: "https://docs.databricks.com/aws/en/lakehouse-architecture/cost-optimization/best-practices", source: "Databricks Docs" },
      { title: "Compute Config Recommendations", description: "Sizing cores, memory, instance types.", url: "https://docs.databricks.com/aws/en/compute/cluster-config-best-practices", source: "Databricks Docs" },
    ],
  },
];

export interface LibraryRailItem {
  tag: string;
  duration: string;
  title: string;
  description: string;
  url: string;
}

export const libraryVideos: LibraryRailItem[] = [
  {
    tag: 'Channel',
    duration: 'Hub',
    title: 'Databricks on YouTube',
    description: 'Keynotes, customer sessions, and product deep-dives.',
    url: 'https://www.youtube.com/@Databricks',
  },
  {
    tag: 'Skills',
    duration: '5–15 min',
    title: 'Skill Builder',
    description: 'Bite-sized tutorials for everyday Databricks tasks.',
    url: 'https://www.youtube.com/@databricksskillbuilder',
  },
  {
    tag: 'Field',
    duration: 'Channel',
    title: 'NextGen Lakehouse',
    description: 'Field-engineering walkthroughs and real-world lakehouse patterns.',
    url: 'https://www.youtube.com/@nextgenlakehouse',
  },
  {
    tag: 'Summit',
    duration: 'Sessions',
    title: 'Data + AI Summit Sessions',
    description: 'Recorded talks from the latest Summit — architectures, deep-dives, customer panels.',
    url: 'https://www.databricks.com/dataaisummit/sessions',
  },
  {
    tag: 'Customers',
    duration: 'Stories',
    title: 'Customer Stories',
    description: 'How real teams deliver data and AI on Databricks.',
    url: 'https://www.databricks.com/customers',
  },
];

export const libraryDemos: LibraryRailItem[] = [
  {
    tag: 'Demos',
    duration: 'Hub',
    title: 'Databricks Demos Home',
    description: 'The official, curated demo library — short, focused walk-throughs across the platform.',
    url: 'https://www.databricks.com/resources/demos-home',
  },
];

export const libraryBlogs: LibraryRailItem[] = [
  {
    tag: 'Blog',
    duration: 'Hub',
    title: 'Databricks Blog',
    description: 'The main blog — product launches, customer stories, and platform deep-dives.',
    url: 'https://www.databricks.com/blog',
  },
  {
    tag: 'Engineering',
    duration: 'Tech',
    title: 'Engineering Blog',
    description: 'Deep technical posts from the Databricks engineering team.',
    url: 'https://www.databricks.com/blog/category/engineering',
  },
  {
    tag: 'GenAI',
    duration: 'AI posts',
    title: 'Generative AI Posts',
    description: 'All Databricks writing on GenAI, agents, and foundation models.',
    url: 'https://www.databricks.com/blog/category/generative-ai',
  },
  {
    tag: 'Platform',
    duration: 'Product',
    title: 'Platform & Product News',
    description: 'New features, GA announcements, and platform updates.',
    url: 'https://www.databricks.com/blog/category/platform',
  },
];

export interface LearnItem {
  title: string;
  description: string;
  url: string;
  meta: string;
}

export interface LearnColumn {
  key: string;
  number: string;
  kicker: string;
  title: string;
  titleEm: string;
  blurb: string;
  items: LearnItem[];
}

export const learnColumns: LearnColumn[] = [
  {
    key: "train",
    number: "I",
    kicker: "Training",
    title: "Level",
    titleEm: "up.",
    blurb: "Self-paced paths, live certifications, and short-form videos from the people who build Databricks.",
    items: [
      { title: "Databricks Academy", description: "All training courses, certifications, and learning plans.", url: "https://www.databricks.com/learn/training/home", meta: "Free · Self-paced" },
      { title: "Free Trainings", description: "Curated no-cost learning paths for new practitioners.", url: "https://docs.databricks.com/aws/en/getting-started/free-training", meta: "Free · Beginner" },
      { title: "Skill Builder", description: "Short video tutorials for day-to-day Databricks skills.", url: "https://www.youtube.com/@databricksskillbuilder/", meta: "YouTube · 5–15 min" },
      { title: "GenAI Fundamentals", description: "LLMs, RAG, prompt engineering — with free certification.", url: "https://www.databricks.com/learn/training/generative-ai-fundamentals", meta: "Free · Certification" },
    ],
  },
  {
    key: "community",
    number: "II",
    kicker: "Community",
    title: "Find your",
    titleEm: "people.",
    blurb: "Ask questions, share patterns, meet Databricks builders across Singapore and the region.",
    items: [
      { title: "Community Forum", description: "Q&A with Databricks engineers and practitioners worldwide.", url: "https://community.databricks.com/", meta: "Global · Q&A" },
      { title: "User Groups", description: "Local and virtual meetups. Singapore chapter active.", url: "https://usergroups.databricks.com/", meta: "In person · Virtual" },
      { title: "Help Centre", description: "Knowledge base and support articles, searchable.", url: "https://help.databricks.com/s/", meta: "KB · Support" },
      { title: "NextGen Lakehouse", description: "Community-built resource hub with field patterns.", url: "https://www.nextgenlakehouse.com/", meta: "Community · Hub" },
    ],
  },
];
