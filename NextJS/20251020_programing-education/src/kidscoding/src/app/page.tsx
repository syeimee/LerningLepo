'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { SimpleHeader } from '@/components/ui/SimpleHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { initFireTabletOptimizations } from '@/lib/utils/device-detection';
import { STAGES } from '@/config/stages';
import { getProgress, isStageCompleted, getStageStars } from '@/lib/progress';

export default function Home() {
  const [stageProgress, setStageProgress] = useState<Record<string, { completed: boolean; stars: number }>>({});
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Fire Tablet optimizations
    initFireTabletOptimizations();

    // Load progress from localStorage
    const progress = getProgress();
    const progressMap: Record<string, { completed: boolean; stars: number }> = {};

    STAGES.forEach((stage) => {
      progressMap[stage.id] = {
        completed: isStageCompleted(stage.id),
        stars: getStageStars(stage.id),
      };
    });

    setStageProgress(progressMap);

    // Setup and play background music
    const bgm = new Audio('/sounds/bgm-stage.mp3');
    bgm.loop = true;
    bgm.volume = 0.2; // Quieter for home screen
    bgmRef.current = bgm;

    // Play BGM (with error handling for autoplay restrictions)
    const playBGM = () => {
      bgm.play().catch((error) => {
        console.log('BGM autoplay prevented:', error);
        // Add click listener to start BGM on first user interaction
        const startBGM = () => {
          bgm.play().catch(() => {});
          document.removeEventListener('click', startBGM);
        };
        document.addEventListener('click', startBGM);
      });
    };

    playBGM();

    // Setup click sound
    clickSoundRef.current = new Audio('/sounds/button-click.mp3');
    clickSoundRef.current.volume = 0.5;

    // Cleanup: stop BGM when component unmounts
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  const playClickSound = () => {
    try {
      if (clickSoundRef.current) {
        clickSoundRef.current.pause();
        clickSoundRef.current.currentTime = 0;
        clickSoundRef.current.play().catch(() => {});
      }
    } catch {}
  };

  return (
    <div className="h-screen bg-[var(--color-gray-50)] flex flex-col overflow-hidden">
      <SimpleHeader />

      {/* Main content - fits in viewport without scroll */}
      <main className="flex-1 flex flex-col justify-center px-4 md:px-8 pt-16 md:pt-20 pb-4">
        {/* Welcome section - compact */}
        <div className="text-center mb-6">
          <h1 className="text-[40px] md:text-[56px] font-black text-[var(--color-primary-500)] mb-3">
            どこへいく？
          </h1>
          <div className="flex justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-yellow)] animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-orange)] animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent-pink)] animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>

        {/* Stage selection - centered and sized to fit */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {STAGES.map((stage) => {
              const progress = stageProgress[stage.id] || { completed: false, stars: 0 };
              return (
                <Link key={stage.id} href={`/stage/${stage.id}`} onClick={playClickSound}>
                  <Card
                    variant={progress.completed ? 'completed' : 'stage'}
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    <CardContent className="p-4 md:p-6 text-center">
                      {/* Stage number icon */}
                      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                        <span className="text-[32px] md:text-[40px] font-black text-[var(--color-primary-700)]">
                          {stage.level}
                        </span>
                      </div>

                      {/* Stars (achievement indicator) */}
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3].map((star) => (
                          <div
                            key={star}
                            className={`text-[20px] md:text-[24px] ${
                              star <= progress.stars
                                ? 'text-[var(--color-accent-yellow)]'
                                : 'text-[var(--color-gray-300)]'
                            }`}
                          >
                            ⭐
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Character indicator - subtle bottom element */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-sm">
            <span className="text-[32px]">🐶</span>
            <span className="text-[20px] font-bold text-[var(--color-gray-700)]">いぬくん</span>
          </div>
        </div>
      </main>
    </div>
  );
}
