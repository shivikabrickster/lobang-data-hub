// SG Features Availability Data
// Auto-updated by GitHub Actions cron job from public Databricks docs
// Manual overrides for 3 features not on any public region page

export const LAST_UPDATED = '2026-05-01';

export type AvailabilityStatus = 'yes' | 'no' | 'tbc' | 'na' | 'depends';
export type CloudProvider = 'aws' | 'azure' | 'gcp';
export type FeatureCategory = 'agentic' | 'ml' | 'model';

export interface FeatureAvailability {
  feature: string;
  category: FeatureCategory;
  serviceInSg: AvailabilityStatus;
  modelInSg: AvailabilityStatus;
  comments: string;
  source?: string; // URL to official docs
}

export interface ModelAvailability {
  model: string;
  availableInSg: boolean;
  comments: string;
}

export interface GenieAdminRow {
  partnerPowered: string;
  crossGeo: string;
  chatGenie: string;
  chatGenieCode: string;
  agentGenie: string;
  agentGenieCode: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'general' | 'genie-code';
}

export interface SgAgencyOption {
  label: string;
  title: string;
  description: string;
}

// ============================================================
// SECTION 1: Feature Availability by Cloud Provider
// ============================================================

export const featureAvailability: Record<CloudProvider, FeatureAvailability[]> = {
  aws: [
    // ── Agentic AI ──
    { feature: 'Genie Code (Chat & Cell Actions)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'yes', comments: 'In-region, no X-geo needed', source: 'https://docs.databricks.com/aws/en/resources/designated-services' },
    { feature: 'Genie Code (Agent)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'yes', comments: 'In-region, enforce in-geo enabled', source: 'https://docs.databricks.com/aws/en/resources/designated-services' },
    { feature: 'Genie (excl. Research Agent)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'yes', comments: 'In-country per Mar 2026 release', source: 'https://docs.databricks.com/aws/en/release-notes/product/2026/march' },
    { feature: 'Genie Agent Mode (Research)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'Beta. X-geo required', source: 'https://docs.databricks.com/aws/en/resources/designated-services' },
    { feature: 'AI/BI Dashboards', category: 'agentic', serviceInSg: 'yes', modelInSg: 'yes', comments: 'In-region, no X-geo needed', source: 'https://docs.databricks.com/aws/en/resources/designated-services' },
    { feature: 'AI Gateway', category: 'agentic', serviceInSg: 'yes', modelInSg: 'na', comments: 'Beta', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'Agent Framework & Evaluation', category: 'agentic', serviceInSg: 'yes', modelInSg: 'na', comments: 'Available in ap-southeast-1', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'Agent Bricks: Custom Code', category: 'agentic', serviceInSg: 'yes', modelInSg: 'yes', comments: 'Deploy on your compute', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'Agent Bricks: Knowledge Asst.', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'Agent Bricks: Multi-Agent Supervisor', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'FMAPI (Pay-per-token)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'yes', comments: 'Models in ap-southeast-1', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'FMAPI (Provisioned Throughput)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'yes', comments: 'Available in ap-southeast-1', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'AI Functions (ai_query)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'SG/Japan/Korea processing', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'ai_query (Batch Inference)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'SG/Japan/Korea processing', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'ai_parse_document', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'SG/Japan/Korea processing', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'AI-generated Comments', category: 'agentic', serviceInSg: 'yes', modelInSg: 'yes', comments: 'In-region, no X-geo needed', source: 'https://docs.databricks.com/aws/en/resources/designated-services' },
    { feature: 'AI-based Autocomplete', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://docs.databricks.com/aws/en/resources/designated-services' },
    { feature: 'Lakebase (Stateful Agents)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'na', comments: 'In-region, Lakebase GA', source: 'https://docs.databricks.com/aws/en/oltp/projects/manage-projects' },
    { feature: 'Managed MCP Servers', category: 'agentic', serviceInSg: 'yes', modelInSg: 'na', comments: 'Preview', source: 'https://learn.microsoft.com/en-us/azure/databricks/generative-ai/mcp/external-mcp' },
    { feature: 'Custom MCP Servers', category: 'agentic', serviceInSg: 'yes', modelInSg: 'na', comments: 'Via UC connections', source: 'https://learn.microsoft.com/en-us/azure/databricks/generative-ai/mcp/external-mcp' },
    { feature: 'AI Guardrails (Built-in)', category: 'agentic', serviceInSg: 'no', modelInSg: 'no', comments: 'Public Preview. Not supported in X-geo regions', source: 'https://docs.databricks.com/aws/en/ai-gateway/overview-serving-endpoints' },
    { feature: 'Custom Guardrails', category: 'agentic', serviceInSg: 'yes', modelInSg: 'depends', comments: 'Private Preview. Depends on model used', source: 'https://docs.databricks.com/aws/en/ai-gateway/overview-serving-endpoints' },
    // ── ML & Platform ──
    { feature: 'Model Serving (CPU)', category: 'ml', serviceInSg: 'yes', modelInSg: 'yes', comments: 'Available in ap-southeast-1', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'Model Serving (GPU)', category: 'ml', serviceInSg: 'yes', modelInSg: 'yes', comments: 'Available in ap-southeast-1', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'Vector Search', category: 'ml', serviceInSg: 'yes', modelInSg: 'na', comments: 'Available in ap-southeast-1', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'Vector Search Reranker', category: 'ml', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo for reranker model', source: 'https://docs.databricks.com/aws/en/vector-search/query-vector-search' },
    { feature: 'Vector Search Full-Text', category: 'ml', serviceInSg: 'yes', modelInSg: 'na', comments: 'Beta', source: 'https://docs.databricks.com/aws/en/vector-search/query-vector-search' },
    { feature: 'Foundation Model Fine-tuning', category: 'ml', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://docs.databricks.com/aws/en/resources/feature-region-support' },
    { feature: 'Data Classification', category: 'ml', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://docs.databricks.com/aws/en/resources/designated-services' },
    { feature: 'Online Feature Store (Lakebase)', category: 'ml', serviceInSg: 'yes', modelInSg: 'na', comments: 'DBR 16.4 LTS ML or serverless', source: 'https://docs.databricks.com/aws/en/oltp/projects/manage-projects' },
    { feature: 'Online Feature Store (3rd Party)', category: 'ml', serviceInSg: 'yes', modelInSg: 'na', comments: 'DynamoDB, Aurora, RDS MySQL', source: 'https://docs.databricks.com/aws/en/machine-learning/feature-store/third-party-online-stores' },
    { feature: 'MLflow 3.0', category: 'ml', serviceInSg: 'yes', modelInSg: 'na', comments: 'Core platform', source: 'https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/concepts/scorers' },
    { feature: 'MLflow LLM Judges', category: 'ml', serviceInSg: 'yes', modelInSg: 'no', comments: 'US-hosted judges; bring your own LLM', source: 'https://docs.databricks.com/aws/en/mlflow3/genai/eval-monitor/concepts/scorers' },
  ],

  azure: [
    // ── Agentic AI ──
    { feature: 'Genie Code (Chat & Cell Actions)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'yes', comments: '', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/designated-services' },
    { feature: 'Genie Code (Agent)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/designated-services' },
    { feature: 'Genie', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/designated-services' },
    { feature: 'Genie Spaces Agent Mode', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/designated-services' },
    { feature: 'AI/BI Dashboards', category: 'agentic', serviceInSg: 'yes', modelInSg: 'yes', comments: '', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/designated-services' },
    { feature: 'AI Gateway', category: 'agentic', serviceInSg: 'yes', modelInSg: 'na', comments: 'Beta', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support' },
    { feature: 'Agent Framework & Evaluation', category: 'agentic', serviceInSg: 'yes', modelInSg: 'na', comments: '', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support' },
    { feature: 'Agent Bricks: Knowledge Asst.', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support' },
    { feature: 'Agent Bricks: Multi-Agent Supervisor', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support' },
    { feature: 'FMAPI (Pay-per-token)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support' },
    { feature: 'FMAPI (Provisioned Throughput)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support' },
    { feature: 'AI Functions (ai_query)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo for some functions', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support' },
    { feature: 'ai_parse_document', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support' },
    { feature: 'AI-generated Comments', category: 'agentic', serviceInSg: 'yes', modelInSg: 'yes', comments: '', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/designated-services' },
    { feature: 'AI-based Autocomplete', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/designated-services' },
    // ── ML & Platform ──
    { feature: 'Model Serving (CPU)', category: 'ml', serviceInSg: 'yes', modelInSg: 'yes', comments: '', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support' },
    { feature: 'Model Serving (GPU)', category: 'ml', serviceInSg: 'yes', modelInSg: 'yes', comments: '', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support' },
    { feature: 'Vector Search', category: 'ml', serviceInSg: 'yes', modelInSg: 'na', comments: '', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support' },
    { feature: 'Data Classification', category: 'ml', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://learn.microsoft.com/en-us/azure/databricks/resources/designated-services' },
  ],

  gcp: [
    // ── Agentic AI ──
    { feature: 'AI Gateway', category: 'agentic', serviceInSg: 'yes', modelInSg: 'na', comments: 'Beta', source: 'https://docs.databricks.com/gcp/en/resources/feature-region-support' },
    { feature: 'Agent Framework & Evaluation', category: 'agentic', serviceInSg: 'yes', modelInSg: 'na', comments: '', source: 'https://docs.databricks.com/gcp/en/resources/feature-region-support' },
    { feature: 'Agent Bricks: Knowledge Asst.', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://docs.databricks.com/gcp/en/resources/feature-region-support' },
    { feature: 'Agent Bricks: Multi-Agent Supervisor', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://docs.databricks.com/gcp/en/resources/feature-region-support' },
    { feature: 'FMAPI (Pay-per-token)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://docs.databricks.com/gcp/en/resources/feature-region-support' },
    { feature: 'FMAPI (Provisioned Throughput)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://docs.databricks.com/gcp/en/resources/feature-region-support' },
    { feature: 'AI Functions (ai_query)', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://docs.databricks.com/gcp/en/resources/feature-region-support' },
    { feature: 'ai_parse_document', category: 'agentic', serviceInSg: 'yes', modelInSg: 'no', comments: 'X-geo required', source: 'https://docs.databricks.com/gcp/en/resources/feature-region-support' },
    // ── ML & Platform ──
    { feature: 'Model Serving (CPU)', category: 'ml', serviceInSg: 'yes', modelInSg: 'yes', comments: '', source: 'https://docs.databricks.com/gcp/en/resources/feature-region-support' },
    { feature: 'Model Serving (GPU)', category: 'ml', serviceInSg: 'yes', modelInSg: 'yes', comments: '', source: 'https://docs.databricks.com/gcp/en/resources/feature-region-support' },
    { feature: 'Vector Search', category: 'ml', serviceInSg: 'yes', modelInSg: 'na', comments: '', source: 'https://docs.databricks.com/gcp/en/resources/feature-region-support' },
  ],
};

// ============================================================
// SECTION 1B: Model Availability in Singapore (AWS)
// ============================================================

export const modelAvailability: Record<CloudProvider, ModelAvailability[]> = {
  aws: [
    // From foundation-model-overview (ap-southeast-1)
    { model: 'Claude Sonnet 4.6', availableInSg: false, comments: 'Available in ap-northeast-1 (Tokyo) only' },
    { model: 'Claude Sonnet 4.5', availableInSg: false, comments: 'Available in ap-northeast-1 (Tokyo) only' },
    { model: 'Claude Sonnet 4', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'Claude Opus 4.6', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'Claude Opus 4.5', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'Claude Opus 4.1', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'Claude 3.7 Sonnet', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'Claude Haiku 4.5', availableInSg: false, comments: 'Available in ap-northeast-1 (Tokyo) only' },
    { model: 'GPT-5 series (5, 5-1, 5-2)', availableInSg: true, comments: 'Full GPT-5 series in ap-southeast-1' },
    { model: 'GPT-5 mini/nano', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'GPT-4 series', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'GPT OSS 20B / 120B', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'Llama 3.3 70B', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'Llama 3.1 405B / 8B', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'Llama 4 Maverick', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'Gemini 3.1 & 3 series', availableInSg: true, comments: 'Full Gemini series in ap-southeast-1' },
    { model: 'Qwen3 Embedding 0.6B', availableInSg: true, comments: 'Embedding model only. Larger Qwen models not in SG' },
    { model: 'Qwen3 Next 80B', availableInSg: false, comments: 'Available in ap-northeast-1 (Tokyo) only' },
    { model: 'GPT-5 Codex series', availableInSg: false, comments: 'Available in ap-northeast-1 (Tokyo) only' },
    { model: 'GTE Large EN (Embedding)', availableInSg: true, comments: 'Available in ap-southeast-1' },
    { model: 'Gemma 3 12B', availableInSg: true, comments: 'Available in ap-southeast-1 for batch inference' },
  ],
  azure: [],
  gcp: [],
};

// ============================================================
// SECTION 2: Genie Key Admin Settings
// ============================================================

export const genieAdminSettings: GenieAdminRow[] = [
  {
    partnerPowered: 'Enabled',
    crossGeo: 'Disabled',
    chatGenie: 'ON',
    chatGenieCode: 'ON',
    agentGenie: 'OFF',
    agentGenieCode: 'OFF',
  },
  {
    partnerPowered: 'Disabled',
    crossGeo: 'Disabled',
    chatGenie: 'OFF',
    chatGenieCode: 'OFF',
    agentGenie: 'OFF',
    agentGenieCode: 'OFF',
  },
];

export const genieAdminNote = 'Traffic is processed within the same country as the workspace region for Singapore when "Enforce data processing within workspace Geography for Designated Services" is enabled.';

// ============================================================
// SECTION 3: FAQ
// ============================================================

export const faqItems: FaqItem[] = [
  // General FAQ (slides 31-33)
  {
    question: 'What models are you using?',
    answer: 'Please refer to the Model Availability table above for the full list of models and their regional availability.',
    category: 'general',
  },
  {
    question: 'Is my data being used to train models?',
    answer: 'No, neither Databricks nor our model partner (Azure OpenAI or Anthropic on Databricks) trains generative models using customer data.',
    category: 'general',
  },
  {
    question: 'Is row-level data being sent to the models?',
    answer: 'Generally, these features will send small amounts of data from your tables or results to the model to improve accuracy and functionality, like similar tools in the industry. Examples: Genie data sampling improves accuracy by allowing Genie to use sample data, helping it align user text to the values and structure of your data. The Assistant Agent Mode analyzes cell outputs and reads data samples from tables.',
    category: 'general',
  },
  {
    question: 'What data is sent to AI features?',
    answer: 'We send only what\'s needed to serve the specific user request and stay within token limits. Think narrow slices: representative values for matching, prior results to enable or compact error/context snippets — not bulk exports.',
    category: 'general',
  },
  {
    question: 'Is any content filtering applied to filter for harmful responses?',
    answer: 'When using Azure OpenAI, Databricks also uses Azure OpenAI content filtering to protect users from harmful content. In addition, Databricks has performed an extensive evaluation with thousands of simulated user interactions to ensure that the protections put in place to protect against harmful content, jailbreaks, insecure code generation, and use of third-party copyright content are effective.',
    category: 'general',
  },
  {
    question: 'Do Azure OpenAI or other model partners collect my data?',
    answer: 'No. Databricks has opted into the exemption from abuse monitoring and human review program, under which Microsoft does not store any prompts and completions sent to the Azure OpenAI service.',
    category: 'general',
  },
  {
    question: 'Are there any data residency considerations I should be aware of?',
    answer: 'AI features are enabled with Databricks Geos. Azure Databricks AI features are included within the EU Data Boundary. Workspace admins can optionally enable or disable data processing outside of their Geo.',
    category: 'general',
  },
  {
    question: 'What data is encrypted by default?',
    answer: 'All traffic between the control plane and the Azure OpenAI service or other model partners (>= TLS 1.2). All traffic between the control plane and Databricks-managed models (>= TLS 1.2). All Databricks AI features related storage (AES 256 bit). Optionally enable customer-managed keys (CMK) covering Genie Code and Genie Spaces.',
    category: 'general',
  },
  // Genie Code FAQ (slides 34-37)
  {
    question: 'What data is being sent to the LLM by Genie Code?',
    answer: 'The Genie Code Agents generate responses anchored in your organizational data. This can include using data samples from tables or cell outputs to enable the agent to provide relevant suggestions.',
    category: 'genie-code',
  },
  {
    question: 'Are there any guardrails to prevent dangerous code execution?',
    answer: 'Genie Code Agents have built-in LLM guardrails when using the code execution tool to help reduce unintended actions, such as destruction of data (e.g., tables/files/schemas), changing system permissions, calls to external websites, or other malicious impact. That said, we still recommend reviewing generated code carefully, especially when it touches production data, important tables, or other sensitive operations.',
    category: 'genie-code',
  },
  {
    question: 'Do all Genie Code Agents have the same security controls?',
    answer: 'Yes, all Genie Code Agents, such as the Data Science Agent and the Databricks Engineering Agent have the same underlying pattern, but purpose-built for different use cases.',
    category: 'genie-code',
  },
  {
    question: 'How can customer teams monitor the behavior of Genie Code Agents?',
    answer: 'The Genie Code Agents behavior will appear in audit logs as the user\'s actions. If your customer has requirements on monitoring Genie Code Agents specifically, please let us know so we can gather more information.',
    category: 'genie-code',
  },
  {
    question: 'Are the Genie Code Agents tools limited based on user permissions?',
    answer: 'Yes, any Genie Code Agent can only read data samples, read cell outputs, or execute cells where the user is able to run that operation.',
    category: 'genie-code',
  },
  {
    question: 'Can customer teams set limitations on agent actions?',
    answer: 'Not today. If you have requirements about this, please let us know.',
    category: 'genie-code',
  },
];

// ============================================================
// SECTION 4: Options for SG Agencies
// ============================================================

export const sgAgencyOptions: SgAgencyOption[] = [
  {
    label: 'A',
    title: 'Self-Hosted Models on Classic Compute (CPU/GPU)',
    description: 'Agencies can deploy and run their own open-source or fine-tuned models on classic compute clusters within the Databricks workspace in AWS ap-southeast-1 (Singapore). In this model, all inference is executed on compute resources that run inside the workspace VPC, ensuring that model execution and data processing remain within the Singapore region. This approach supports both CPU and GPU workloads, depending on the instance types approved by the agency.',
  },
  {
    label: 'B',
    title: 'External Models (Regional Cloud Services)',
    description: 'Agencies may also integrate with regional AI services hosted by the cloud provider, such as AWS Bedrock models available in ap-southeast-1, provided the model itself is natively hosted in the Singapore region and does not rely on cross-region inference. In this case, requests are made directly from workloads running in Singapore to the regional service endpoint, and data residency is governed by the cloud provider\'s regional guarantees.',
  },
  {
    label: 'C',
    title: 'Provisioned Throughput / Self-Hosted LLM Deployments',
    description: 'Open-source LLMs such as Meta Llama 3.x can be downloaded from repositories like Hugging Face and deployed on agency-managed compute resources in the Singapore region. These models can be served through custom inference services or internal APIs running on classic clusters. This allows agencies to control model hosting, throughput capacity, and infrastructure sizing, while ensuring that all inference remains within the Singapore region and within the agency\'s network boundary.',
  },
];

// ============================================================
// Helper: Doc source URLs for the scraper
// ============================================================

export const scrapeSources = {
  aws: [
    'https://docs.databricks.com/aws/en/resources/feature-region-support',
    'https://docs.databricks.com/aws/en/resources/designated-services',
    'https://docs.databricks.com/aws/en/machine-learning/model-serving/foundation-model-overview',
    'https://docs.databricks.com/aws/en/oltp/projects/manage-projects',
  ],
  azure: [
    'https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support',
    'https://learn.microsoft.com/en-us/azure/databricks/resources/designated-services',
  ],
  gcp: [
    'https://docs.databricks.com/gcp/en/resources/feature-region-support',
  ],
  releaseNotes: 'https://docs.databricks.com/aws/en/release-notes/product/2026/',
};
