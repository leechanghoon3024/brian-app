import { SoundWrapper } from '@/components/sound-body/sound.wrapper';
import { PageLoading } from '@/components/loading/page.loading';
import { detectDevice } from '@/lib/utils/detect.device';
export { generateMetadata } from '@/lib/seo/seo.site';

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
