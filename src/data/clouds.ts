export interface CloudItem {
  title: string;
  desc: string;
  href: string;
  source: string;
}

export interface CloudLane {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  items: CloudItem[];
}

export interface CloudSpec {
  id: 'aws' | 'azure';
  part: string;
  letter: string;
  name: string;
  nameEm: string;
  tagline: string;
  blurb: string;
  region: string;
  chips: string[];
  docsHref: string;
  docsLabel: string;
  lanes: CloudLane[];
}

export const CLOUDS: Record<'aws' | 'azure', CloudSpec> = {
  aws: {
    id: 'aws',
    part: 'Part I · AWS',
    letter: 'A',
    name: 'Amazon Web',
    nameEm: 'Services',
    tagline: 'Deploy Databricks on AWS in ap-southeast-1.',
    blurb:
      'A phased reference for Singapore teams landing Databricks on AWS — from region selection through secure workspace deployment, Unity Catalog governance, and day-two operations.',
    region: 'ap-southeast-1',
    chips: ['ap-southeast-1', 'Gov-ready', 'PrivateLink'],
    docsHref: 'https://docs.databricks.com/aws/en/',
    docsLabel: 'docs.databricks.com/aws',
    lanes: [
      {
        id: 'aws-start',
        kicker: 'I',
        title: 'Start here',
        summary:
          'Orient the team. Confirm the region, pick the deployment pattern, and agree on an account model before anyone touches the console.',
        items: [
          {
            title: 'Databricks production planning',
            desc: 'Official 10-phase production-planning guide covering architecture, accounts, networking, and best practices.',
            href: 'https://docs.databricks.com/aws/en/lakehouse-architecture/deployment-guide/',
            source: 'Databricks Docs',
          },
          {
            title: 'Supported regions & feature availability',
            desc: 'Feature-by-region matrix — check serverless, UC, and Delta Sharing before picking a region.',
            href: 'https://docs.databricks.com/aws/en/resources/supported-regions',
            source: 'Databricks Docs',
          },
          {
            title: 'Release notes',
            desc: 'Platform release notes for Databricks on AWS — new features, GA announcements, and Runtime updates.',
            href: 'https://docs.databricks.com/aws/en/release-notes/',
            source: 'Databricks Docs',
          },
        ],
      },
      {
        id: 'aws-deploy',
        kicker: 'II',
        title: 'Deploy',
        summary:
          'Stand up the workspace. Choose between the quickstart template, a customer-managed VPC (BYOVPC), or fully private PrivateLink topology based on your data-classification tier.',
        items: [
          {
            title: 'Manual workspace deployment',
            desc: 'Classic workspace configuration walkthrough (PDF).',
            href: 'https://databricks-solutions.github.io/starter-journey/pdfs/AWS-Automated-Configuration-Classic-Workspace-Deployment.pdf',
            source: 'Starter Journey',
          },
          {
            title: 'Customer-managed VPC (BYOVPC)',
            desc: 'Terraform security reference architecture — subnets, SGs, endpoints.',
            href: 'https://github.com/databricks-solutions/terraform-databricks-sra',
            source: 'GitHub',
          },
          {
            title: 'PrivateLink reference',
            desc: 'Private connectivity Terraform examples for front-end and back-end PrivateLink.',
            href: 'https://github.com/databricks/terraform-databricks-examples',
            source: 'GitHub',
          },
        ],
      },
      {
        id: 'aws-govern',
        kicker: 'III',
        title: 'Secure & govern',
        summary:
          'Plug in identity, turn on Unity Catalog, and wire external locations for S3. Do this before onboarding business users — retrofitting governance later is painful.',
        items: [
          {
            title: 'Single sign-on (SSO)',
            desc: 'Account- and workspace-level SSO setup with IdP of choice.',
            href: 'https://docs.databricks.com/aws/en/admin/sso/index.html',
            source: 'Databricks Docs',
          },
          {
            title: 'User provisioning via SCIM',
            desc: 'Automated user and group lifecycle from your IdP.',
            href: 'https://databricks-solutions.github.io/starter-journey/docs/security-and-identity/user-provisioning',
            source: 'Starter Journey',
          },
          {
            title: 'S3 external locations — official guide',
            desc: 'Step-by-step for UC storage credentials and external locations on S3.',
            href: 'https://docs.databricks.com/aws/en/connect/unity-catalog/cloud-storage/external-locations',
            source: 'Databricks Docs',
          },
          {
            title: 'UC storage credentials & external locations (video)',
            desc: 'Walkthrough of the end-to-end setup for S3.',
            href: 'https://www.youtube.com/watch?v=IOu5S1xqLxI',
            source: 'YouTube',
          },
        ],
      },
      {
        id: 'aws-support',
        kicker: 'IV',
        title: 'Support & feedback',
        summary:
          'File a support ticket, check entitlements, or shape the roadmap. Support channels depend on the Databricks support plan attached to your account.',
        items: [
          {
            title: 'Contact Databricks support',
            desc: 'Open tickets, manage your support contract, and review support plans.',
            href: 'https://docs.databricks.com/aws/en/resources/support',
            source: 'Databricks Docs',
          },
          {
            title: 'Submit product feedback & ideas',
            desc: 'Send ideas directly to the product team to influence the Databricks roadmap.',
            href: 'https://docs.databricks.com/aws/en/resources/ideas',
            source: 'Databricks Docs',
          },
        ],
      },
    ],
  },
  azure: {
    id: 'azure',
    part: 'Part II · Azure',
    letter: 'Az',
    name: 'Microsoft',
    nameEm: 'Azure',
    tagline: 'Deploy Azure Databricks in Southeast Asia.',
    blurb:
      'An IM8-aligned reference for Singapore government workloads on Azure Databricks — regional selection, private-networked workspaces, Entra identity, and Unity Catalog on ADLS.',
    region: 'southeastasia',
    chips: ['southeastasia', 'IM8-aligned', 'Private endpoints'],
    docsHref: 'https://learn.microsoft.com/azure/databricks/',
    docsLabel: 'learn.microsoft.com/azure/databricks',
    lanes: [
      {
        id: 'azure-start',
        kicker: 'I',
        title: 'Start here',
        summary:
          'Confirm the region, subscription layout, and Entra tenant strategy before provisioning the first workspace.',
        items: [
          {
            title: 'Azure Databricks — deployment guide',
            desc: 'Official 10-phase production-planning guide covering account, workspace, UC, network, storage, and operations.',
            href: 'https://learn.microsoft.com/en-us/azure/databricks/lakehouse-architecture/deployment-guide/',
            source: 'Microsoft Docs',
          },
          {
            title: 'Supported regions (Southeast Asia)',
            desc: 'Region and feature availability — confirm serverless / Delta Sharing support for SEA.',
            href: 'https://learn.microsoft.com/en-us/azure/databricks/resources/supported-regions',
            source: 'Microsoft Docs',
          },
          {
            title: 'Release notes',
            desc: 'Platform release notes for Azure Databricks — new features, GA announcements, and Runtime updates.',
            href: 'https://learn.microsoft.com/en-us/azure/databricks/release-notes/product/',
            source: 'Microsoft Learn',
          },
        ],
      },
      {
        id: 'azure-deploy',
        kicker: 'II',
        title: 'Deploy',
        summary:
          'Pick an IaC path. Most SG public-sector workloads land on Terraform with injected VNet and private endpoints disabled on public access.',
        items: [
          {
            title: 'Manual workspace deployment',
            desc: 'Deploy a workspace via Azure Portal — useful for first familiarity.',
            href: 'https://databricks-solutions.github.io/starter-journey/docs/infra-setup/create-workspaces/azure/manual',
            source: 'Starter Journey',
          },
          {
            title: 'Terraform deployment guide',
            desc: 'IaC pattern for workspace provisioning with VNet injection.',
            href: 'https://databricks-solutions.github.io/starter-journey/docs/infra-setup/create-workspaces/azure/terraform',
            source: 'Starter Journey',
          },
          {
            title: 'Terraform module examples',
            desc: 'Reference Terraform modules for Azure Databricks.',
            href: 'https://github.com/databricks/terraform-databricks-examples',
            source: 'GitHub',
          },
          {
            title: 'Private endpoints (back-end & front-end)',
            desc: 'Private Link topology — lock down the data plane and SCC relay.',
            href: 'https://learn.microsoft.com/azure/databricks/security/network/classic/private-link',
            source: 'Microsoft Docs',
          },
        ],
      },
      {
        id: 'azure-govern',
        kicker: 'III',
        title: 'Secure & govern',
        summary:
          'Wire Entra identity into the account, enable Unity Catalog, and mount ADLS as external locations. Do this before onboarding business users.',
        items: [
          {
            title: 'Automatic Identity Management (Entra ID)',
            desc: 'Sync users and groups directly from Entra without SCIM plumbing.',
            href: 'https://learn.microsoft.com/en-us/azure/databricks/admin/users-groups/automatic-identity-management',
            source: 'Microsoft Docs',
          },
          {
            title: 'Storage credentials & external locations (video)',
            desc: 'End-to-end walkthrough for ADLS external locations in Unity Catalog.',
            href: 'https://www.youtube.com/watch?v=kRfNXFh9T3U',
            source: 'YouTube',
          },
        ],
      },
      {
        id: 'azure-support',
        kicker: 'IV',
        title: 'Support & feedback',
        summary:
          'Open a support case through Azure, or file product ideas to the Databricks product team. Support plans are managed via your Azure subscription.',
        items: [
          {
            title: 'Contact Azure support',
            desc: 'Azure support options for Azure Databricks — linked from the official Azure Databricks resources page.',
            href: 'https://azure.microsoft.com/support',
            source: 'Microsoft Azure',
          },
          {
            title: 'Submit product feedback & ideas',
            desc: 'Send ideas directly to the product team to influence the Azure Databricks roadmap.',
            href: 'https://learn.microsoft.com/en-us/azure/databricks/resources/ideas',
            source: 'Microsoft Docs',
          },
        ],
      },
    ],
  },
};
