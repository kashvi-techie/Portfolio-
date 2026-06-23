import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kashvi Pundir — UI Engineer & Product Designer',
  description:
    'UI Engineer & Product Designer building AI-native products with clean code and meaningful design.',
  openGraph: {
    title: 'Kashvi Pundir — UI Engineer & Product Designer',
    description:
      'Crafting digital experiences that are thoughtful, intelligent & timeless.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: '#0E1B15', color: '#FBF7F0' }}>
        {children}
      </body>
    </html>
  );
}
