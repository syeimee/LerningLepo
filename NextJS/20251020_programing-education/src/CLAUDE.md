# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**KidsCoding** - A visual programming education web app for 3-4 year old children who cannot read yet. The app uses drag-and-drop command blocks to control 3D characters (gLTF models) in a Three.js environment.

**Target Release**: Mid-November 2025 (4-week development sprint)
**Development**: Claude Code + User review/adjustments
**Assets**: Free assets only (no outsourcing)

## Key Design Principles

1. **No text interface** - Everything uses icons and voice guidance
2. **Large touch targets** - Minimum 80x80px for toddler hands
3. **Unified color system** - Strict adherence to brand colors (see `src/docs/ui-design-system.md`)
4. **Amazon Fire Tablet support** - Performance-optimized rendering for low-spec devices
5. **Progressive feature introduction** - Start with basic commands (forward/back/left/right), add loops and conditionals later

## Initial Setup

```bash
# Create Next.js project
npx create-next-app@latest kidscoding --typescript --tailwind --app
cd kidscoding

# Install core dependencies
npm install three @react-three/fiber @react-three/drei
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install zustand
npm install clsx class-variance-authority

# Development
npm run dev

# Build
npm run build

# Deploy (Vercel)
vercel --prod
```

## Architecture

### Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home/stage selection
│   ├── stage/[id]/page.tsx       # Stage gameplay (dynamic route)
│   ├── select-character/page.tsx # Character selection
│   └── parent-dashboard/page.tsx # Parent progress view
├── components/
│   ├── ui/                       # Reusable UI (Button, Card, etc.)
│   ├── programming/              # Programming-specific components
│   │   ├── CommandPanel.tsx      # Command palette (drag source)
│   │   ├── ProgramArea.tsx       # Program execution area (drop zone)
│   │   └── CommandBlock.tsx      # Individual command blocks
│   └── three/                    # Three.js 3D components
│       ├── Scene.tsx             # Main 3D scene wrapper
│       ├── Character.tsx         # gLTF character with animations
│       └── Stage.tsx             # 3D stage environment
├── lib/
│   ├── store/                    # Zustand state management
│   │   ├── program.ts            # Program state (commands, execution)
│   │   ├── character.ts          # Character state (position, rotation, animation)
│   │   └── stage.ts              # Stage state (current stage, progress)
│   ├── interpreter/              # Program execution engine
│   │   └── executor.ts           # ProgramExecutor class
│   ├── audio/                    # Sound system
│   │   ├── voice-guide.ts        # VoiceGuide class (speech synthesis)
│   │   └── sound-effects.ts      # SoundEffects class
│   ├── hooks/                    # Custom React hooks
│   └── utils/                    # Utility functions
│       ├── device-detection.ts   # Fire tablet detection & performance level
│       └── webgl-check.ts        # WebGL capability check
├── types/
│   ├── programming.ts            # Command, ProgramState types
│   ├── character.ts              # Character interface
│   └── stage.ts                  # Stage interface
├── docs/                         # Design documents (READ THESE FIRST)
│   ├── requirements.md           # Full requirements specification
│   ├── technical-specification.md # Detailed tech specs with code examples
│   ├── ui-design-system.md       # Color system, typography, components
│   └── development-plan.md       # 4-week development schedule
└── public/
    ├── models/                   # gLTF 3D models (<500KB each, Draco compressed)
    ├── sounds/                   # Sound effects & voice files
    └── images/                   # UI images and icons
```

### State Management (Zustand)

Three main stores:

1. **programStore** (`lib/store/program.ts`)
   - `commands: Command[]` - User's program (ordered command blocks)
   - `isRunning: boolean` - Execution state
   - `currentStep: number` - Current execution step
   - Actions: `addCommand`, `removeCommand`, `startExecution`, `reset`

2. **characterStore** (`lib/store/character.ts`)
   - `position: {x, y, z}` - Character position in 3D space
   - `rotation: number` - Character rotation (degrees)
   - `animation: 'idle' | 'walk' | 'celebrate' | 'sad'` - Current animation
   - Actions: `moveForward`, `turnLeft`, `turnRight`, `setAnimation`

3. **stageStore** (`lib/store/stage.ts`)
   - Current stage data, goal position, obstacles, clear status
   - Local storage persistence for progress

### Program Execution Engine

**ProgramExecutor** class (`lib/interpreter/executor.ts`):
- Interprets `Command[]` and executes sequentially
- Async execution with animation timing (1000ms per move, 500ms per rotation)
- Supports nested commands (loops, conditions in future phases)
- Updates `characterStore` state during execution

### Core Types

```typescript
// types/programming.ts
type CommandType = 'forward' | 'backward' | 'left' | 'right' | 'loop' | 'if';

interface Command {
  id: string;
  type: CommandType;
  params?: {
    count?: number;        // Loop iterations
    condition?: string;    // Conditional logic
    children?: Command[];  // Nested commands
  };
}
```

## Critical Implementation Notes

### Amazon Fire Tablet Support

Always implement device detection and performance-based rendering:

```typescript
// lib/utils/device-detection.ts
export function getDevicePerformanceLevel(): 'high' | 'medium' | 'low' {
  const ua = navigator.userAgent.toLowerCase();

  // Fire tablets = low performance mode
  if (ua.includes('silk') || ua.includes('kindle fire')) {
    return 'low';
  }

  const isMobile = /mobile|tablet|android|ipad/i.test(ua);
  const hasHighRAM = (navigator as any).deviceMemory >= 4;

  return isMobile && !hasHighRAM ? 'medium' : 'high';
}
```

Apply to Three.js Scene:
- **Low (Fire)**: No shadows, no antialiasing, pixelRatio=1, no environment maps
- **Medium**: Shadows on, antialiasing on, pixelRatio=1
- **High**: All features enabled, pixelRatio=min(devicePixelRatio, 2)

### UI Component Guidelines

**Always follow these rules** (from `src/docs/ui-design-system.md`):

1. **Color usage**:
   - Primary buttons: `bg-primary-500` (#2196F3 blue)
   - Success/Execute: `bg-secondary-500` (#8BC34A green)
   - Command blocks: Color-coded by type
     - Forward: `primary-400` (blue)
     - Turn: `accent-orange-500` (#FF9800)
     - Loop: `accent-purple-500` (#AB47BC)
     - Conditional: `accent-pink-500` (#EC407A)

2. **Touch targets**:
   - Minimum: `min-w-[80px] min-h-[80px]`
   - Recommended: `min-w-[96px] min-h-[96px]`
   - Important buttons: `min-w-[120px] min-h-[120px]`

3. **Font sizes**:
   - Base: `text-base` (24px) - larger than typical apps
   - Buttons: `text-lg` (32px)
   - Headings: `text-xl` (40px) or `text-2xl` (48px)

4. **Spacing**: 8px-based system
   - Use: `space-1` (8px), `space-2` (16px), `space-3` (24px), etc.
   - Button gaps: minimum `gap-4` (24px)

5. **Border radius**: Softer edges
   - Cards: `rounded-xl` (32px) or `rounded-2xl`
   - Buttons: `rounded-2xl` (24px)
   - Command blocks: `rounded-xl` (20px)

### Tailwind Configuration

The design system is fully defined in `src/docs/ui-design-system.md`. Configure `tailwind.config.js` with:

- Extended color palette (primary, secondary, accent, semantic colors)
- Custom font sizes (xs=14px, base=24px, lg=32px, xl=40px, 2xl=48px, 3xl=64px)
- Custom spacing (touch=80px, touch-lg=96px)
- Custom shadows (button, button-hover, card, card-hover)

### Drag & Drop (dnd-kit)

Use `@dnd-kit/core` and `@dnd-kit/sortable` for command block management:

- **CommandPanel**: `DragEndEvent` source for command types
- **ProgramArea**: `SortableContext` drop zone with `verticalListSortingStrategy`
- **CommandBlock**: `useSortable` hook for individual blocks
- Play sound effect on drop: `soundEffects.play('drop')`

### 3D Model Requirements

- Format: glTF 2.0 (.glb preferred)
- File size: <500KB per model (use Draco compression)
- Polygon count: <5000 triangles
- Textures: 512x512 or 1024x1024
- Required animations: idle, walk, celebrate, sad
- Source free assets from: Poly Pizza, Quaternius, Sketchfab (CC0)

### Voice & Sound System

**Voice Guidance** (VOICEVOX or Web Speech API):
- Keep phrases short (5-10 words)
- Use encouraging tone: "やったね！すごい！" (Success), "もういちどやってみよう！" (Try again)
- Implement in `lib/audio/voice-guide.ts`

**Sound Effects** (from 効果音ラボ, Freesound):
- Preload all sounds in `soundEffects.preload()`
- Key sounds: success, fail, click, drop, celebrate
- Keep volume around 60-90%

## MVP Scope (November Release)

**INCLUDE**:
- 3 basic stages
- 4 commands (forward, backward, left, right)
- 1 character model (animal recommended)
- Voice guidance (5-10 phrases)
- Sound effects
- Local storage progress saving
- Fire tablet optimization

**EXCLUDE** (add after release):
- Loop blocks
- Conditional blocks
- Multiple characters
- Server-side persistence (Supabase)
- Parent dashboard (advanced)
- Achievements
- Background music

## Common Pitfalls to Avoid

1. **Don't use small UI elements** - Everything must be 80px+ for toddlers
2. **Don't add text labels** - Use icons only, supplement with voice
3. **Don't skip Fire tablet testing** - Apply low-performance mode from day one
4. **Don't use random colors** - Strictly follow the defined color system
5. **Don't make complex animations** - Keep them simple and predictable (10-15min attention span)
6. **Don't forget sound feedback** - Every interaction should have audio confirmation

## Testing Requirements

- Manual testing on Fire tablet (or Silk browser simulation)
- Test with large fingers/imprecise touch
- Verify WebGL support with fallback message
- Test offline functionality (localStorage)
- Performance: Lighthouse score >90 (Performance), >95 (Accessibility)

## Free Asset Resources

**3D Models**:
- Poly Pizza (https://poly.pizza/) - CC0, low-poly
- Quaternius (https://quaternius.com/) - Free glTF with animations
- Sketchfab (filter: downloadable, CC0)

**Sound Effects**:
- 効果音ラボ (https://soundeffect-lab.info/) - Japanese, commercial OK
- Freesound (https://freesound.org/) - CC0 filter

**Voice Synthesis**:
- VOICEVOX (https://voicevox.hiroshiba.jp/) - Free Japanese TTS
- Web Speech API - Browser built-in (fallback)

## Reference Documentation

Before implementing any feature, read the relevant design docs in `src/docs/`:

- `requirements.md` - Full feature requirements and user personas
- `technical-specification.md` - Complete code examples and architecture details
- `ui-design-system.md` - Comprehensive color system, typography, and component specs
- `development-plan.md` - 4-week timeline and task breakdown

When in doubt, refer to these documents first. They contain detailed implementation examples and rationale for all design decisions.
