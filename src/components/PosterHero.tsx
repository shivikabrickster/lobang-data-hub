import { events } from './Events';

interface Props {
  onPickCloud: () => void;
  onBrowse: () => void;
  onJump: (id: 'whats-new' | 'learn' | 'events' | 'build') => void;
}

const FREE_EDITION_URL = 'https://www.databricks.com/learn/free-edition';
const HELP_CENTRE_URL = 'https://help.databricks.com/s/';

function nextEventLabel(): string {
  const now = Date.now();
  const upcoming = events
    .filter((e) => {
      const t = new Date(e.date).getTime();
      return !Number.isNaN(t) && t >= now - 1000 * 60 * 60 * 24;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const dated = upcoming.find((e) => e.day !== 'TBD');
  if (dated) return `${dated.day} ${dated.month}`;
  return 'See programs';
}

const Icon = {
  sparkle: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  ),
  learn: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M2 8l10-4 10 4-10 4L2 8z" />
      <path d="M6 10v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
      <path d="M22 8v6" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
    </svg>
  ),
  dbxMark: (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M11.9 2.1 1.6 7.8v2.3l10.3 5.7 8.6-4.8v2.9l-8.6 4.7L1.6 12.8v2.5l10.3 5.7 10.3-5.7V9.7L11.9 15.4 3.9 11V9.5l8 4.4 10.3-5.7V5.9L11.9 11.6 3.9 7.2v-.4l8-4.4 8 4.4v.5l1.7-.9V6L11.9 2.1Z"
        fill="currentColor"
      />
    </svg>
  ),
};

export default function PosterHero({ onPickCloud, onBrowse, onJump }: Props) {
  return (
    <section className="poster" aria-labelledby="brand">
      <div className="brand-lockup">
        <h1 className="brand" id="brand">
          <span className="pre">The </span>
          <span className="mark">Lobang</span>
          <span className="post"> Data Hub</span>{' '}
          <span className="flag" role="img" aria-label="Singapore flag">
            🇸🇬
          </span>
        </h1>
      </div>

      <p className="tagline">
        Don&apos;t say bojio! — <em>Your one-stop Databricks resource hub</em>.
      </p>

      <div className="cta-row">
        <button type="button" className="btn btn-primary" onClick={onPickCloud}>
          Pick your cloud <span className="arr" aria-hidden="true">→</span>
        </button>
        <button type="button" className="btn btn-ghost" onClick={onBrowse}>
          Open the library
        </button>
      </div>

      <div className="jump-bento" aria-label="Jump to">
        <button
          type="button"
          className="tile tile-news"
          onClick={() => onJump('whats-new')}
        >
          <span className="tile-icon" aria-hidden="true">{Icon.sparkle}</span>
          <span className="tile-title">
            Latest <em>updates</em>
          </span>
          <span className="tile-arr" aria-hidden="true">↓</span>
        </button>

        <button
          type="button"
          className="tile tile-learn"
          onClick={() => onJump('learn')}
        >
          <span className="tile-icon" aria-hidden="true">{Icon.learn}</span>
          <span className="tile-title">
            Training &amp; <em>community</em>
          </span>
          <span className="tile-arr" aria-hidden="true">↓</span>
        </button>

        <a
          className="tile tile-help"
          href={HELP_CENTRE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="tile-icon tile-icon-dbx" aria-hidden="true">{Icon.dbxMark}</span>
          <span className="tile-title">
            Help <em>Centre</em>
          </span>
          <span className="tile-sub">help.databricks.com</span>
          <span className="tile-arr tile-ext" aria-hidden="true">↗</span>
        </a>

        <button
          type="button"
          className="tile tile-events"
          onClick={() => onJump('events')}
        >
          <span className="tile-icon tile-icon-dbx" aria-hidden="true">{Icon.dbxMark}</span>
          <span className="tile-title">
            <em>Events</em>
          </span>
          <span className="tile-sub">Next: {nextEventLabel()}</span>
          <span className="tile-arr" aria-hidden="true">↓</span>
        </button>

        <button
          type="button"
          className="tile tile-build"
          onClick={() => onJump('build')}
        >
          <span className="tile-icon" aria-hidden="true">{Icon.spark}</span>
          <span className="tile-title">
            Let&apos;s build <em>together</em>
          </span>
          <span className="tile-arr" aria-hidden="true">↓</span>
        </button>

        <a
          className="tile tile-free"
          href={FREE_EDITION_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="tile-icon tile-icon-dbx" aria-hidden="true">{Icon.dbxMark}</span>
          <span className="tile-title">
            Databricks <em>Free&nbsp;Edition</em>
          </span>
          <span className="tile-arr tile-ext" aria-hidden="true">↗</span>
        </a>
      </div>

      <a
        className="powered-by powered-by-foot"
        href="https://www.databricks.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Powered by Databricks"
      >
        <span className="pb-label">Powered&nbsp;by</span>
        <span className="pb-lockup" aria-hidden="true">
          <span className="pb-spark">
            <svg viewBox="0 0 24 24" width="22" height="22" role="img" focusable="false">
              <path
                d="M11.9 2.1 1.6 7.8v2.3l10.3 5.7 8.6-4.8v2.9l-8.6 4.7L1.6 12.8v2.5l10.3 5.7 10.3-5.7V9.7L11.9 15.4 3.9 11V9.5l8 4.4 10.3-5.7V5.9L11.9 11.6 3.9 7.2v-.4l8-4.4 8 4.4v.5l1.7-.9V6L11.9 2.1Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="pb-word" translate="no">Databricks</span>
        </span>
      </a>
    </section>
  );
}
