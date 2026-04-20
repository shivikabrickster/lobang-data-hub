import { learnColumns, libraryVideos, libraryBlogs } from '../data/content';

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

      <nav className="lib-jump" aria-label="Jump within Learn">
        <span className="lib-jump-label">Jump to</span>
        <a href="#learn-train">Training</a>
        <span className="lib-jump-sep" aria-hidden="true">·</span>
        <a href="#learn-videos">Videos</a>
        <span className="lib-jump-sep" aria-hidden="true">·</span>
        <a href="#learn-blogs">Blogs</a>
      </nav>

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

      <section id="learn-videos" className="watch-rail" aria-labelledby="learn-videos-title">
        <header className="watch-rail-head">
          <span className="watch-rail-num" aria-hidden="true">V</span>
          <div>
            <h4 id="learn-videos-title" className="lane-label">Videos</h4>
            <span className="lane-kicker">Watch sessions</span>
          </div>
        </header>
        <ul className="watch-rail-list">
          {libraryVideos.map((v) => (
            <li key={v.url}>
              <a className="watch-rail-card" href={v.url} target="_blank" rel="noopener noreferrer">
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
                  <span className="watch-rail-src">Watch <span aria-hidden="true">↗</span></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="learn-blogs" className="watch-rail watch-rail--text" aria-labelledby="learn-blogs-title">
        <header className="watch-rail-head">
          <span className="watch-rail-num" aria-hidden="true">B</span>
          <div>
            <h4 id="learn-blogs-title" className="lane-label">Latest blogs</h4>
            <span className="lane-kicker">Read the posts</span>
          </div>
        </header>
        <ul className="watch-rail-list">
          {libraryBlogs.map((b) => (
            <li key={b.url}>
              <a className="watch-rail-card" href={b.url} target="_blank" rel="noopener noreferrer">
                <span className="watch-rail-ribbon" aria-hidden="true">
                  <span className="watch-rail-tag">{b.tag}</span>
                </span>
                <span className="watch-rail-body">
                  <span className="watch-rail-title">{b.title}</span>
                  <span className="watch-rail-desc">{b.description}</span>
                  <span className="watch-rail-src">Read <span aria-hidden="true">↗</span></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
