'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IdleGuidanceOverlayProps {
  isVisible: boolean;
}

export const IdleGuidanceOverlay: React.FC<IdleGuidanceOverlayProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[150] pointer-events-none"
        >
          {/* Highlight on CommandPalette area (top right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: [0, 0.3, 0.3, 0], scale: [0.95, 1, 1, 0.95] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.7, 1],
            }}
            className="absolute top-24 right-8 w-64 h-32 rounded-[24px] bg-blue-400 blur-xl"
          />

          {/* Ghost block being dragged (right arrow) */}
          <motion.div
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [0, 0, -200, -200, 0],
              y: [0, 0, 100, 100, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.7, 1],
            }}
            className="absolute top-32 right-24"
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1.1, 1],
                rotate: [0, 5, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.2, 0.7, 1],
              }}
              className="w-20 h-20 rounded-[16px] border-4 border-blue-400 bg-blue-50/90 backdrop-blur-sm shadow-2xl flex items-center justify-center"
            >
              <span className="text-[48px] font-black text-gray-900">→</span>
            </motion.div>
          </motion.div>

          {/* Hand cursor following the block */}
          <motion.div
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [0, 0, -200, -200, 0],
              y: [0, 0, 100, 100, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.7, 1],
            }}
            className="absolute top-32 right-24"
            style={{ marginLeft: '45px', marginTop: '45px' }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1.1, 1],
                opacity: [0.8, 1, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.2, 0.7, 1],
              }}
              className="text-[48px] drop-shadow-lg"
            >
              👆
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
