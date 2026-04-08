#!/usr/bin/env python3
"""
Scrapes Databricks public documentation pages to extract Singapore region
feature availability data. Outputs updated TypeScript data file.

Sources:
  AWS:   feature-region-support, designated-services, foundation-model-overview,
         release-notes, oltp/projects/manage-projects
  Azure: feature-region-support, designated-services
  GCP:   feature-region-support

Run: python3 scripts/scrape-sg-features.py
"""

import json
import re
import sys
import urllib.request
from datetime import datetime, timezone, timedelta
from html.parser import HTMLParser


# ── HTML Table Parser ────────────────────────────────────
# Databricks docs use non-standard HTML: each <tr> wrapped in its own <tbody>,
# and tags often lack closing tags. We handle this with a tolerant parser.

class TableParser(HTMLParser):
    """Extracts tables from HTML as list of list of strings."""
    def __init__(self):
        super().__init__()
        self.tables: list = []
        self._in_table = False
        self._in_cell = False
        self._current_table: list = []
        self._current_row: list = []
        self._current_cell = ""

    def handle_starttag(self, tag, attrs):
        if tag == "table":
            self._in_table = True
            self._current_table = []
        elif tag == "tr" and self._in_table:
            # Flush previous row if any
            if self._current_row:
                self._current_table.append(self._current_row)
            self._current_row = []
            self._in_cell = False
        elif tag in ("td", "th") and self._in_table:
            # Flush previous cell
            if self._in_cell and self._current_cell is not None:
                self._current_row.append(self._current_cell.strip())
            self._in_cell = True
            self._current_cell = ""

    def handle_endtag(self, tag):
        if tag == "table" and self._in_table:
            # Flush last cell and row
            if self._in_cell:
                self._current_row.append(self._current_cell.strip())
                self._in_cell = False
            if self._current_row:
                self._current_table.append(self._current_row)
            self._in_table = False
            if self._current_table:
                self.tables.append(self._current_table)
            self._current_table = []
            self._current_row = []
        elif tag == "tr" and self._in_table:
            if self._in_cell:
                self._current_row.append(self._current_cell.strip())
                self._in_cell = False
            if self._current_row:
                self._current_table.append(self._current_row)
                self._current_row = []

    def handle_data(self, data):
        if self._in_cell:
            self._current_cell += data


def fetch_html(url: str) -> str:
    """Fetch URL content as string."""
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  WARNING: Failed to fetch {url}: {e}", file=sys.stderr)
        return ""


def extract_tables(html: str) -> list:
    """Parse HTML and return all tables."""
    parser = TableParser()
    parser.feed(html)
    return parser.tables


# ── AWS Feature Region Support ───────────────────────────

def scrape_feature_region(html: str, sg_key: str = "ap-southeast-1") -> dict:
    """Extract feature availability for a specific region.

    These pages have rows=regions, columns=features.
    We find the SG row and read across all feature columns.
    """
    results = {}
    tables = extract_tables(html)
    for table in tables:
        if not table or len(table) < 2:
            continue
        header = table[0]
        if len(header) < 3:
            continue
        # Find the SG row
        for row in table[1:]:
            is_sg = any(sg_key in cell.lower() or "singapore" in cell.lower() for cell in row[:2])
            if not is_sg:
                continue
            # Map feature columns (skip Region and Location cols)
            for ci in range(2, min(len(header), len(row))):
                feature = header[ci].strip()
                val = row[ci].strip()
                if feature:
                    results[feature] = {
                        "available": "✓" in val,
                        "xgeo": "⥂" in val or "‡" in val,
                        "raw": val,
                    }
            break
    return results


# ── AWS Designated Services ──────────────────────────────

def scrape_aws_designated(html: str) -> dict:
    """Extract Asia column + footnotes from designated-services page."""
    results = {}
    tables = extract_tables(html)
    for table in tables:
        if not table:
            continue
        header = table[0]
        asia_col = None
        for ci, cell in enumerate(header):
            if "asia" in cell.lower():
                asia_col = ci
                break
        if asia_col is None:
            continue
        for row in table[1:]:
            if len(row) > asia_col:
                feature = row[0].strip()
                val = row[asia_col].strip() if asia_col < len(row) else ""
                if feature:
                    footnote = ""
                    for marker in ["†", "‡", "§", "¶", "*"]:
                        if marker in val:
                            footnote = marker
                    results[feature] = {
                        "available": "available" in val.lower(),
                        "not_available": "not available" in val.lower(),
                        "footnote": footnote,
                        "raw": val,
                    }
    return results


# ── Foundation Model Overview ────────────────────────────

def scrape_foundation_models(html: str) -> dict:
    """Extract models available in ap-southeast-1.

    The model overview page has rows=regions, and each cell contains
    a newline-separated list of model names. Models with ⥂ require X-geo.
    """
    models_in_sg = []
    tables = extract_tables(html)
    for table in tables:
        if not table or len(table) < 2:
            continue
        header = table[0]
        # Only process the main region table (has "Region" as first col)
        if not any("region" in h.lower() for h in header[:1]):
            continue
        # Find SG row
        for row in table[1:]:
            is_sg = any("ap-southeast-1" in cell.lower() for cell in row[:1])
            if not is_sg:
                continue
            # Parse model names from each column
            for ci in range(1, len(row)):
                cell = row[ci]
                for line in cell.split("\n"):
                    model = line.strip()
                    if model.startswith("databricks-") or model.startswith("The following"):
                        if model.startswith("databricks-"):
                            clean = model.replace("⥂", "").strip()
                            xgeo = "⥂" in model
                            models_in_sg.append({
                                "model": clean,
                                "xgeo": xgeo,
                                "category": header[ci].strip() if ci < len(header) else "unknown",
                            })
            break
    return {"in_sg": models_in_sg, "count": len(models_in_sg)}


# ── Release Notes ────────────────────────────────────────

def scrape_release_notes(html: str) -> list:
    """Find Singapore-specific feature announcements."""
    sg_features = []
    # Look for "Singapore" or "in-country" mentions near feature names
    singapore_pattern = re.compile(
        r"(singapore|in-country.*singapore|singapore.*in-country)",
        re.IGNORECASE
    )
    matches = singapore_pattern.findall(html)
    if matches:
        sg_features.append("release_notes_has_sg_mentions")
    return sg_features


# ── Main ─────────────────────────────────────────────────

def main():
    print("🔍 Scraping Databricks docs for Singapore feature availability...")
    print()

    results = {
        "last_updated": datetime.now(timezone(timedelta(hours=8))).date().isoformat(),
        "aws": {},
        "azure": {},
        "gcp": {},
    }

    # AWS sources
    urls = {
        "aws_feature_region": "https://docs.databricks.com/aws/en/resources/feature-region-support",
        "aws_designated": "https://docs.databricks.com/aws/en/resources/designated-services",
        "aws_models": "https://docs.databricks.com/aws/en/machine-learning/model-serving/foundation-model-overview",
        "aws_lakebase": "https://docs.databricks.com/aws/en/oltp/projects/manage-projects",
        "azure_feature_region": "https://learn.microsoft.com/en-us/azure/databricks/resources/feature-region-support",
        "azure_designated": "https://learn.microsoft.com/en-us/azure/databricks/resources/designated-services",
        "gcp_feature_region": "https://docs.databricks.com/gcp/en/resources/feature-region-support",
    }

    for name, url in urls.items():
        print(f"  Fetching {name}...")
        html = fetch_html(url)
        if not html:
            continue

        if name == "aws_feature_region":
            results["aws"]["feature_region"] = scrape_feature_region(html, "ap-southeast-1")
            count = sum(1 for v in results["aws"]["feature_region"].values() if isinstance(v, dict) and v.get("available"))
            print(f"    Found {count} features available in ap-southeast-1")

        elif name == "aws_designated":
            results["aws"]["designated"] = scrape_aws_designated(html)
            count = sum(1 for v in results["aws"]["designated"].values() if isinstance(v, dict) and v.get("available"))
            print(f"    Found {count} designated services available in Asia")

        elif name == "aws_models":
            results["aws"]["models"] = scrape_foundation_models(html)
            count = len(results["aws"].get("models", {}).get("in_sg", []))
            print(f"    Found {count} models in ap-southeast-1")

        elif name == "aws_lakebase":
            has_sg = "ap-southeast-1" in html.lower()
            results["aws"]["lakebase_in_sg"] = has_sg
            print(f"    Lakebase in ap-southeast-1: {has_sg}")

        elif name == "azure_feature_region":
            results["azure"]["feature_region"] = scrape_feature_region(html, "southeastasia")
            print(f"    Parsed Azure feature-region-support")

        elif name == "azure_designated":
            results["azure"]["designated"] = scrape_aws_designated(html)  # Same table format
            count = sum(1 for v in results["azure"]["designated"].values() if isinstance(v, dict) and v.get("available"))
            print(f"    Found {count} designated services in Asia Pacific")

        elif name == "gcp_feature_region":
            results["gcp"]["feature_region"] = scrape_feature_region(html, "asia-southeast1")
            count = sum(1 for v in results["gcp"]["feature_region"].values() if isinstance(v, dict) and v.get("available"))
            print(f"    Found {count} features in asia-southeast1")

    # Check release notes for current month
    now = date.today()
    for month_offset in [0, -1]:
        m = now.month + month_offset
        y = now.year
        if m <= 0:
            m += 12
            y -= 1
        month_name = date(y, m, 1).strftime("%B").lower()
        url = f"https://docs.databricks.com/aws/en/release-notes/product/{y}/{month_name}"
        print(f"  Fetching release notes ({month_name} {y})...")
        html = fetch_html(url)
        if html:
            sg_mentions = scrape_release_notes(html)
            if sg_mentions:
                print(f"    Found Singapore mentions in {month_name} release notes")

    # Write results
    output_path = "scripts/scrape-results.json"
    with open(output_path, "w") as f:
        json.dump(results, f, indent=2, default=str)
    print(f"\n✅ Results written to {output_path}")
    print(f"   Last updated: {results['last_updated']}")

    # Summary
    aws_fr = results.get("aws", {}).get("feature_region", {})
    aws_ds = results.get("aws", {}).get("designated", {})
    aws_models = results.get("aws", {}).get("models", {})
    print(f"\n📊 Summary:")
    print(f"   AWS feature-region: {sum(1 for v in aws_fr.values() if isinstance(v, dict) and v.get('available'))} features in SG")
    print(f"   AWS designated:     {sum(1 for v in aws_ds.values() if isinstance(v, dict) and v.get('available'))} services in Asia")
    print(f"   AWS models in SG:   {len(aws_models.get('in_sg', []))}")
    print(f"   Lakebase in SG:     {results.get('aws', {}).get('lakebase_in_sg', False)}")


if __name__ == "__main__":
    main()
