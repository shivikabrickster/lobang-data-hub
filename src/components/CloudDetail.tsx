import { useEffect } from 'react';
import { CLOUDS } from '../data/clouds';

interface Props {
  cloud: 'aws' | 'azure';
  onBack: () => void;
}

export default function CloudDetail({ cloud, onBack }: Props) {
  const spec = CLOUDS[cloud];
  const total = spec.lanes.reduce((n, l) => n + l.items.length, 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', onKey);
    window.scrollTo({ top: 0, behavior: 'auto' });
    return () => window.removeEventListener('keydown', onKey);
  }, [onBack]);

  return (
    <section className="cloud-detail" aria-labelledby="cloud-detail-heading">
      <nav className="cloud-top" aria-label="Cloud guide navigation">
        <button type="button" className="cloud-back" onClick={onBack}>
          <span className="arr" aria-hidden="true">←</span>
          <span>Back to overview</span>
        </button>
        <span className="cloud-top-part" aria-hidden="true">{spec.part}</span>
        <a
          className="cloud-top-docs"
          href={spec.docsHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {spec.docsLabel} <span className="arr" aria-hidden="true">↗</span>
        </a>
      </nav>

      <header className="cloud-detail-head">
        <span className="ghost-letter" aria-hidden="true">{spec.letter}</span>
        <div className="part">{spec.part}</div>
        <h2 id="cloud-detail-heading">
          {spec.name} <em>{spec.nameEm}</em>
        </h2>
        <p className="cloud-detail-tagline">{spec.tagline}</p>
        <p className="cloud-detail-blurb">{spec.blurb}</p>
        <div className="chips">
          {spec.chips.map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
          <span className="chip chip-count">
            <em>{total}</em>&nbsp;resources
          </span>
        </div>
      </header>

      <div className="cloud-detail-body">
        <aside className="cloud-toc" aria-label="Sections">
          <span className="cloud-toc-label">On this page</span>
          <ol>
            {spec.lanes.map((lane) => (
              <li key={lane.id}>
                <a href={`#${lane.id}`}>
                  <span className="toc-num">{lane.kicker}</span>
                  <span className="toc-title">{lane.title}</span>
                  <span className="toc-count">{lane.items.length}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="cloud-lanes-detail">
          {spec.lanes.map((lane) => (
            <section key={lane.id} id={lane.id} className="cloud-lane-detail">
              <header className="cloud-lane-head">
                <span className="cloud-lane-num" aria-hidden="true">{lane.kicker}</span>
                <h3>{lane.title}</h3>
                <p>{lane.summary}</p>
              </header>
              <ul className="cloud-lane-items">
                {lane.items.map((item) => (
                  <li key={item.href}>
                    <a
                      className="cloud-item-link"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="cloud-item-body">
                        <span className="cloud-item-title">{item.title}</span>
                        <span className="cloud-item-desc">{item.desc}</span>
                      </div>
                      <span className="cloud-item-src">
                        {item.source} <span className="arr" aria-hidden="true">↗</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <footer className="cloud-detail-foot">
        <button type="button" className="cloud-back" onClick={onBack}>
          <span className="arr" aria-hidden="true">←</span>
          <span>Back to overview</span>
        </button>
        <a
          className="cloud-top-docs"
          href={spec.docsHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open {spec.docsLabel} <span className="arr" aria-hidden="true">↗</span>
        </a>
      </footer>
    </section>
  );
}
