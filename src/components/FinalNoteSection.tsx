import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Gift, Calendar, RotateCcw } from 'lucide-react';
import { LoveReason } from '../types';

interface FinalNoteSectionProps {
  finalNoteHeading: string;
  finalNoteBody: string;
  loveReasons?: LoveReason[];
  girlfriendName: string;
  relationshipStartDate: string;
  onRestart: () => void;
}

export const FinalNoteSection: React.FC<FinalNoteSectionProps> = ({
  finalNoteHeading,
  finalNoteBody,
  girlfriendName,
  relationshipStartDate,
  onRestart,
}) => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [daysCount, setDaysCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate days together from relationshipStartDate
  useEffect(() => {
    const start = new Date(relationshipStartDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysCount(diffDays || 365);
  }, [relationshipStartDate]);

  const toggleLetter = () => {
    setIsLetterOpen(!isLetterOpen);
    if (!isLetterOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  return (
    <section 
      id="final-note-section"
      className="relative min-h-screen w-full py-24 px-4 sm:px-6 bg-gradient-to-b from-[#0d0612] via-[#160b1c] to-[#0a040e] overflow-hidden"
    >
      {/* Dreamy starlight background & glowing orb */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-[160px] animate-pulse-glow" />
      </div>

      {/* Floating particles burst when letter is opened */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: Math.random() * 1.5 + 0.8,
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
                className="absolute text-2xl"
              >
                {i % 3 === 0 ? '💖' : i % 2 === 0 ? '✨' : '🌹'}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10 space-y-20">
        
        {/* Days Together Counter Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-slate-950/60 backdrop-blur-2xl border border-rose-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/40 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium uppercase tracking-widest mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Our Love Mileage</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 my-3">
            <div>
              <span className="font-script text-6xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                {daysCount}
              </span>
              <span className="block font-cormorant text-xl text-rose-200/80 font-light">
                Days of Adoring You
              </span>
            </div>
            <div className="hidden sm:block h-16 w-[1px] bg-rose-500/20" />
            <div className="text-center sm:text-left">
              <p className="font-cormorant text-lg text-rose-100/90 italic max-w-xs">
                “Every single day spent loving you is my absolute favorite day.”
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sealed Love Envelope / Final Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative text-center"
        >
          <div className="bg-[#1e1124]/90 backdrop-blur-2xl border border-rose-400/30 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-rose-950/60 overflow-hidden">
            
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-pink-400 mx-auto flex items-center justify-center text-white shadow-xl shadow-rose-600/40 mb-6">
              <Gift className="w-8 h-8" />
            </div>

            <h2 className="font-script text-4xl sm:text-6xl text-rose-100 mb-4">
              {finalNoteHeading}
            </h2>

            <p className="font-cormorant text-xl sm:text-2xl text-rose-200/90 leading-relaxed font-light max-w-2xl mx-auto mb-8">
              {finalNoteBody}
            </p>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLetter}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium px-8 py-4 rounded-full text-base shadow-xl shadow-rose-900/50 border border-rose-300/30 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white animate-pulse" />
              <span>{isLetterOpen ? 'Seal Note With A Kiss 💋' : 'Unseal Final Surprise Note 💕'}</span>
            </motion.button>

            {/* Revealed Secret Message */}
            <AnimatePresence>
              {isLetterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-8 pt-8 border-t border-rose-500/20 text-rose-200 font-script text-3xl sm:text-4xl text-pink-200 leading-relaxed bg-rose-950/30 p-6 rounded-2xl border border-rose-400/20"
                >
                  <p>“You are mine and Im yours. Always. ❤️”</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer / Replay Button */}
        <div className="text-center pt-8">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 text-rose-300/80 hover:text-rose-100 text-sm font-cormorant tracking-widest uppercase transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Scrapbook From Beginning</span>
          </button>
        </div>

      </div>
    </section>
  );
};
