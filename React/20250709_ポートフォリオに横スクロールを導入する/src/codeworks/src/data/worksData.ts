// data/worksData.ts
export type WorkData = {
  title: string;
  category: string;
  tags: string[];
  url: string| null;
};

export const worksData: { [index: number]: WorkData } = {
  1: {
    title: '最強のコンテンツ',
    category: 'WebSite',
    tags: ['Design', 'UI', 'Animation'],
    url: 'http://localhost:3000',
  },
  2: {
    title: 'ポートフォリオサイト',
    category: 'WebApp',
    tags: ['React', 'Next.js', 'Three.js'],
    url: 'http://localhost:3000',
  },
  3: {
    title: '育児記録アプリ',
    category: 'MobileApp',
    tags: ['React Native', 'Firebase', 'UX'],
    url: 'http://localhost:3000',
  },
  4: {
    title: '音楽ストリーミングUI',
    category: 'WebUI',
    tags: ['Figma', 'TailwindCSS', 'Accessibility'],
    url: 'http://localhost:3000',
  },
  5: {
    title: '地方PR動画サイト',
    category: 'LandingPage',
    tags: ['Motion', 'GSAP', 'Responsive'],
    url: null
  },
};
