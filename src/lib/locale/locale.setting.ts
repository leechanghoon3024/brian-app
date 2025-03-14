import { defaultLocaleNameSpace, defaultLocale, supportedLocales } from '@/lib/locale/locale.const';
import { InitOptions } from 'i18next';

export function getOptions(
    lng = defaultLocale,
    ns: string | string[] = defaultLocaleNameSpace
): InitOptions<unknown> {
    return {
        supportedLngs: supportedLocales,
        fallbackLng: defaultLocale,
        lng,
        fallbackNS: defaultLocaleNameSpace,
        defaultNS: defaultLocaleNameSpace,
        ns
    };
}
