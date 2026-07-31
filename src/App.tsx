import React, { useState, useEffect } from 'react';
import { initialScrapbookContent } from './data/scrapbookData';
import { ScrapbookContent, ActiveSection, PhotoMemory } from './types';
import { SparkleEffect } from './components/SparkleEffect';
import { AudioPlayer } from './components/AudioPlayer';
import { Navigation } from './components/Navigation';
import { CoverSection } from './components/CoverSection';
import { EssaySection } from './components/EssaySection';
import { ScrapbookSection } from './components/ScrapbookSection';
import { FinalNoteSection } from './components/FinalNoteSection';
import { CustomizerModal } from './components/CustomizerModal';

export default function App() {
  const [content, setContent] = useState<ScrapbookContent>(() => {
    const saved = localStorage.getItem('aruu_scrapbook_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initialScrapbookContent,
          ...parsed,
          finalNoteBody: parsed.finalNoteBody?.includes("No matter where life takes us") 
            ? initialScrapbookContent.finalNoteBody 
            : parsed.finalNoteBody || initialScrapbookContent.finalNoteBody,
        };
      } catch (e) {
        return initialScrapbookContent;
      }
    }
    return initialScrapbookContent;
  });

  const [activeSection, setActiveSection] = useState<ActiveSection>('cover');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Save changes to localStorage so user edits persist across refreshes
  useEffect(() => {
    localStorage.setItem('aruu_scrapbook_data', JSON.stringify(content));
  }, [content]);

  // Scroll observer to update active section indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections: ActiveSection[] = ['cover', 'essay', 'scrapbook', 'finalNote'];
      const sectionElements = {
        cover: document.getElementById('cover-section'),
        essay: document.getElementById('essay-section'),
        scrapbook: document.getElementById('scrapbook-section'),
        finalNote: document.getElementById('final-note-section'),
      };

      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const sec of sections) {
        const el = sectionElements[sec];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sec: ActiveSection) => {
    setActiveSection(sec);
    const elementId =
      sec === 'cover'
        ? 'cover-section'
        : sec === 'essay'
        ? 'essay-section'
        : sec === 'scrapbook'
        ? 'scrapbook-section'
        : 'final-note-section';

    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdatePhotos = (photos: PhotoMemory[]) => {
    setContent((prev) => ({
      ...prev,
      photos,
    }));
  };

  return (
    <div className="relative min-h-screen bg-[#0f0a12] text-slate-100 font-sans selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden">
      {/* Ambient Floating Sparkles & Rose Petals */}
      <SparkleEffect density="medium" type="mixed" />

      {/* Romantic Music Box Player */}
      <AudioPlayer />

      {/* Fixed Header Navigation */}
      <Navigation
        activeSection={activeSection}
        onSelectSection={scrollToSection}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        girlfriendName={content.girlfriendName}
      />

      {/* Main Digital Scrapbook Content */}
      <main className="relative z-10">
        {/* Page 1: Cover Section */}
        <CoverSection
          coverTitle={content.coverTitle}
          coverSubtitle={content.coverSubtitle}
          nickname={content.nickname}
          onNext={() => scrollToSection('essay')}
        />

        {/* Page 2: Essay Section */}
        <EssaySection
          essayHeading={content.essayHeading}
          essayQuote={content.essayQuote}
          essayBody={content.essayBody}
          girlfriendName={content.girlfriendName}
          onNext={() => scrollToSection('scrapbook')}
        />

        {/* Page 3: Our Memories / Photo Scrapbook */}
        <ScrapbookSection
          photos={content.photos}
          girlfriendName={content.girlfriendName}
          onUpdatePhotos={handleUpdatePhotos}
          onNext={() => scrollToSection('finalNote')}
        />

        {/* Page 4: Final Note */}
        <FinalNoteSection
          finalNoteHeading={content.finalNoteHeading}
          finalNoteBody={content.finalNoteBody}
          girlfriendName={content.girlfriendName}
          relationshipStartDate={content.relationshipStartDate}
          onRestart={() => scrollToSection('cover')}
        />
      </main>

      {/* Customizer Modal for Live Editing & Gemini AI */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        content={content}
        onSaveContent={(newContent) => setContent(newContent)}
      />
    </div>
  );
}
