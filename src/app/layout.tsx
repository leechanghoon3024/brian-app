import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import '@wethegit/react-marquee/style.css';
import { MainHeader } from '@/components/header/main.header';
import { BackgroundWrapper } from '@/components/background/background.star';
import type { Viewport } from 'next';

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
    userScalable: false,
    viewportFit: 'cover'
    // Also supported but less commonly used
    // interactiveWidget: 'resizes-visual',
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
