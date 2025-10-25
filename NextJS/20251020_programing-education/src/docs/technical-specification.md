# 技術仕様書

## 1. システムアーキテクチャ

### 1.1 全体構成

```
┌─────────────────────────────────────────────────┐
│                  Frontend (Next.js)              │
│  ┌──────────────┐  ┌──────────────┐            │
│  │   UI Layer   │  │  3D Renderer │            │
│  │  (React)     │  │  (Three.js)  │            │
│  └──────────────┘  └──────────────┘            │
│  ┌──────────────────────────────────┐          │
│  │     State Management (Zustand)    │          │
│  └──────────────────────────────────┘          │
│  ┌──────────────────────────────────┐          │
│  │   Program Execution Engine        │          │
│  └──────────────────────────────────┘          │
└─────────────────────────────────────────────────┘
                      ↓↑
┌─────────────────────────────────────────────────┐
│              Backend (Next.js API)               │
│  ┌──────────────┐  ┌──────────────┐            │
│  │  API Routes  │  │  Auth Logic  │            │
│  └──────────────┘  └──────────────┘            │
└─────────────────────────────────────────────────┘
                      ↓↑
┌─────────────────────────────────────────────────┐
│              Database (Supabase)                 │
│  - User Progress                                 │
│  - Stage Data                                    │
│  - Achievement Records                           │
└─────────────────────────────────────────────────┘
```

---

## 2. 技術スタック詳細

### 2.1 フロントエンド

#### 2.1.1 Next.js 14+ (App Router)

**選定理由**:
- React Server Components によるパフォーマンス最適化
- ファイルベースルーティングでシンプルな構造
- 画像最適化（next/image）でローディング高速化
- Vercelへの簡単デプロイ

**ディレクトリ構成**:
```
src/
├── app/
│   ├── layout.tsx              # ルートレイアウト
│   ├── page.tsx                # ホーム画面
│   ├── stage/
│   │   └── [id]/page.tsx       # ステージ画面（動的ルート）
│   ├── select-character/
│   │   └── page.tsx            # キャラクター選択
│   └── parent-dashboard/
│       └── page.tsx            # 保護者ダッシュボード
├── components/
│   ├── ui/                     # 再利用可能なUIコンポーネント
│   ├── programming/            # プログラミング関連コンポーネント
│   │   ├── CommandPanel.tsx    # 命令パネル
│   │   ├── ProgramArea.tsx     # プログラム実行エリア
│   │   └── CommandBlock.tsx    # 命令ブロック
│   └── three/                  # Three.js関連コンポーネント
│       ├── Scene.tsx           # 3Dシーン
│       ├── Character.tsx       # キャラクターモデル
│       └── Stage.tsx           # ステージ環境
├── lib/
│   ├── store/                  # Zustand状態管理
│   ├── hooks/                  # カスタムフック
│   └── utils/                  # ユーティリティ関数
├── types/                      # TypeScript型定義
└── public/
    ├── models/                 # gLTFモデル
    ├── sounds/                 # 効果音・BGM
    └── images/                 # 画像アセット
```

#### 2.1.2 TypeScript

**設定（tsconfig.json）**:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**型定義例**:
```typescript
// types/programming.ts
export type CommandType = 'forward' | 'backward' | 'left' | 'right' | 'loop' | 'if';

export interface Command {
  id: string;
  type: CommandType;
  params?: {
    count?: number;        // ループ回数
    condition?: string;    // 条件分岐の条件
    children?: Command[];  // ネストされた命令
  };
}

export interface ProgramState {
  commands: Command[];
  isRunning: boolean;
  currentStep: number;
}

// types/character.ts
export interface Character {
  id: string;
  name: string;
  modelPath: string;
  animations: {
    idle: string;
    walk: string;
    celebrate: string;
    sad: string;
  };
}

// types/stage.ts
export interface Stage {
  id: string;
  level: number;
  title: string;
  description: string;
  goalPosition: { x: number; y: number; z: number };
  obstacles: Array<{ x: number; y: number; z: number }>;
  requiredCommands: CommandType[];
  maxCommands?: number;
}
```

#### 2.1.3 Three.js + React Three Fiber

**依存パッケージ**:
```json
{
  "dependencies": {
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "@react-three/postprocessing": "^2.16.0"
  }
}
```

**実装例（Character コンポーネント）**:
```typescript
// components/three/Character.tsx
import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import type { Group } from 'three';

interface CharacterProps {
  modelPath: string;
  position: [number, number, number];
  rotation: number;
  animation: 'idle' | 'walk' | 'celebrate' | 'sad';
}

export function Character({ modelPath, position, rotation, animation }: CharacterProps) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions[animation]) {
      actions[animation]?.reset().fadeIn(0.5).play();
      return () => {
        actions[animation]?.fadeOut(0.5);
      };
    }
  }, [animation, actions]);

  return (
    <group ref={group} position={position} rotation={[0, rotation, 0]}>
      <primitive object={scene} />
    </group>
  );
}
```

**3Dシーン設定**:
```typescript
// components/three/Scene.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';

export function Scene({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 50 }}
      shadows
      gl={{ antialias: true, alpha: true }}
    >
      {/* ライト設定 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* 環境設定 */}
      <Environment preset="sunset" />

      {/* グリッド表示 */}
      <Grid infiniteGrid cellSize={1} cellThickness={0.5} />

      {/* カメラコントロール（開発用、本番では固定） */}
      <OrbitControls enableZoom={false} />

      {/* キャラクターとステージ */}
      {children}
    </Canvas>
  );
}
```

#### 2.1.4 UI Component Library

**Tailwind CSS**:
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#4A90E2',
          yellow: '#FFD700',
          green: '#7ED321',
        },
        accent: {
          orange: '#FF6B35',
          pink: '#FF69B4',
        },
      },
      fontSize: {
        'touch-target': '48px', // 幼児向け大きな文字
      },
      spacing: {
        'touch': '80px',        // タッチターゲット最小サイズ
      },
    },
  },
  plugins: [],
};
```

**Radix UI（アクセシブルなコンポーネント）**:
```typescript
// components/ui/Button.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'rounded-2xl font-bold transition-all active:scale-95 focus:outline-none focus:ring-4',
  {
    variants: {
      variant: {
        primary: 'bg-primary-blue text-white hover:bg-blue-600',
        success: 'bg-primary-green text-white hover:bg-green-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        default: 'min-w-[80px] min-h-[80px] text-2xl',
        large: 'min-w-[120px] min-h-[120px] text-3xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  soundEffect?: string; // 効果音のパス
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, soundEffect, onClick, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // 効果音再生
      if (soundEffect) {
        const audio = new Audio(soundEffect);
        audio.play();
      }
      onClick?.(e);
    };

    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
```

#### 2.1.5 ドラッグ&ドロップ（dnd-kit）

**依存パッケージ**:
```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2"
  }
}
```

**実装例**:
```typescript
// components/programming/ProgramArea.tsx
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useProgramStore } from '@/lib/store/program';
import { CommandBlock } from './CommandBlock';

export function ProgramArea() {
  const { commands, setCommands } = useProgramStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = commands.findIndex((cmd) => cmd.id === active.id);
      const newIndex = commands.findIndex((cmd) => cmd.id === over.id);

      setCommands(arrayMove(commands, oldIndex, newIndex));

      // 効果音再生
      playSound('/sounds/drop.mp3');
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={commands} strategy={verticalListSortingStrategy}>
        <div className="min-h-[200px] bg-gray-100 rounded-2xl p-4 space-y-2">
          {commands.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <img src="/images/drop-here.svg" alt="" className="mx-auto w-32 h-32" />
            </div>
          ) : (
            commands.map((command) => (
              <CommandBlock key={command.id} command={command} />
            ))
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
```

### 2.2 状態管理（Zustand）

**ストア設計**:
```typescript
// lib/store/program.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Command } from '@/types/programming';

interface ProgramStore {
  commands: Command[];
  isRunning: boolean;
  currentStep: number;

  setCommands: (commands: Command[]) => void;
  addCommand: (command: Command) => void;
  removeCommand: (id: string) => void;
  startExecution: () => void;
  stopExecution: () => void;
  nextStep: () => void;
  reset: () => void;
}

export const useProgramStore = create<ProgramStore>()(
  devtools(
    persist(
      (set) => ({
        commands: [],
        isRunning: false,
        currentStep: 0,

        setCommands: (commands) => set({ commands }),
        addCommand: (command) =>
          set((state) => ({ commands: [...state.commands, command] })),
        removeCommand: (id) =>
          set((state) => ({ commands: state.commands.filter((c) => c.id !== id) })),
        startExecution: () => set({ isRunning: true, currentStep: 0 }),
        stopExecution: () => set({ isRunning: false }),
        nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
        reset: () => set({ commands: [], isRunning: false, currentStep: 0 }),
      }),
      { name: 'program-storage' }
    )
  )
);

// lib/store/character.ts
import { create } from 'zustand';

interface CharacterStore {
  selectedCharacter: string;
  position: { x: number; y: number; z: number };
  rotation: number;
  animation: 'idle' | 'walk' | 'celebrate' | 'sad';

  setCharacter: (id: string) => void;
  setPosition: (position: { x: number; y: number; z: number }) => void;
  setRotation: (rotation: number) => void;
  setAnimation: (animation: CharacterStore['animation']) => void;
  moveForward: () => void;
  turnLeft: () => void;
  turnRight: () => void;
}

export const useCharacterStore = create<CharacterStore>()((set) => ({
  selectedCharacter: 'dog',
  position: { x: 0, y: 0, z: 0 },
  rotation: 0,
  animation: 'idle',

  setCharacter: (id) => set({ selectedCharacter: id }),
  setPosition: (position) => set({ position }),
  setRotation: (rotation) => set({ rotation }),
  setAnimation: (animation) => set({ animation }),

  moveForward: () =>
    set((state) => {
      const rad = (state.rotation * Math.PI) / 180;
      return {
        position: {
          x: state.position.x + Math.sin(rad),
          y: state.position.y,
          z: state.position.z + Math.cos(rad),
        },
        animation: 'walk',
      };
    }),

  turnLeft: () => set((state) => ({ rotation: state.rotation - 90 })),
  turnRight: () => set((state) => ({ rotation: state.rotation + 90 })),
}));
```

### 2.3 プログラム実行エンジン

**インタープリター実装**:
```typescript
// lib/interpreter/executor.ts
import type { Command } from '@/types/programming';
import { useCharacterStore } from '@/lib/store/character';

export class ProgramExecutor {
  private commands: Command[] = [];
  private currentIndex: number = 0;
  private isRunning: boolean = false;

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  async execute(): Promise<void> {
    this.isRunning = true;
    this.currentIndex = 0;

    while (this.currentIndex < this.commands.length && this.isRunning) {
      await this.executeCommand(this.commands[this.currentIndex]);
      this.currentIndex++;
    }

    this.isRunning = false;
  }

  private async executeCommand(command: Command): Promise<void> {
    const characterStore = useCharacterStore.getState();

    switch (command.type) {
      case 'forward':
        characterStore.setAnimation('walk');
        await this.animateMovement(() => characterStore.moveForward());
        characterStore.setAnimation('idle');
        break;

      case 'left':
        await this.animateRotation(() => characterStore.turnLeft());
        break;

      case 'right':
        await this.animateRotation(() => characterStore.turnRight());
        break;

      case 'loop':
        if (command.params?.count && command.params?.children) {
          for (let i = 0; i < command.params.count; i++) {
            for (const child of command.params.children) {
              await this.executeCommand(child);
            }
          }
        }
        break;

      default:
        console.warn(`Unknown command type: ${command.type}`);
    }

    // 各コマンド実行後に少し待機（アニメーション確認用）
    await this.sleep(500);
  }

  private animateMovement(action: () => void): Promise<void> {
    return new Promise((resolve) => {
      action();
      // アニメーション時間（1秒）
      setTimeout(resolve, 1000);
    });
  }

  private animateRotation(action: () => void): Promise<void> {
    return new Promise((resolve) => {
      action();
      // 回転アニメーション時間（0.5秒）
      setTimeout(resolve, 500);
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  stop(): void {
    this.isRunning = false;
  }
}
```

### 2.4 音声システム

**音声ガイド実装**:
```typescript
// lib/audio/voice-guide.ts
export class VoiceGuide {
  private audioContext: AudioContext;
  private currentAudio: HTMLAudioElement | null = null;

  constructor() {
    this.audioContext = new AudioContext();
  }

  async speak(text: string, voiceFile?: string): Promise<void> {
    // 事前録音された音声ファイルを再生
    if (voiceFile) {
      return this.playVoiceFile(voiceFile);
    }

    // Web Speech API を使用（フォールバック）
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9; // ゆっくり話す
      utterance.pitch = 1.2; // 少し高めの声

      return new Promise((resolve) => {
        utterance.onend = () => resolve();
        speechSynthesis.speak(utterance);
      });
    }
  }

  private playVoiceFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stopCurrent();

      this.currentAudio = new Audio(filePath);
      this.currentAudio.onended = () => resolve();
      this.currentAudio.onerror = () => reject();
      this.currentAudio.play();
    });
  }

  stopCurrent(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }
}

// 使用例
const guide = new VoiceGuide();
await guide.speak('ブロックをならべてね！', '/voices/arrange-blocks.mp3');
```

**効果音システム**:
```typescript
// lib/audio/sound-effects.ts
export class SoundEffects {
  private sounds: Map<string, HTMLAudioElement> = new Map();

  preload(soundMap: Record<string, string>): void {
    Object.entries(soundMap).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      this.sounds.set(key, audio);
    });
  }

  play(key: string, volume: number = 1.0): void {
    const sound = this.sounds.get(key);
    if (sound) {
      sound.volume = volume;
      sound.currentTime = 0;
      sound.play().catch(console.error);
    }
  }
}

// グローバルインスタンス
export const soundEffects = new SoundEffects();

// 初期化
soundEffects.preload({
  success: '/sounds/success.mp3',
  fail: '/sounds/fail.mp3',
  click: '/sounds/click.mp3',
  drop: '/sounds/drop.mp3',
  celebrate: '/sounds/celebrate.mp3',
});
```

---

## 3. バックエンド設計

### 3.1 Next.js API Routes

**エンドポイント設計**:
```
/api/
├── user/
│   ├── progress/
│   │   └── route.ts       # GET/POST 進捗データ
│   └── achievements/
│       └── route.ts       # GET 達成記録
├── stages/
│   └── route.ts           # GET ステージ一覧
└── auth/
    └── [...nextauth]/
        └── route.ts       # NextAuth.js
```

**実装例（進捗保存API）**:
```typescript
// app/api/user/progress/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { supabase } from '@/lib/supabase/client';

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', session.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: session.user.id,
      stage_id: body.stageId,
      completed: body.completed,
      stars: body.stars,
      best_commands_count: body.commandsCount,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
```

### 3.2 データベーススキーマ（Supabase）

```sql
-- ユーザーテーブル
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE,
  display_name VARCHAR(100),
  parent_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ステージテーブル
CREATE TABLE stages (
  id VARCHAR(50) PRIMARY KEY,
  level INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  goal_position JSONB NOT NULL,
  obstacles JSONB,
  required_commands JSONB NOT NULL,
  max_commands INTEGER,
  unlock_after VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ユーザー進捗テーブル
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stage_id VARCHAR(50) REFERENCES stages(id),
  completed BOOLEAN DEFAULT FALSE,
  stars INTEGER DEFAULT 0,
  best_commands_count INTEGER,
  attempts INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, stage_id)
);

-- 達成記録テーブル
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_type VARCHAR(50) NOT NULL,
  earned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, achievement_type)
);

-- インデックス
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_achievements_user_id ON achievements(user_id);
```

---

## 4. パフォーマンス最適化

### 4.1 デバイス互換性

#### 4.1.1 対応デバイス・ブラウザ

**優先対応デバイス**:
- iPad (Safari)
- Androidタブレット (Chrome)
- Amazon Fire タブレット (Silk Browser)
- PC (Chrome, Safari, Edge)

**Amazon Fire タブレット特別対応**:

Fire タブレットは比較的低スペックで独自のSilkブラウザを使用するため、以下の対策が必要:

```typescript
// lib/utils/device-detection.ts
export function isFireTablet(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('silk') || ua.includes('kindle fire');
}

export function getDevicePerformanceLevel(): 'high' | 'medium' | 'low' {
  const ua = navigator.userAgent.toLowerCase();

  // Fire タブレットは低性能設定
  if (isFireTablet()) {
    return 'low';
  }

  // その他のデバイス判定
  const isMobile = /mobile|tablet|android|ipad/i.test(ua);
  const hasHighRAM = (navigator as any).deviceMemory >= 4;

  if (isMobile && !hasHighRAM) return 'medium';
  return 'high';
}
```

**性能別レンダリング設定**:
```typescript
// components/three/Scene.tsx
import { getDevicePerformanceLevel } from '@/lib/utils/device-detection';

export function Scene({ children }: { children: React.ReactNode }) {
  const performanceLevel = getDevicePerformanceLevel();

  // Fire タブレット向け低負荷設定
  const settings = {
    high: {
      shadows: true,
      antialias: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      toneMapping: true,
    },
    medium: {
      shadows: true,
      antialias: true,
      pixelRatio: 1,
      toneMapping: false,
    },
    low: {
      shadows: false,      // Fire タブレットでは影を無効化
      antialias: false,    // アンチエイリアス無効
      pixelRatio: 1,       // 解像度を抑える
      toneMapping: false,
    },
  }[performanceLevel];

  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 50 }}
      shadows={settings.shadows}
      gl={{
        antialias: settings.antialias,
        alpha: true,
        powerPreference: performanceLevel === 'low' ? 'low-power' : 'high-performance',
      }}
      dpr={settings.pixelRatio}
    >
      <ambientLight intensity={0.6} />
      {settings.shadows && (
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      )}

      {/* 環境マップはhigh/mediumのみ */}
      {performanceLevel !== 'low' && <Environment preset="sunset" />}

      {children}
    </Canvas>
  );
}
```

**Silk Browser 固有の問題対策**:
```typescript
// lib/utils/browser-polyfills.ts

// Silk Browserでのパフォーマンス問題対策
export function initFireTabletOptimizations() {
  if (!isFireTablet()) return;

  // タッチイベントの最適化
  document.addEventListener('touchstart', () => {}, { passive: true });
  document.addEventListener('touchmove', () => {}, { passive: true });

  // スクロールのスムージング無効化（パフォーマンス向上）
  document.documentElement.style.scrollBehavior = 'auto';

  // ビューポート設定の最適化
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    );
  }
}
```

**WebGL互換性チェック**:
```typescript
// lib/utils/webgl-check.ts
export function checkWebGLSupport(): {
  supported: boolean;
  message?: string;
} {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
      return {
        supported: false,
        message: 'お使いのデバイスは3D表示に対応していません。',
      };
    }

    // Fire タブレットでの最小要件チェック
    const maxTextureSize = (gl as WebGLRenderingContext).getParameter(
      (gl as WebGLRenderingContext).MAX_TEXTURE_SIZE
    );

    if (maxTextureSize < 1024) {
      return {
        supported: false,
        message: 'デバイスの性能が不足しています。',
      };
    }

    return { supported: true };
  } catch (e) {
    return {
      supported: false,
      message: '3D表示の初期化に失敗しました。',
    };
  }
}
```

### 4.2 3Dモデル最適化

**gLTF圧縮**:
```bash
# gltf-pipeline を使用した圧縮
npx gltf-pipeline -i model.gltf -o model.glb -d

# Draco圧縮（さらに軽量化）
npx gltf-pipeline -i model.gltf -o model.glb -d --draco.compressionLevel 10
```

**推奨モデル仕様**:
- ポリゴン数: 5,000以下
- テクスチャサイズ: 512x512 または 1024x1024
- ファイルサイズ: 500KB以下（Draco圧縮後）

### 4.2 画像最適化

**Next.js Image コンポーネント**:
```typescript
import Image from 'next/image';

<Image
  src="/images/character-icon.png"
  alt="キャラクター"
  width={120}
  height={120}
  priority // 初期表示で必要な画像
  placeholder="blur" // ローディング時のぼかし
/>
```

### 4.3 コード分割

```typescript
// 動的インポート
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false, // Three.jsはクライアントサイドのみ
  loading: () => <LoadingSpinner />,
});
```

---

## 5. デプロイ・運用

### 5.1 Vercel設定

**vercel.json**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["hnd1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

### 5.2 環境変数

```.env.local
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# Analytics（オプション）
NEXT_PUBLIC_GA_ID=your-ga-id
```

---

## 6. テスト戦略

### 6.1 テストツール

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "vitest": "^1.0.0",
    "playwright": "^1.40.0"
  }
}
```

### 6.2 テストカバレッジ

- ユニットテスト: ビジネスロジック、ユーティリティ関数
- 統合テスト: プログラム実行エンジン、状態管理
- E2Eテスト: ユーザーフロー（Playwright）

---

**文書バージョン**: 1.0
**作成日**: 2025-10-20
**最終更新日**: 2025-10-20
