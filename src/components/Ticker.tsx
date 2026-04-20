import { useEffect, useState } from 'react';
import { announcements } from '../data/content';

interface Item {
  title: string;
  url: string;
  date: string;
}

const fmt = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]}`;
};

const LAUNCH_RE = /\b(ga|generally available|now available|public preview|private preview|\bpreview\b|beta|launching|launched|introducing|announcing)\b/i;

const FALLBACK: Item[] = announcements
  .filter((a) => a.badge === 'GA' || a.badge === 'Preview')
  .slice(0, 8)
  .map((a) => ({ title: a.title, url: a.url, date: a.date }));

export default function Ticker() {
  const [items, setItems] = useState<Item[]>(FALLBACK);

  useEffect(() => {
    const url =
      'https://api.rss2json.com/v1/api.json?rss_url=' +
      encodeURIComponent('https://docs.databricks.com/en/feed.xml');
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data?.status !== 'ok' || !Array.isArray(data.items)) return;
        const live: Item[] = data.items
          .map((i: { title?: string; link?: string; pubDate?: string }) => ({
            title: (i.title || '').trim(),
            url: i.link || 'https://docs.databricks.com/',
            date: i.pubDate || '',
          }))
          .filter((i: Item) => i.title && LAUNCH_RE.test(i.title))
          .slice(0, 20);
        if (live.length >= 4) setItems(live);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="ticker" aria-label="Latest Databricks launches">
      <span className="label">Launches</span>
      <div className="track">
        <div className="scroll">
          {items.map((a, i) => (
            <span key={`a-${i}`}>
              {a.date && <time dateTime={a.date}>{fmt(a.date)}</time>}
              <a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a>
            </span>
          ))}
          {items.map((a, i) => (
            <span key={`b-${i}`} aria-hidden="true">
              {a.date && <time dateTime={a.date}>{fmt(a.date)}</time>}
              <a href={a.url} tabIndex={-1}>{a.title}</a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
