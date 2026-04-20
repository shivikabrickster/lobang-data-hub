import { useState, useMemo } from 'react';

type Kind = 'summit' | 'world-tour' | 'meetup' | 'webinar' | 'training';
type Filter = 'all' | 'in-person' | 'virtual';

interface Event {
  date: string;
  month: string;
  day: string;
  kind: Kind;
  kindLabel: string;
  format: 'in-person' | 'virtual' | 'hybrid';
  formatLabel: string;
  title: string;
  details: string;
  cta: string;
  url: string;
}

export const events: Event[] = [
  {
    date: '2026-06-15',
    month: 'Jun',
    day: '15',
    kind: 'summit',
    kindLabel: 'Flagship Summit',
    format: 'in-person',
    formatLabel: 'San Francisco · In-person',
    title: 'Data + AI Summit 2026',
    details: 'Moscone Center · 4 days · Keynotes, training, certification, 500+ sessions on data, analytics, ML and AI.',
    cta: 'Register',
    url: 'https://www.databricks.com/dataaisummit',
  },
  {
    date: '2026-10-01',
    month: 'Oct',
    day: '01',
    kind: 'world-tour',
    kindLabel: 'World Tour',
    format: 'in-person',
    formatLabel: 'Singapore · In-person',
    title: 'Data + AI World Tour · Singapore',
    details: 'Regional stop of the Data + AI World Tour — SG customers, partners, and Databricks engineering. Date subject to confirmation.',
    cta: 'See schedule',
    url: 'https://www.databricks.com/dataaisummit/worldtour',
  },
];

const EVENTS = events;

export default function Events({ open }: { open: boolean }) {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = useMemo(() => {
    const now = Date.now();
    return EVENTS
      .filter((e) => {
        if (e.day === 'TBD') return false;
        const t = new Date(e.date).getTime();
        return !Number.isNaN(t) && t >= now - 1000 * 60 * 60 * 24;
      })
      .filter((e) => {
        if (filter === 'all') return true;
        if (filter === 'in-person') return e.format === 'in-person' || e.format === 'hybrid';
        if (filter === 'virtual') return e.format === 'virtual' || e.format === 'hybrid';
        return true;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filter]);

  return (
    <section className={`reveal-target${open ? ' is-open' : ''}`} id="events" aria-label="Databricks events">
      <div className="section-title" data-ornament="05">
        <h2><em>Events.</em></h2>
        <span className="tag">Curated from databricks.com/events</span>
      </div>

      <p className="lib-deck">
        The event programs Databricks runs year-round — flagship summits, the World Tour,
        AI Days, community meetups, and live training. Specific dates refresh on each
        programme&apos;s page.
      </p>

      <div className="events-toolbar" role="group" aria-label="Filter events by format">
        {(['all', 'in-person', 'virtual'] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            className="chip-filter"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'in-person' ? 'In-person' : 'Virtual'}
          </button>
        ))}
        <span className="chip-count" aria-live="polite">
          <em>{visible.length}</em>&nbsp;programs
        </span>
      </div>

      <ul className="events-list">
        {visible.map((e) => (
          <li key={`${e.date}-${e.title}`} className="event">
            <a
              className="event-card-link"
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${e.title} — ${e.cta}`}
            >
              <time className="event-date" dateTime={e.date}>
                <span className="m">{e.month}</span>
                <span className="d">{e.day}</span>
              </time>
              <div className="event-body">
                <span className="event-kind">
                  {e.kindLabel} · <em>{e.formatLabel}</em>
                </span>
                <h4>{e.title}</h4>
                <p>{e.details}</p>
              </div>
              <span className="event-link" aria-hidden="true">
                {e.cta} <span className="arr">→</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="events-foot">
        For the full calendar with live dates, see{' '}
        <a href="https://www.databricks.com/events" target="_blank" rel="noopener noreferrer">
          databricks.com/events ↗
        </a>
      </p>
    </section>
  );
}
