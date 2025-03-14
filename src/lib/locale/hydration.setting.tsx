'use client';
import { useEffect } from 'react';

export const HydrationSetting = ({ locale }: { locale: string }) => {
    useEffect(() => {
        if (document) {
            document.documentElement.lang = locale;
        }
    }, [locale]);

    return null;
};
