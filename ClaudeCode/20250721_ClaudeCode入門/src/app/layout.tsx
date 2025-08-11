import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Guitar Gallery | 美しいギターの世界',
  description: 'ギターの魅力を伝える、美しく洗練されたギャラリー。アコースティック、エレキ、クラシック、ベースの多彩な世界をお楽しみください。',
  keywords: 'ギター, ギャラリー, 音楽, アート, 美しい楽器, guitar, music',
  openGraph: {
    title: 'Guitar Gallery | 美しいギターの世界',
    description: 'ギターの魅力を伝える、美しく洗練されたギャラリー',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}