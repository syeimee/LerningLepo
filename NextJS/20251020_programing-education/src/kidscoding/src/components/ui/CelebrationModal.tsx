'use client';

import * as React from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationModalProps {
  isOpen: boolean;
  onNextStage?: () => void;
  onRetry: () => void;
  hasNextStage?: boolean;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onNextStage,
  onRetry,
  hasNextStage = true,
}) => {
  const router = useRouter();
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  const playClickSound = () => {
    try {
      if (!clickAudioRef.current) {
        clickAudioRef.current = new Audio('/sounds/button-click.mp3');
        clickAudioRef.current.volume = 0.5;
      }
      const audio = clickAudioRef.current;
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {}
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-[32px] shadow-2xl p-12 md:p-16 max-w-lg w-[90%] relative overflow-hidden"
          >
            {/* Simple particles - circles only */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [-20, -100],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${15 + i * 15}%`,
                  bottom: '20%',
                  width: '12px',
                  height: '12px',
                  background: ['#FFD700', '#FF69B4', '#00CED1', '#98FB98', '#DDA0DD', '#F0E68C'][i % 6],
                }}
              />
            ))}

            {/* Celebration Animation */}
            <div className="text-center mb-10 relative z-10">
              {/* Success icon - simple checkmark */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="mb-8 flex justify-center"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl">
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                    className="w-20 h-20 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-[56px] md:text-[72px] font-black text-gray-800 mb-3"
              >
                やったね！
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-[24px] md:text-[28px] text-gray-600"
              >
                ゴールできました
              </motion.p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 relative z-10">
              {/* Next Stage Button */}
              {hasNextStage && onNextStage && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    playClickSound();
                    onNextStage();
                  }}
                  className="w-full py-5 px-8 rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-[32px] hover:shadow-xl transition-shadow"
                >
                  つぎへ
                </motion.button>
              )}

              {/* Retry Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playClickSound();
                  onRetry();
                }}
                className="w-full py-5 px-8 rounded-2xl shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-[32px] hover:shadow-xl transition-shadow"
              >
                もういちど
              </motion.button>

              {/* Home Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playClickSound();
                  router.push('/');
                }}
                className="w-full py-4 px-8 rounded-2xl shadow bg-gray-200 text-gray-700 font-bold text-[24px] hover:bg-gray-300 transition-colors"
              >
                ホームへ
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
