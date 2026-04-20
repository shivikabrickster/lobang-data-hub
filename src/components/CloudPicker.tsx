import { CLOUDS, type CloudSpec } from '../data/clouds';

interface Props {
  open: boolean;
  onSelect: (id: 'aws' | 'azure') => void;
}

function CloudEntry({ spec, onSelect }: { spec: CloudSpec; onSelect: (id: 'aws' | 'azure') => void }) {
  const total = spec.lanes.reduce((n, l) => n + l.items.length, 0);
  return (
    <button
      type="button"
      className="cloud-card cloud-entry"
      id={spec.id}
      onClick={() => onSelect(spec.id)}
      aria-label={`Open ${spec.name} ${spec.nameEm} guide — ${total} resources`}
    >
      <span className="ghost-letter" aria-hidden="true">{spec.letter}</span>
      <div className="part">{spec.part}</div>
      <h3>{spec.name} <em>{spec.nameEm}</em></h3>
      <p>{spec.blurb}</p>
      <div className="chips">
        {spec.chips.map((c) => <span key={c} className="chip">{c}</span>)}
      </div>
      <span className="enter">
        <span>Open the {spec.id === 'aws' ? 'AWS' : 'Azure'} guide — {total} resources</span>
        <span className="arr" aria-hidden="true">→</span>
      </span>
    </button>
  );
}

export default function CloudPicker({ open, onSelect }: Props) {
  return (
    <section className={`reveal-target${open ? ' is-open' : ''}`} id="clouds" aria-label="Choose your cloud">
      <div className="section-title" data-ornament="01">
        <h2><em>Choose your cloud.</em></h2>
        <span className="tag">Deploy</span>
      </div>

      <p className="cloud-deck">
        Pick a cloud to open its phased guide — Start → Deploy → Secure &amp; govern. Each
        lane links to the canonical Databricks or Microsoft page.
      </p>

      <div className="clouds">
        <CloudEntry spec={CLOUDS.aws} onSelect={onSelect} />
        <CloudEntry spec={CLOUDS.azure} onSelect={onSelect} />
      </div>
    </section>
  );
}
