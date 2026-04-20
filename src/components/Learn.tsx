import { learnColumns } from '../data/content';

export default function Learn({ open }: { open: boolean }) {
  return (
    <section
      className={`reveal-target${open ? ' is-open' : ''}`}
      id="learn"
      aria-label="Learn & community"
    >
      <div className="section-title" data-ornament="04">
        <h2>
          Learn &amp; <em>community</em>.
        </h2>
        <span className="tag">Level up · Connect</span>
      </div>

      <div className="learn-spread">
        {learnColumns.map((col) => (
          <section key={col.key} className="learn-col" aria-labelledby={`learn-${col.key}`}>
            <header className="learn-head">
              <span className="learn-num" aria-hidden="true">
                {col.number}
              </span>
              <div>
                <span className="learn-kicker">{col.kicker}</span>
                <h3 id={`learn-${col.key}`} className="learn-title">
                  {col.title} <em>{col.titleEm}</em>
                </h3>
              </div>
            </header>
            <p className="learn-blurb">{col.blurb}</p>
            <ul className="learn-items">
              {col.items.map((it, i) => (
                <li key={it.url}>
                  <a href={it.url} target="_blank" rel="noopener noreferrer">
                    <span className="learn-item-n" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="learn-item-body">
                      <span className="learn-item-title">{it.title}</span>
                      <span className="learn-item-desc">{it.description}</span>
                      <span className="learn-item-meta">{it.meta}</span>
                    </div>
                    <span className="learn-item-go" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
