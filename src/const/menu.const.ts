import { DefaultApp } from '@/const/site.const';

export const MenuConst = [
    { href: '/', name: 'HAMP3', blank: false },
    { href: '/about', name: 'About', blank: false },
    { href: 'https://github.com/leechanghoon3024/brian-app', name: 'Github', blank: true }
];

export const MetadataConst: Record<string, { title: string; description: string }> = {
    '/': { title: `${DefaultApp} - HAMP3`, description: 'HAMP3 - minimal mp3 application' },
    '/about': { title: `${DefaultApp} - About Me`, description: 'About Me - Supplied by Notion' }
};
