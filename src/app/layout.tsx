import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import '@wethegit/react-marquee/style.css';
import { MainHeader } from '@/components/header/main.header';
import { BackgroundWrapper } from '@/components/background/background.star';
import type { Metadata, Viewport } from 'next';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
};

export const metadata: Metadata = {
    icons: [
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: 'images/favicon/favicon-32x32.png'
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: 'images/favicon/favicon-16x16.png'
        },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            url: 'images/favicon/apple-touch-icon.png'
        }
    ]
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <MainHeader />
                <BackgroundWrapper />
                {children}
            </body>
        </html>
    );
}
