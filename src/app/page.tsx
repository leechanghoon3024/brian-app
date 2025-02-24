import { SoundWrapper } from '@/components/sound-body/sound.wrapper';
import { PageLoading } from '@/components/loading/page.loading';
export { generateMetadata } from '@/lib/seo/seo.site';
import { headers } from 'next/headers';

export async function detectDevice() {
    // @ts-ignore
    const userAgent = (await headers().get('user-agent')) || '';
    const isIPhone = /iPhone/i.test(userAgent);
    const isSafari = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);
    const isMobileSafari = isIPhone || isSafari;

    return { isMobileSafari };
}
export default async function Home() {
    const { isMobileSafari } = await detectDevice();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  gap-16 font-[family-name:var(--font-geist-sans)]">
            <main className="w-full h-full flex flex-col gap-8 row-start-2 items-center justify-center">
                <SoundWrapper isIOS={isMobileSafari} />
                <PageLoading />
            </main>
        </div>
    );
}
