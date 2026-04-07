// Vercel Serverless Function — RAG chatbot with Tavily search + Groq LLM
// API keys stay server-side, never exposed to the browser

// ── Tavily doc search ──

async function searchDocs(query) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query: `Databricks ${query}`,
        search_depth: 'basic',
        max_results: 5,
        include_domains: ['docs.databricks.com', 'learn.microsoft.com/en-us/azure/databricks'],
        include_answer: false,
        include_raw_content: false,
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.results || null;
  } catch {
    return null;
  }
}

function formatSearchContext(results) {
  if (!results || results.length === 0) return '';

  const docs = results
    .map((r, i) => `[${i + 1}] ${r.title}\nSource: ${r.url}\n${r.content}`)
    .join('\n\n');

  return `\n\n## Retrieved from Official Databricks Documentation\nUse the following documentation excerpts to answer the user's question. Always cite the source URL in your answer.\n\n${docs}`;
}

// ── System prompt ──

const BASE_SYSTEM_PROMPT = `You are the Lobang Bot, a helpful assistant for the Lobang Data Hub — a Databricks resource hub for Singapore public sector agencies.

You help users understand Databricks features, availability in Singapore, and guide them to the right resources.

## Databricks in Singapore
- AWS region: ap-southeast-1 (Singapore)
- Azure region: Southeast Asia (Singapore)
- GCP region: asia-southeast1 (Singapore)

## How to Answer
- IMPORTANT: Base your answers primarily on the Retrieved Documentation section below. This is live data from official Databricks docs.
- Always cite source URLs as markdown links: [Link Text](URL)
- If the retrieved documentation doesn't cover the question, say so honestly — do not guess or make up information.
- Be concise, helpful, and friendly. Use bullet points for lists.
- When relevant, contextualize for Singapore public sector use cases (data residency, cross-geo requirements, available regions).
- When user asks about a feature, provide BOTH AWS and Azure links where available.`;

// Fallback prompt used when Tavily is unavailable — keeps the hardcoded knowledge as backup
const FALLBACK_KNOWLEDGE = `

## Feature-Specific Documentation Links (include relevant links in your answers)

### Data Governance & Catalog
- Unity Catalog: AWS: https://docs.databricks.com/aws/en/data-governance/unity-catalog/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/data-governance/unity-catalog/
- Delta Sharing: AWS: https://docs.databricks.com/aws/en/delta-sharing/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/delta-sharing/
- Clean Rooms: AWS: https://docs.databricks.com/aws/en/clean-rooms/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/clean-rooms/
- System Tables: AWS: https://docs.databricks.com/aws/en/admin/system-tables/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/admin/system-tables/

### Data Engineering & Ingestion
- Lakeflow Connect: AWS: https://docs.databricks.com/aws/en/ingestion/lakeflow-connect/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/ingestion/lakeflow-connect/
- Spark Declarative Pipelines (DLT): AWS: https://docs.databricks.com/aws/en/delta-live-tables/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/delta-live-tables/
- Jobs & Workflows: AWS: https://docs.databricks.com/aws/en/jobs/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/jobs/

### AI & ML
- Genie: AWS: https://docs.databricks.com/aws/en/genie/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/genie/
- Agent Bricks: AWS: https://docs.databricks.com/aws/en/generative-ai/agent-bricks/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/generative-ai/agent-bricks/
- Vector Search: AWS: https://docs.databricks.com/aws/en/vector-search/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/vector-search/
- Model Serving: AWS: https://docs.databricks.com/aws/en/machine-learning/model-serving/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/machine-learning/model-serving/
- Foundation Model APIs: AWS: https://docs.databricks.com/aws/en/machine-learning/model-serving/foundation-model-overview
- MLflow: AWS: https://docs.databricks.com/aws/en/mlflow/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/mlflow/
- MCP Servers: AWS: https://docs.databricks.com/aws/en/generative-ai/mcp/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/generative-ai/mcp/

### Storage & Databases
- Lakebase: AWS: https://docs.databricks.com/aws/en/oltp | Azure: https://learn.microsoft.com/en-us/azure/databricks/oltp/

### Apps & Development
- Databricks Apps: AWS: https://docs.databricks.com/aws/en/dev-tools/databricks-apps/ | Azure: https://learn.microsoft.com/en-us/azure/databricks/dev-tools/databricks-apps/

### Region & Availability
- Designated Services (SG): https://docs.databricks.com/aws/en/resources/designated-services
- Feature Region Support: AWS: https://docs.databricks.com/aws/en/resources/feature-region-support | Azure: https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support

### External Resources
- Help Centre: https://help.databricks.com/s/
- Community: https://community.databricks.com
- Pricing: https://www.databricks.com/product/pricing
- Security & Trust: https://www.databricks.com/trust/security-features

IMPORTANT: These links are a fallback reference. If you don't have retrieved documentation context, use these links to guide users but clearly state that you recommend checking the official docs for the latest information.`;

// ── Handler ──

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }

  try {
    const { messages } = req.body;

    // Get the user's latest message for Tavily search
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    const query = lastUserMessage?.text || '';

    // Search official docs via Tavily
    const searchResults = await searchDocs(query);
    const searchContext = formatSearchContext(searchResults);

    // Build system prompt: base + retrieved docs (or fallback if no results)
    let systemPrompt = BASE_SYSTEM_PROMPT;
    if (searchContext) {
      systemPrompt += searchContext;
    } else {
      systemPrompt += FALLBACK_KNOWLEDGE;
    }

    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.text,
      })),
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: chatMessages,
        temperature: 0.3,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Groq API error:', response.status, err);
      return res.status(502).json({ error: 'LLM API error', status: response.status, detail: err });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
