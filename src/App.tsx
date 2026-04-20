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
