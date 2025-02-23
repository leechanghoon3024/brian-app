import { MetadataConst } from '@/const/menu.const';
import { DefaultApp, DefaultURL } from '@/const/site.const';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { Metadata, ResolvingMetadata } from 'next';

export const generateMetadata = (_: any, state: any) => {
    const pathname = Object.getOwnPropertySymbols(state)
        .map((item) => state[item])
        .find((state) => state?.hasOwnProperty('url'))?.url?.pathname;
    const pageTitles = MetadataConst;
    const data = pageTitles[pathname || ''] || DefaultApp;
    return {
        title: data.title,
        description: `${data.description}`,
        robots: 'index, follow',
        alternates: {
            canonical: `${DefaultURL}${pathname || ''}`
        }
    };
};
