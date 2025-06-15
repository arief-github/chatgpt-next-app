import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Next Chat GPT APP",
  description: "Powered by Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <header className='text-white font-bold bg-green-900 text-2xl p-2 mb-3 rounded-b-lg shadow-gray-700 shadow-lg flex'>
            <div className='flex flex-grow'>
                <Link href='/'>GPT Chat</Link>
                <Link href='/about' className='ml-5 font-light'>About</Link>
            </div>
            <></>
        </header>
        <div className='flex flex-col md:flex-flow'>
            <div className='flex-grow'>{children}</div>
        </div>
      </body>
    </html>
  );
}
