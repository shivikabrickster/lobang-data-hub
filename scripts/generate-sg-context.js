// Generates a plain-text SG features context file for the chatbot
// Run after scraper updates sgFeaturesData.ts

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFile = join(__dirname, '..', 'src', 'data', 'sgFeaturesData.ts');
const outputFile = join(__dirname, '..', 'api', 'sg-features-context.json');

const source = readFileSync(dataFile, 'utf-8');

// Extract LAST_UPDATED
const lastUpdated = source.match(/LAST_UPDATED = '(.+?)'/)?.[1] || 'unknown';

// Parse feature availability arrays for each cloud
function extractFeatures(cloud) {
  // Match the array for the given cloud provider
  const regex = new RegExp(`${cloud}: \\[([\\s\\S]*?)\\],\\n\\n`, 'g');
  const match = regex.exec(source);
  if (!match) return [];

  const features = [];
  const featureRegex = /\{ feature: '(.+?)', category: '(.+?)', serviceInSg: '(.+?)', modelInSg: '(.+?)', comments: '(.*?)'(?:, source: '(.*?)')? \}/g;
  let m;
  while ((m = featureRegex.exec(match[1])) !== null) {
    features.push({
      feature: m[1],
      category: m[2],
      serviceInSg: m[3],
      modelInSg: m[4],
      comments: m[5],
      source: m[6] || '',
    });
  }
  return features;
}

// Parse model availability
function extractModels() {
  const section = source.match(/aws: \[\n([\s\S]*?)\],\n\s*azure: \[\]/);
  if (!section) return [];

  const models = [];
  const modelRegex = /\{ model: '(.+?)', availableInSg: (true|false), comments: '(.*?)' \}/g;
  let m;
  while ((m = modelRegex.exec(section[1])) !== null) {
    models.push({ model: m[1], available: m[2] === 'true', comments: m[3] });
  }
  return models;
}

// Build plain-text context
const awsFeatures = extractFeatures('aws');
const azureFeatures = extractFeatures('azure');
const gcpFeatures = extractFeatures('gcp');
const models = extractModels();

function statusLabel(s) {
  return { yes: 'Available', no: 'Unavailable', tbc: 'TBC', na: 'N/A', depends: 'Depends' }[s] || s;
}

let context = `# Databricks Feature Availability in Singapore\nLast updated: ${lastUpdated}\nSource: Auto-scraped from official Databricks documentation\n\n`;

// AWS
context += `## AWS (ap-southeast-1)\n\n`;
context += `### Agentic AI Features\n`;
awsFeatures.filter(f => f.category === 'agentic').forEach(f => {
  context += `- ${f.feature}: Service ${statusLabel(f.serviceInSg)}, Model ${statusLabel(f.modelInSg)}${f.comments ? ` — ${f.comments}` : ''}\n`;
});
context += `\n### ML & Platform Features\n`;
awsFeatures.filter(f => f.category === 'ml').forEach(f => {
  context += `- ${f.feature}: Service ${statusLabel(f.serviceInSg)}, Model ${statusLabel(f.modelInSg)}${f.comments ? ` — ${f.comments}` : ''}\n`;
});

// Models
context += `\n### Models Available in ap-southeast-1\n`;
models.filter(m => m.available).forEach(m => {
  context += `- ${m.model}${m.comments ? ` — ${m.comments}` : ''}\n`;
});
context += `\n### Models NOT in Singapore (Japan/Tokyo only)\n`;
models.filter(m => !m.available).forEach(m => {
  context += `- ${m.model}${m.comments ? ` — ${m.comments}` : ''}\n`;
});

// Azure
context += `\n## Azure (Southeast Asia)\n\n`;
azureFeatures.filter(f => f.category === 'agentic').forEach(f => {
  context += `- ${f.feature}: Service ${statusLabel(f.serviceInSg)}, Model ${statusLabel(f.modelInSg)}${f.comments ? ` — ${f.comments}` : ''}\n`;
});
azureFeatures.filter(f => f.category === 'ml').forEach(f => {
  context += `- ${f.feature}: Service ${statusLabel(f.serviceInSg)}, Model ${statusLabel(f.modelInSg)}${f.comments ? ` — ${f.comments}` : ''}\n`;
});

// GCP
context += `\n## GCP (asia-southeast1)\n\n`;
gcpFeatures.forEach(f => {
  context += `- ${f.feature}: Service ${statusLabel(f.serviceInSg)}, Model ${statusLabel(f.modelInSg)}${f.comments ? ` — ${f.comments}` : ''}\n`;
});

const output = { lastUpdated, context };
writeFileSync(outputFile, JSON.stringify(output, null, 2));
console.log(`Generated SG features context (${context.length} chars) → ${outputFile}`);
