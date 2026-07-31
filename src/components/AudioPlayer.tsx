import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isLoopingRef = useRef(false);

  // Romantic acoustic/music-box melody notes (Hz frequencies)
  // Peaceful dreamlike chord progression: Cmaj7 - Am7 - Fmaj7 - G6
  const chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
    [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
    [174.61, 220.00, 261.63, 349.23], // Fmaj7 (F3, A3, C4, F4)
    [196.00, 246.94, 293.66, 392.00], // G6 (G3, B3, D4, G4)
  ];

  const playChordNote = (freq: number, startTime: number, duration: number, gainNode: GainNode, ctx: AudioContext) => {
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    // Warm sine + soft triangle for music-box bell tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Envelope
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.1);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(noteGain);
    noteGain.connect(gainNode);

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const startAmbientMusic = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, ctx.currentTime);
    masterGain.connect(ctx.destination);

    isLoopingRef.current = true;
    let chordIdx = 0;

    const scheduleLoop = () => {
      if (!isLoopingRef.current || !ctx) return;

      const now = ctx.currentTime;
      const currentChord = chords[chordIdx % chords.length];

      // Play arpeggiated music box chime notes
      currentChord.forEach((freq, noteIdx) => {
        playChordNote(freq, now + noteIdx * 0.4, 3.5, masterGain, ctx);
      });

      // Add high gentle sparkle tone
      const sparkleFreq = currentChord[noteIdxSparkle(chordIdx)] * 2;
      playChordNote(sparkleFreq, now + 1.2, 2.5, masterGain, ctx);

      chordIdx++;
      setTimeout(scheduleLoop, 3200);
    };

    scheduleLoop();
  };

  const noteIdxSparkle = (idx: number) => idx % 4;

  const stopAmbientMusic = () => {
    isLoopingRef.current = false;
    if (audioCtxRef.current) {
      audioCtxRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAmbientMusic();
      setIsPlaying(false);
    } else {
      startAmbientMusic();
      setIsPlaying(true);
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    // Hide tooltip after 7 seconds
    const timer = setTimeout(() => setShowTooltip(false), 7000);
    return () => {
      clearTimeout(timer);
      stopAmbientMusic();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showTooltip && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2 bg-rose-950/80 backdrop-blur-md border border-rose-500/30 text-rose-200 text-xs px-3.5 py-2 rounded-full shadow-lg"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
            <span>Click for romantic ambient sound ✨</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className={`relative flex items-center justify-center p-3.5 rounded-full border shadow-2xl transition-all duration-300 ${
          isPlaying
            ? 'bg-rose-600/90 text-white border-rose-400/50 shadow-rose-600/40'
            : 'bg-slate-900/80 backdrop-blur-md text-rose-300 border-rose-500/30 hover:border-rose-400'
        }`}
        title={isPlaying ? 'Mute romantic sound' : 'Play romantic music box'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-300"></span>
            </span>
          </>
        ) : (
          <Music className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
};
