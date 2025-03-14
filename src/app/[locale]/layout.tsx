import React from 'react';
import { HydrationSetting } from '@/lib/locale/hydration.setting';
import { LocaleProvider } from '@/lib/locale/locale.provier';
import { QueryProvider } from '@/lib/api/query.client';
import { MainHeader } from '@/components/header/main.header';
import { BackgroundWrapper } from '@/components/background/background.star';
import { NextIntlClientProvider } from 'next-intl';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import type { Metadata, Viewport } from 'next';

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}
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

export default async function RootLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params;
    // const { t } = await serverTranslation(locale, 'main');
    return (
        <html>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <QueryProvider>
                    <NextIntlClientProvider>
                        <MainHeader />
                        <BackgroundWrapper />
                        <HydrationSetting locale={locale} />
                        {children}
                    </NextIntlClientProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
