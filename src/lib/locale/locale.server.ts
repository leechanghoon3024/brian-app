import { createInstance, FlatNamespace, KeyPrefix } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import { FallbackNs } from 'react-i18next';
import { getOptions } from '@/lib/locale/locale.setting';

// 캐시 객체: key는 `${language}__${namespace}` 형태로 구성
const i18nInstanceCache: Record<string, ReturnType<typeof createInstance>> = {};

/**
 * 캐시 키를 생성합니다.
 * @param language - 사용할 언어 코드 (예: 'ko')
 * @param namespace - 사용할 네임스페이스 (예: 'translation') 또는 네임스페이스 배열
 * @returns 캐시 키 문자열
 */
const generateCacheKey = (language: string, namespace: string | string[]): string => {
    const nsKey = Array.isArray(namespace) ? namespace.join(',') : namespace;
    return `${language}__${nsKey}`;
};

/**
 * 서버 전용 i18next 인스턴스를 캐시를 확인하여 초기화하거나 재사용합니다.
 * @param language - 사용할 언어 코드 (예: 'ko')
 * @param namespace - 사용할 네임스페이스 (예: 'translation') 또는 네임스페이스 배열
 * @returns 초기화된 i18next 인스턴스
 */
const initializeServerI18nInstance = async (language: string, namespace: string | string[]) => {
    const cacheKey = generateCacheKey(language, namespace);
    if (i18nInstanceCache[cacheKey]) {
        return i18nInstanceCache[cacheKey];
    }
    const i18nInstance = createInstance();
    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend((lng: string, ns: string) => import(`./lang/${lng}/${ns}.json`)))
        .init(getOptions(language, namespace));
    i18nInstanceCache[cacheKey] = i18nInstance;
    return i18nInstance;
};

/**
 * 서버 컴포넌트에서 번역 기능을 사용할 때 호출합니다.
 * @param language - 요청 언어
 * @param namespace - 네임스페이스 (또는 네임스페이스 배열)
 * @param options - 추가 옵션 (예: keyPrefix)
 * @returns { t, i18n } 객체
 */
export async function serverTranslation<
    LocaleNamespace extends FlatNamespace,
    TranslationKeyPrefix extends KeyPrefix<FallbackNs<LocaleNamespace>> = undefined
>(
    language: string,
    namespace?: LocaleNamespace,
    options: { keyPrefix?: TranslationKeyPrefix } = {}
) {
    const i18nInstance = await initializeServerI18nInstance(
        language,
        Array.isArray(namespace) ? namespace : (namespace as string)
    );
    return {
        t: i18nInstance.getFixedT(language, namespace, options.keyPrefix),
        i18n: i18nInstance
    };
}
