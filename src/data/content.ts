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
