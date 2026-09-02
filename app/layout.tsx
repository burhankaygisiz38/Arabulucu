import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'ADB Resmi Arabuluculuk Asistanı | Adalet Bakanlığı 6325 Standartları',
  description: 'T.C. Adalet Bakanlığı Arabuluculuk Daire Başkanlığı standartlarına ve 6325 sayılı Kanun\'a %100 uyumlu evrak üreticisi ve dosya analiz asistanı',
  openGraph: {
    title: 'ADB Resmi Arabuluculuk Asistanı | Adalet Bakanlığı 6325 Standartları',
    description: 'T.C. Adalet Bakanlığı Arabuluculuk Daire Başkanlığı standartlarına ve 6325 sayılı Kanun\'a %100 uyumlu evrak üreticisi ve dosya analiz asistanı',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADB Resmi Arabuluculuk Asistanı',
    description: 'T.C. Adalet Bakanlığı Arabuluculuk Daire Başkanlığı standartlarına ve 6325 sayılı Kanun\'a %100 uyumlu evrak üreticisi',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
