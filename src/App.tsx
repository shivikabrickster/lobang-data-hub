import { useState, useCallback, useEffect } from 'react';
import Ticker from './components/Ticker';
import PosterHero from './components/PosterHero';
import CloudPicker from './components/CloudPicker';
import CloudDetail from './components/CloudDetail';
import WhatsNew from './components/WhatsNew';
import IndexGrid from './components/IndexGrid';
import Learn from './components/Learn';
import Events from './components/Events';
import Build from './components/Build';
import FaqChatbot from './components/FaqChatbot';

type SectionId = 'clouds' | 'whats-new' | 'sections' | 'learn' | 'events' | 'build';

export default function App() {
  const [open, setOpen] = useState<Record<SectionId, boolean>>({
    clouds: false,
    'whats-new': false,
    sections: false,
    learn: false,
    events: false,
    build: false,
  });

  const [cloudDetail, setCloudDetail] = useState<null | 'aws' | 'azure'>(null);

  const reveal = useCallback((id: SectionId) => {
    setOpen((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const handleSelectCloud = useCallback((id: 'aws' | 'azure') => {
    setCloudDetail(id);
  }, []);

  const handleBack = useCallback(() => {
    setCloudDetail(null);
    requestAnimationFrame(() => {
      const el = document.getElementById('clouds');
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-cloud-detail', cloudDetail !== null);
    return () => document.body.classList.remove('is-cloud-detail');
  }, [cloudDetail]);

  if (cloudDetail) {
    return (
      <div className="page page-detail">
        <main className="sheet">
          <CloudDetail cloud={cloudDetail} onBack={handleBack} />
        </main>
        <FaqChatbot />
      </div>
    );
  }

  return (
    <div className="page">
      <Ticker />
      <a
        className="powered-by powered-by-topleft"
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
      <main className="sheet">
        <PosterHero
          onPickCloud={() => reveal('clouds')}
          onBrowse={() => reveal('sections')}
          onJump={(id) => reveal(id)}
        />
        <CloudPicker open={open.clouds} onSelect={handleSelectCloud} />
        <WhatsNew open={open['whats-new']} />
        <IndexGrid open={open.sections} />
        <Learn open={open.learn} />
        <Events open={open.events} />
        <Build open={open.build} />
      </main>
      <FaqChatbot />
    </div>
  );
}
