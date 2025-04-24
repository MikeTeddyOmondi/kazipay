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
      <body className="bg-gray-100 min-h-screen ">
        <nav className="bg-white border-b-2 border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Kazipay</h1>
          <div className="space-x-2">
            <Link href="" className="rounded-lg px-4 py-2 text-sm text-black  bg-pink-300 hover:from-blue-600 hover:to-purple-700">Onboarding</Link>
            <Link href="/time-in" className="rounded-lg px-4 py-2 text-sm bg-green-600 text-black  bg-green-300 hover:from-blue-600 hover:to-purple-700">Time-in</Link>
            <Link href="/time-out" className="rounded-lg px-4 py-2 text-sm  text-black  bg-red-500 hover:from-blue-600 hover:to-purple-700">Time-out</Link>
          </div>
        </nav>
        <main className="p-6 sm:p-12 bg-white h-[789px]"> {children} </main>
      </body>
    </html>
  );
}