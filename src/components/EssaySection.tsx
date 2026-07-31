import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, BookOpen, ChevronRight, Quote, HeartHandshake } from 'lucide-react';

interface EssaySectionProps {
  essayHeading: string;
  essayQuote: string;
  essayBody: string[];
  girlfriendName: string;
  onNext: () => void;
}

export const EssaySection: React.FC<EssaySectionProps> = ({
  essayHeading,
  essayQuote,
  essayBody,
  girlfriendName,
  onNext,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section 
      id="essay-section"
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-4 bg-gradient-to-b from-[#0f0712] via-[#160c1c] to-[#120817] overflow-hidden"
    >
      {/* Background aesthetic lighting & imagery */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2000&auto=format&fit=crop"
          alt="Aesthetic Soft Lighting"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-15 mix-blend-color-dodge filter blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0712] via-transparent to-[#120817]" />
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium tracking-widest uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>A Letter From My Heart 💕</span>
          </div>
          <h2 className="font-script text-4xl sm:text-6xl text-rose-100 drop-shadow-[0_0_15px_rgba(244,114,182,0.3)]">
            {essayHeading}
          </h2>
        </motion.div>

        {/* Vintage Letter Parchment Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#1c1221]/80 backdrop-blur-2xl border border-rose-400/20 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl shadow-rose-950/60 overflow-hidden"
        >
          {/* Subtle Corner Florals / Decorative Ribbon */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-500/10 via-pink-500/5 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/10 via-rose-500/5 to-transparent rounded-tr-full pointer-events-none" />
          
          {/* Heart Stamp Badge */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 rounded-full border border-rose-400/40 bg-rose-950/60 flex items-center justify-center text-rose-300 shadow-inner">
            <Heart className="w-6 h-6 fill-rose-500/40 text-rose-300 animate-pulse" />
          </div>

          {/* Featured Quote */}
          {essayQuote && (
            <div className="relative mb-8 pb-6 border-b border-rose-500/15">
              <Quote className="absolute -top-3 -left-2 w-8 h-8 text-rose-400/20" />
              <p className="font-cormorant italic text-xl sm:text-2xl text-amber-100/90 leading-relaxed pl-6 pr-10 font-light">
                {essayQuote}
              </p>
            </div>
          )}

          {/* Essay Body - Styled with Cursive & Stylish Fonts + Heart Emojis */}
          <div className="space-y-6 text-rose-100/95 font-cormorant text-lg sm:text-xl leading-relaxed">
            {essayBody.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="first-letter:text-4xl first-letter:font-script first-letter:text-rose-300 first-letter:mr-1 tracking-wide"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Sign off */}
          <div className="mt-10 pt-6 border-t border-rose-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="font-cormorant text-sm uppercase tracking-widest text-rose-300/70 block">
                Forever & Always Yours,
              </span>
              <span className="font-script text-3xl sm:text-4xl text-rose-200 block mt-1">
                With All My Love 💕
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="flex items-center gap-2 bg-rose-600/30 hover:bg-rose-600/50 border border-rose-400/40 text-rose-100 px-6 py-3 rounded-full text-sm font-medium shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
            >
              <span>Explore Our Memories</span>
              <ChevronRight className="w-4 h-4 text-rose-200" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
