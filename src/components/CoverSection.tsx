import React from 'react';
import { motion } from 'motion/react';
import { Heart, ChevronDown, Sparkles, Flower, Bookmark } from 'lucide-react';

interface CoverSectionProps {
  coverTitle: string;
  coverSubtitle: string;
  nickname: string;
  onNext: () => void;
}

export const CoverSection: React.FC<CoverSectionProps> = ({
  coverTitle,
  coverSubtitle,
  nickname,
  onNext,
}) => {
  return (
    <section 
      id="cover-section"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 py-20 bg-gradient-to-b from-[#140b17] via-[#1a0c1e] to-[#0f0712]"
    >
      {/* Background aesthetic picture with soft romantic overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2000&auto=format&fit=crop"
          alt="Aesthetic Romantic Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-10000 animate-pulse-glow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a12] via-[#0f0a12]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/40 via-transparent to-transparent" />
      </div>

      {/* Main Glass Scrapbook Card */}
      <div className="relative z-20 max-w-3xl w-full text-center my-auto">
        
        {/* Floating Decorative Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-400/30 backdrop-blur-md text-rose-200 px-5 py-2 rounded-full mb-8 shadow-lg shadow-rose-950/50"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-sparkle" />
          <span className="text-xs uppercase tracking-[0.25em] font-medium font-cormorant">
            A Keepsake For Someone Extraordinary
          </span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-sparkle" />
        </motion.div>

        {/* Romantic Title - "Happy Girlfriend's Day My aruu" */}
        <div className="space-y-4 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-script text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-100 drop-shadow-[0_4px_25px_rgba(225,29,72,0.4)] leading-tight px-2"
          >
            {coverTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant italic text-lg sm:text-2xl text-rose-200/90 max-w-xl mx-auto font-light leading-relaxed px-4"
          >
            {coverSubtitle}
          </motion.p>
        </div>

        {/* Decorative Romantic Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 my-8"
        >
          <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />
          <div className="w-3 h-3 rounded-full bg-rose-400/80 animate-ping" />
          <motion.div
            animate={{ scale: [1, 1.25, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400/60 drop-shadow-[0_0_12px_rgba(244,63,94,0.9)]" />
          </motion.div>
          <div className="w-3 h-3 rounded-full bg-rose-400/80 animate-ping" />
          <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={onNext}
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-medium text-sm sm:text-base px-8 py-4 rounded-full shadow-xl shadow-rose-900/40 border border-rose-300/30 transition-shadow duration-300 cursor-pointer"
          >
            <span className="font-cormorant text-lg font-semibold tracking-wide">
              Begin Scrapbook Journey
            </span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform text-rose-100" />
            
            {/* Glowing effect behind button */}
            <span className="absolute -inset-1 rounded-full bg-rose-500/20 blur-md group-hover:bg-rose-500/50 transition-all -z-10" />
          </motion.button>
        </motion.div>
      </div>

      {/* Gentle Floating Scroll Indicator at Bottom */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-rose-300/60 cursor-pointer"
        onClick={onNext}
      >
        <span className="text-[11px] font-cormorant tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
};
