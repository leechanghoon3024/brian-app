'use client';

import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/locale/locale.client';
interface LocaleProviderProps {
    locale: string;
    children: React.ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ locale, children }) => {
    i18n.changeLanguage(locale);
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
