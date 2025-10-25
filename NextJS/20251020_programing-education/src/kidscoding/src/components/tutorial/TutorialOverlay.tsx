'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-[32px] shadow-2xl p-8 md:p-12 max-w-2xl w-full relative"
          >
            {/* Tutorial Content */}
            <div className="text-center mb-8">
              <h2 className="text-[48px] md:text-[56px] font-black text-gray-800 mb-4">
                あそびかた
              </h2>
              <p className="text-[24px] text-gray-600">
                ブロックをうごかして、プログラムをつくろう！
              </p>
            </div>

            {/* Animation Demo Area */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 mb-8 relative overflow-hidden">
              {/* Demo blocks palette */}
              <div className="flex justify-center gap-4 mb-12">
                {['↑', '↓', '←', '→'].map((icon, i) => (
                  <motion.div
                    key={icon}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="w-20 h-20 rounded-2xl border-4 border-blue-400 bg-blue-50 flex items-center justify-center text-[40px] font-black text-gray-900 shadow-lg"
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>

              {/* Animated dragging block */}
              <motion.div
                initial={{ x: 0, y: 0, scale: 1 }}
                animate={{
                  x: [0, 0, 0, 0],
                  y: [0, -80, -80, 0],
                  scale: [1, 1.1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.7, 1],
                }}
                className="w-20 h-20 rounded-2xl border-4 border-blue-400 bg-blue-50 flex items-center justify-center text-[40px] font-black text-gray-900 shadow-lg mx-auto mb-8"
              >
                ↑
              </motion.div>

              {/* Hand cursor animation */}
              <motion.div
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: [0, 0, 0, 0],
                  y: [0, -80, -80, 0],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.7, 1],
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ marginTop: '40px', marginLeft: '40px' }}
              >
                <div className="text-[48px]">👆</div>
              </motion.div>

              {/* Drop zone indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: [0, 0, 1, 0.3],
                  scale: [0.9, 0.9, 1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.7, 1],
                }}
                className="w-24 h-24 rounded-2xl border-4 border-dashed border-green-400 bg-green-50 mx-auto"
              />

              {/* Arrow showing direction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: [0, 0, 1, 0],
                  y: [20, 20, 0, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 1],
                }}
                className="absolute left-1/2 -translate-x-1/2 top-1/4 text-[48px]"
              >
                ⬇️
              </motion.div>
            </div>

            {/* Instructions */}
            <div className="space-y-4 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-4 bg-blue-50 rounded-xl p-4"
              >
                <div className="text-[40px] flex-shrink-0">1️⃣</div>
                <div>
                  <h3 className="text-[24px] font-bold text-gray-800 mb-1">
                    ブロックをえらぶ
                  </h3>
                  <p className="text-[18px] text-gray-600">
                    うえにある やじるしブロックをタップ
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-4 bg-green-50 rounded-xl p-4"
              >
                <div className="text-[40px] flex-shrink-0">2️⃣</div>
                <div>
                  <h3 className="text-[24px] font-bold text-gray-800 mb-1">
                    プログラムをつくる
                  </h3>
                  <p className="text-[18px] text-gray-600">
                    したの わくに ブロックをならべる
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-start gap-4 bg-purple-50 rounded-xl p-4"
              >
                <div className="text-[40px] flex-shrink-0">3️⃣</div>
                <div>
                  <h3 className="text-[24px] font-bold text-gray-800 mb-1">
                    スタート！
                  </h3>
                  <p className="text-[18px] text-gray-600">
                    さいせいボタン ▶ をおして うごかそう
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full py-6 px-8 rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-black text-[32px] hover:shadow-xl transition-shadow"
            >
              わかった！
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
