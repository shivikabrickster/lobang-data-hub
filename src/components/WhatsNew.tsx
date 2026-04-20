import { useEffect, useMemo, useState } from 'react';

interface NewsItem {
  title: string;
  date: string; // ISO
  summary: string;
  url: string;
  badge: 'GA' | 'Preview' | 'New' | 'Update' | 'Removed';
  tags: string[];
}

const TWO_MONTHS_MS = 60 * 24 * 60 * 60 * 1000;

function formatDay(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-SG', { day: 'numeric', month: 'short' });
}

function monthKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-SG', { month: 'long', year: 'numeric' });
}

function badgeFor(title: string, tags: string[]): NewsItem['badge'] {
  const t = title.toLowerCase();
  if (/\bremoved\b|deprecated|end of life|eol/.test(t)) return 'Removed';
  if (/\bga\b|generally available|now available/.test(t)) return 'GA';
  if (/public preview|private preview|\bpreview\b|beta/.test(t)) return 'Preview';
  if (tags.some((x) => x.toLowerCase() === 'whatscoming')) return 'New';
  if (/introducing|announcing|\bnew\b/.test(t)) return 'New';
  return 'Update';
}

function stripHtml(s: string) {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Pretty-print raw feed category (decode HTML entities, capitalize known ones)
const TAG_LABEL: Record<string, string> = {
  aibi: 'AI/BI',
  'machine learning & ai': 'ML & AI',
  'generative ai': 'GenAI',
  'unity catalog': 'Unity Catalog',
  genie: 'Genie',
  dashboards: 'Dashboards',
  partners: 'Partners',
  product: 'Product',
  whatscoming: "What's coming",
};
function normaliseTag(raw: string): string {
  const decoded = raw.replace(/&amp;/g, '&').trim();
  const key = decoded.toLowerCase();
  return TAG_LABEL[key] ?? decoded;
}

export default function WhatsNew({ open }: { open: boolean }) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string>('all');

  useEffect(() => {
    const url =
      'https://api.rss2json.com/v1/api.json?rss_url=' +
      encodeURIComponent('https://docs.databricks.com/en/feed.xml');
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data?.status !== 'ok' || !Array.isArray(data.items)) {
          setError('Could not load updates.');
          return;
        }
        const cutoff = Date.now() - TWO_MONTHS_MS;
        const mapped: NewsItem[] = data.items
          .map((i: { title?: string; link?: string; pubDate?: string; description?: string; content?: string; categories?: string[] }) => {
            const title = (i.title || '').trim();
            const tags = (i.categories || []).map(normaliseTag);
            const summary = stripHtml(i.description || i.content || '').slice(0, 240);
            return {
              title,
              date: i.pubDate || '',
              summary,
              url: i.link || 'https://docs.databricks.com/en/release-notes/',
              badge: badgeFor(title, i.categories || []),
              tags,
            };
          })
          .filter((it: NewsItem) => it.title && !Number.isNaN(new Date(it.date).getTime()))
          .filter((it: NewsItem) => new Date(it.date).getTime() >= cutoff)
          .sort((a: NewsItem, b: NewsItem) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setItems(mapped);
      })
      .catch(() => setError('Could not load updates.'))
      .finally(() => setLoading(false));
  }, []);

  // Derive tag filter chips: top tags by count, excluding "Product" (too generic)
  const tagChips = useMemo(() => {
    const counts = new Map<string, number>();
    for (const it of items) for (const t of it.tags) {
      if (t.toLowerCase() === 'product') continue;
      counts.set(t, (counts.get(t) || 0) + 1);
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag, n]) => ({ tag, n }));
  }, [items]);

  const filtered = useMemo(
    () => (activeTag === 'all' ? items : items.filter((it) => it.tags.some((t) => t === activeTag))),
    [items, activeTag]
  );

  // Group by month
  const grouped = useMemo(() => {
    const out: { key: string; label: string; items: NewsItem[] }[] = [];
    const map = new Map<string, { label: string; items: NewsItem[] }>();
    for (const it of filtered) {
      const k = monthKey(it.date);
      if (!map.has(k)) map.set(k, { label: monthLabel(it.date), items: [] });
      map.get(k)!.items.push(it);
    }
    for (const [key, v] of map) out.push({ key, label: v.label, items: v.items });
    return out;
  }, [filtered]);

  return (
    <section className={`reveal-target${open ? ' is-open' : ''}`} id="whats-new" aria-label="What's new">
      <div className="section-title" data-ornament="02">
        <h2><em>What's new.</em></h2>
      </div>

      <div className="events-toolbar" role="group" aria-label="Filter updates by tag">
        <button
          type="button"
          className="chip-filter"
          aria-pressed={activeTag === 'all'}
          onClick={() => setActiveTag('all')}
        >
          All <em className="lib-count">{items.length}</em>
        </button>
        {tagChips.map(({ tag, n }) => (
          <button
            key={tag}
            type="button"
            className="chip-filter"
            aria-pressed={activeTag === tag}
            onClick={() => setActiveTag(tag)}
          >
            {tag} <em className="lib-count">{n}</em>
          </button>
        ))}
      </div>

      {loading && <p className="news-empty">Loading latest updates…</p>}
      {error && !loading && <p className="news-empty">{error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="news-empty">No updates in the last 60 days match this filter.</p>
      )}

      {grouped.map((g) => (
        <div key={g.key} className="news-month">
          <div className="news-month-head">
            <h3>{g.label}</h3>
            <span className="news-month-count">{g.items.length} updates</span>
          </div>
          <ul className="news-list">
            {g.items.map((a) => (
              <li key={a.url} className="news-row">
                <a href={a.url} target="_blank" rel="noopener noreferrer">
                  <time className="news-day" dateTime={a.date}>{formatDay(a.date)}</time>
                  <div className="news-body">
                    <div className="news-row-head">
                      <span className={`news-badge is-${a.badge.toLowerCase()}`}>{a.badge}</span>
                      {a.tags.slice(0, 3).map((t) => (
                        <span key={t} className="news-tag">{t}</span>
                      ))}
                    </div>
                    <h4>{a.title}</h4>
                    {a.summary && <p>{a.summary}</p>}
                  </div>
                  <span className="news-arr" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
