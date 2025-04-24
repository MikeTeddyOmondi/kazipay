import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Kazipay',
  description: 'Simple onboarding and time tracking',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white border-b-2 border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Kazipay</h1>
          <div className="space-x-2">
            <Link href="/" className="text-gray-700 hover:underline">Onboarding</Link>
            <Link href="/time-in" className="text-gray-700 hover:bg-blend-color">Time-in</Link>
            <Link href="/time-out" className="text-gray-700 hover:underline">Time-out</Link>
          </div>
        </nav>
        <main className="p-6 sm:p-12"> {children} </main>
      </body>
    </html>
  );
}