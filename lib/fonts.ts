import localFont from 'next/font/local';

// If the font file doesn't exist, we'll use a fallback
export const jameelNoori = localFont({
  src: [
    {
      path: '../public/fonts/jameel-noori-nastaleeq.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-jameel-noori',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

// Fallback font in case the main font fails to load
export const systemFont = {
  variable: '--font-system',
};