import { useState, type FormEvent } from 'react';

export default function Build({ open }: { open: boolean }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement | null)?.value;
    if (honeypot) return;
    setSent(true);
  };

  return (
    <section className={`reveal-target${open ? ' is-open' : ''}`} id="build" aria-label="Build with us">
      <div className="section-title" data-ornament="06">
        <h2><em>Let's build something.</em></h2>
        <span className="tag">Contact</span>
      </div>

      <div className="build">
        <div className="build-copy">
          <h3>Let's <span className="mark">build</span> something together.</h3>
          <p>Reach out to us.</p>
        </div>

        <form
          className={`build-form${sent ? ' is-sent' : ''}`}
          id="buildForm"
          onSubmit={handleSubmit}
          aria-label="Contact a Databricks SA"
          noValidate
        >
          <div className="build-form-fields">
            <label className="honeypot" htmlFor="f-website">
              Leave this field empty
              <input type="text" id="f-website" name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <div className="row">
              <div className="field">
                <label htmlFor="f-name">Name <span className="req" aria-hidden="true">*</span></label>
                <input type="text" id="f-name" name="name" autoComplete="name" placeholder="Your name…" required />
              </div>
              <div className="field">
                <label htmlFor="f-email">Work email <span className="req" aria-hidden="true">*</span></label>
                <input type="email" id="f-email" name="email" autoComplete="email" inputMode="email" spellCheck={false} placeholder="you@agency.gov.sg" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-agency">Agency or ministry</label>
              <input type="text" id="f-agency" name="agency" autoComplete="organization" placeholder="e.g. GovTech, MOH, IMDA, NEA…" />
            </div>
            <div className="field">
              <label htmlFor="f-topic">Topic</label>
              <select id="f-topic" name="topic" autoComplete="off" defaultValue="">
                <option value="">Pick a topic…</option>
                <option>Architecture &amp; sizing</option>
                <option>Migration from legacy platform</option>
                <option>Unity Catalog &amp; governance</option>
                <option>Agent Bricks / GenAI</option>
                <option>Lakeflow / ingestion</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-project">What are you building? <span className="req" aria-hidden="true">*</span></label>
              <textarea id="f-project" name="project" rows={5} placeholder="A few lines on your use case, data sources, or timeline…" required />
            </div>
            <div className="actions">
              <button type="submit" className="btn btn-primary">
                Send message <span className="arr" aria-hidden="true">→</span>
              </button>
              <span className="consent">One-time reply only. No list, no newsletter, no follow-up.</span>
            </div>
          </div>
          <div className="form-success" role="status" aria-live="polite">
            <span className="ok">Message sent</span>
            <h4>Thanks — we'll get back to you within one working day.</h4>
            <p>A Field Engineer in Singapore will reply from a databricks.com address. Check your inbox (and spam, just in case).</p>
          </div>
        </form>
      </div>
    </section>
  );
}
