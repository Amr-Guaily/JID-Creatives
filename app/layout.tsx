import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Movie Search App - Discover Your Next Favorite Movie',
  description:
    'Search through thousands of movies and TV shows. Get detailed information including cast, ratings, plot, and more using the OMDb API.',
  keywords: ['movies', 'search', 'film', 'cinema', 'OMDb', 'movie database'],
  authors: [{ name: 'JID Creatives' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <header className="bg-white shadow-sm border-b">
            <div className="container">
              <div className="flex justify-between items-center h-16">
                <h1 className="text-2xl font-bold text-gray-900">
                  🎬 Movie Search
                </h1>
              </div>
            </div>
          </header>

          <main className="container py-8 flex-1 my-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
