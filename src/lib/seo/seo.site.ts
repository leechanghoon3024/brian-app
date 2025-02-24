import { MetadataConst } from '@/const/menu.const';
import { DefaultApp, DefaultURL } from '@/const/site.const';

export const generateMetadata = (_: any, state: any) => {
    const pathname = Object.getOwnPropertySymbols(state)
        .map((item) => state[item])
        .find((state) => state?.hasOwnProperty('url'))?.url?.pathname;
    console.log('pathname', pathname);
    const pageTitles = MetadataConst;
    const data = pageTitles[pathname || ''] || DefaultApp;
    console.log('data', data);

    return {
        title: data.title,
        description: `${data.description}`,
        robots: 'index, follow',
        alternates: {
            canonical: `${DefaultURL}${pathname || ''}`
        }
    };
};
