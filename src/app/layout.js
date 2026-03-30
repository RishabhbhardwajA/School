import './globals.css';

export const metadata = {
  title: 'Delhi Excellence Public School — Shaping Future Leaders Since 1985',
  description: 'Delhi Excellence Public School (CBSE Affiliated) — Premium education with 38+ years of legacy, 100% board results, world-class facilities. Admissions Open 2026-27.',
  keywords: 'best CBSE school Delhi, premium school Delhi, Delhi Excellence Public School, admissions open 2026',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
