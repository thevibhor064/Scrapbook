import React from 'react';
import { Heart, Sparkles, Edit3, Image as ImageIcon, BookOpen, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { ActiveSection } from '../types';

interface NavigationProps {
  activeSection: ActiveSection;
  onSelectSection: (section: ActiveSection) => void;
  onOpenCustomizer?: () => void;
  girlfriendName: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSelectSection,
  girlfriendName,
}) => {
  const sections: { id: ActiveSection; label: string; icon: React.ReactNode }[] = [
    { id: 'cover', label: 'Cover', icon: <Heart className="w-4 h-4" /> },
    { id: 'essay', label: 'Essay', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'scrapbook', label: 'Our Scrapbook', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'finalNote', label: 'Final Note', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-slate-950/60 backdrop-blur-xl border border-rose-500/20 rounded-full px-4 sm:px-6 py-2 shadow-2xl shadow-rose-950/20">
        
        {/* Title / Logo */}
        <div 
          onClick={() => onSelectSection('cover')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-pink-400 flex items-center justify-center text-white shadow-md shadow-rose-500/30 group-hover:scale-110 transition-transform">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <span className="font-script text-xl sm:text-2xl text-rose-200 tracking-wide block leading-none">
              My {girlfriendName}
            </span>
            <span className="text-[10px] text-rose-300/70 uppercase tracking-widest block font-medium">
              Girlfriend's Day 🌸
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/50 p-1 rounded-full border border-rose-500/10">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-rose-100 shadow-sm'
                    : 'text-slate-400 hover:text-rose-200 hover:bg-rose-500/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-rose-600/80 to-pink-500/80 rounded-full shadow-lg shadow-rose-500/20"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {sec.icon}
                  {sec.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
