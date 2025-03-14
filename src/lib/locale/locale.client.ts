// i18next.client.ts
'use client';

import { useEffect } from 'react';
import i18next, { FlatNamespace, KeyPrefix } from 'i18next';
import {
    initReactI18next,
    useTranslation as originalUseTranslation,
    UseTranslationOptions,
    UseTranslationResponse,
    FallbackNs
} from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions } from '@/lib/locale/locale.setting';
// import { useCookies } from 'react-cookie';
import { defaultLocale } from '@/lib/locale/locale.const';

if (!i18next.isInitialized) {
    i18next
        .use(initReactI18next)
        .use(
            resourcesToBackend(
                (lng: string, ns: string) => import(`@/lib/locale/lang/${lng}/${ns}.json`)
            )
        )
        .init({
            ...getOptions(),
            lng: defaultLocale
        });
}

export default i18next;

/**
 * 클라이언트 컴포넌트에서 번역 기능을 사용할 때 호출하는 Hook입니다.
 * URL이나 다른 방법으로 전달받은 language 값을 기반으로 i18next의 언어를 변경하고,
 * 쿠키에 저장하여 재사용할 수 있도록 합니다.
 *
 * @param language - 현재 사용자가 선택한 언어 (예: 'ko', 'en', 'jp')
 * @param namespace - 사용할 네임스페이스 (예: 'translation') 또는 네임스페이스 배열
 * @param options - react-i18next의 추가 옵션
 * @returns { t, i18n } 객체
 */
export function useClientTranslation<
    LocaleNamespace extends FlatNamespace,
    TranslationKeyPrefix extends KeyPrefix<FallbackNs<LocaleNamespace>> = undefined
>(
    language: string,
    namespace?: LocaleNamespace,
    options?: UseTranslationOptions<TranslationKeyPrefix>
): UseTranslationResponse<FallbackNs<LocaleNamespace>, TranslationKeyPrefix> {
    // const [cookies, setCookie] = useCookies([cookieName]);
    const translation = originalUseTranslation(namespace, options);
    const { i18n } = translation;

    useEffect(() => {
        if (language && i18n.resolvedLanguage !== language) {
            i18n.changeLanguage(language);
        }
    }, [language, i18n]);

    // useEffect(() => {
    //     if (cookies.i18next !== language) {
    //         setCookie(cookieName, language, { path: '/' });
    //     }
    // }, [language, cookies.i18next, setCookie]);

    return translation;
}
