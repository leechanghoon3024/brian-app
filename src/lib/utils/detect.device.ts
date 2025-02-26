import { headers } from 'next/headers';

export async function detectDevice() {
    // @ts-ignore
    const userAgent = (await (await headers()).get('user-agent')) || '';
    const isIPhone = /iPhone/i.test(userAgent);
    const isSafari = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);
    const isMobileSafari = isIPhone || isSafari;

    return { isMobileSafari };
}
