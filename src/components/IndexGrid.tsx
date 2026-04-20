import { libraryFeature, libraryLanes, libraryDemos } from '../data/content';

export default function IndexGrid({ open }: { open: boolean }) {
  const demo = libraryDemos[0];
  const total =
    1 +
    libraryLanes.reduce((n, l) => n + l.items.length, 0) +
    libraryDemos.length;

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
        <a href="#demos">Demo</a>
        <span className="lib-jump-sep" aria-hidden="true">·</span>
        <a href="#release-notes">Releases</a>
      </nav>

      <p className="lib-deck">
        A short shelf, not a landfill. Every link is one we&apos;d send a customer on day
        one — curated for Singapore public-sector teams standing up Databricks.
      </p>

      <article className="spread">
        <div className="spread-left">
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

          <div className="spread-mini-row">
            {demo && (
              <a
                id="demos"
                className="spread-demo-mini"
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${demo.title} — ${demo.description}`}
              >
                <span className="demo-mini-tag">{demo.tag}</span>
                <span className="demo-mini-body">
                  <span className="demo-mini-title">{demo.title}</span>
                  <span className="demo-mini-desc">{demo.description}</span>
                </span>
                <span className="demo-mini-go" aria-hidden="true">↗</span>
              </a>
            )}
            <a
              id="release-notes"
              className="spread-demo-mini"
              href="https://databricksreleasehub.com/timeline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Databricks Release Notes — release timeline"
            >
              <span className="demo-mini-tag">Releases</span>
              <span className="demo-mini-body">
                <span className="demo-mini-title">Databricks release notes</span>
                <span className="demo-mini-desc">
                  Timeline of the latest Databricks platform releases and GA milestones.
                </span>
              </span>
              <span className="demo-mini-go" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

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
      </article>
    </section>
  );
}
