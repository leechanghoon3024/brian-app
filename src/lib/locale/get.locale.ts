import Negotiator from 'negotiator';
import { defaultLocale, supportedLocales } from '@/lib/locale/locale.const';
import { NextRequest } from 'next/server';

export function getLocale(request: NextRequest): string {
    const cookieLocale = request.cookies.get('locale')?.value;
    if (cookieLocale && supportedLocales.includes(cookieLocale)) {
        return cookieLocale;
    }
    const headers = Object.fromEntries(request.headers.entries());
    const negotiator = new Negotiator({ headers });
    const languages = negotiator.languages();
    let detectedLocale = defaultLocale;
    for (const lang of languages) {
        if (supportedLocales.includes(lang)) {
            detectedLocale = lang;
            break;
        }
        const primaryLang = lang.split('-')[0];
        if (supportedLocales.includes(primaryLang)) {
            detectedLocale = primaryLang;
            break;
        }
    }
    // response.cookies.set('locale', detectedLocale);

    return detectedLocale;
}
