import { libraryVideos, libraryBlogs } from '../data/content';

export default function Learn({ open }: { open: boolean }) {
  return (
    <section
      className={`reveal-target${open ? ' is-open' : ''}`}
      id="learn"
      aria-label="Learn"
    >
      <div className="section-title" data-ornament="04">
        <h2>
          <em>Learn</em>.
        </h2>
        <span className="tag">Watch · Read</span>
      </div>

      <nav className="lib-jump" aria-label="Jump within Learn">
        <span className="lib-jump-label">Jump to</span>
        <a href="#learn-videos">Videos</a>
        <span className="lib-jump-sep" aria-hidden="true">·</span>
        <a href="#learn-blogs">Latest blogs</a>
      </nav>

      <div className="learn-spread">
        <section
          id="learn-videos"
          className="learn-col"
          aria-labelledby="learn-videos-title"
        >
          <header className="learn-head">
            <span className="learn-num" aria-hidden="true">I</span>
            <div>
              <span className="learn-kicker">Watch</span>
              <h3 id="learn-videos-title" className="learn-title">
                <em>Videos</em>.
              </h3>
            </div>
          </header>
          <p className="learn-blurb">
            Short sessions and channels from the people who build and field Databricks.
          </p>
          <ul className="learn-items">
            {libraryVideos.map((v, i) => (
              <li key={v.url}>
                <a href={v.url} target="_blank" rel="noopener noreferrer">
                  <span className="learn-item-n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="learn-item-body">
                    <span className="learn-item-title">{v.title}</span>
                    <span className="learn-item-desc">{v.description}</span>
                    <span className="learn-item-meta">
                      {v.tag} · {v.duration}
                    </span>
                  </div>
                  <span className="learn-item-go" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="learn-blogs"
          className="learn-col"
          aria-labelledby="learn-blogs-title"
        >
          <header className="learn-head">
            <span className="learn-num" aria-hidden="true">II</span>
            <div>
              <span className="learn-kicker">Read</span>
              <h3 id="learn-blogs-title" className="learn-title">
                Latest <em>blogs</em>.
              </h3>
            </div>
          </header>
          <p className="learn-blurb">
            Fresh posts from Databricks — platform, engineering, and GenAI.
          </p>
          <ul className="learn-items">
            {libraryBlogs.map((b, i) => (
              <li key={b.url}>
                <a href={b.url} target="_blank" rel="noopener noreferrer">
                  <span className="learn-item-n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="learn-item-body">
                    <span className="learn-item-title">{b.title}</span>
                    <span className="learn-item-desc">{b.description}</span>
                    <span className="learn-item-meta">{b.tag}</span>
                  </div>
                  <span className="learn-item-go" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
