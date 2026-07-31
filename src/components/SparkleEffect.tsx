import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface SparkleEffectProps {
  density?: 'low' | 'medium' | 'high';
  type?: 'sparkles' | 'hearts' | 'mixed';
}

export const SparkleEffect: React.FC<SparkleEffectProps> = ({
  density = 'medium',
  type = 'mixed'
}) => {
  const count = density === 'low' ? 18 : density === 'medium' ? 32 : 50;

  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const isHeart = type === 'hearts' || (type === 'mixed' && i % 3 === 0);
      const isRosePetal = type === 'mixed' && i % 5 === 0;
      return {
        id: i,
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        size: Math.random() * 14 + 10,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        isHeart,
        isRosePetal,
        opacity: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * 360,
      };
    });
  }, [count, type]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute flex items-center justify-center text-rose-300/60 select-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
          }}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{
            opacity: [0, item.opacity, 0],
            y: [-10, -60, -120],
            x: [0, Math.sin(item.id) * 20, 0],
            rotate: [item.rotation, item.rotation + 180],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.isRosePetal ? (
            <span className="text-pink-300/40 drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]">🌸</span>
          ) : item.isHeart ? (
            <span className="text-rose-400/50 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]">💖</span>
          ) : (
            <svg
              className="w-4 h-4 text-amber-200/60 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] animate-sparkle"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          )}
        </motion.div>
      ))}

      {/* Subtle soft lighting bokeh overlays */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-amber-400/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
    </div>
  );
};
