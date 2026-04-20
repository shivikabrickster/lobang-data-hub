import { libraryFeature, libraryLanes, libraryWatch } from '../data/content';

export default function IndexGrid({ open }: { open: boolean }) {
  const total =
    1 +
    libraryLanes.reduce((n, l) => n + l.items.length, 0) +
    libraryWatch.length;

  return (
    <section
      className={`reveal-target${open ? ' is-open' : ''}`}
      id="sections"
      aria-label="The library"
    >
      <div className="section-title" data-ornament="03">
        <h2>
          The <em>library</em>.
        </h2>
        <span className="tag">{total} hand-picked</span>
      </div>

      <nav className="lib-jump" aria-label="Jump within the library">
        <span className="lib-jump-label">Jump to</span>
        <a href="#lib-feature">Featured</a>
        <span className="lib-jump-sep" aria-hidden="true">·</span>
        <a href="#lib-lanes">Lanes</a>
        <span className="lib-jump-sep" aria-hidden="true">·</span>
        <a href="#watch-rail">Watch</a>
      </nav>

      <p className="lib-deck">
        A short shelf, not a landfill. Every link is one we&apos;d send a customer on day
        one — curated for Singapore public-sector teams standing up Databricks.
      </p>

      <article className="spread">
        <a
          id="lib-feature"
          className="spread-feature"
          href={libraryFeature.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${libraryFeature.title} — ${libraryFeature.blurb}`}
        >
          <span className="spread-kicker">{libraryFeature.kicker}</span>
          <h3 className="spread-title">{libraryFeature.title}</h3>
          <p className="spread-blurb">{libraryFeature.blurb}</p>
          <span className="spread-foot">
            <span className="spread-meta">{libraryFeature.meta}</span>
            <span className="spread-src">{libraryFeature.source} ↗</span>
          </span>
          <span className="spread-drop" aria-hidden="true">
            {libraryFeature.title.charAt(0)}
          </span>
        </a>

        <div id="lib-lanes" className="spread-lanes">
          {libraryLanes.map((lane) => (
            <section key={lane.key} className="lane" aria-labelledby={`lane-${lane.key}`}>
              <header className="lane-head">
                <span className="lane-num" aria-hidden="true">
                  {lane.number}
                </span>
                <div>
                  <h4 id={`lane-${lane.key}`} className="lane-label">
                    {lane.label}
                  </h4>
                  <span className="lane-kicker">{lane.kicker}</span>
                </div>
              </header>
              <ul className="lane-items">
                {lane.items.map((it) => (
                  <li key={it.url}>
                    <a href={it.url} target="_blank" rel="noopener noreferrer">
                      <span className="lane-item-title">{it.title}</span>
                      <span className="lane-item-desc">{it.description}</span>
                      <span className="lane-item-src">
                        {it.source} <span aria-hidden="true">↗</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section id="watch-rail" className="watch-rail" aria-labelledby="watch-rail-title">
          <header className="watch-rail-head">
            <span className="watch-rail-num" aria-hidden="true">V</span>
            <div>
              <h4 id="watch-rail-title" className="lane-label">
                Watch
              </h4>
              <span className="lane-kicker">Videos &amp; demos</span>
            </div>
          </header>
          <ul className="watch-rail-list">
            {libraryWatch.map((v) => (
              <li key={v.url}>
                <a
                  className="watch-rail-card"
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="watch-rail-thumb" aria-hidden="true">
                    <span className="watch-rail-tag">{v.tag}</span>
                    <span className="watch-rail-play">
                      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M6 4 L16 10 L6 16 Z" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="watch-rail-dur">{v.duration}</span>
                  </span>
                  <span className="watch-rail-body">
                    <span className="watch-rail-title">{v.title}</span>
                    <span className="watch-rail-desc">{v.description}</span>
                    <span className="watch-rail-src">
                      Watch <span aria-hidden="true">↗</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </section>
  );
}
