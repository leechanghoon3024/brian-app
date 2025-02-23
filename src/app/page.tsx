import { SoundWrapper } from '@/components/sound-body/sound.wrapper';
import { PageLoading } from '@/components/loading/page.loading';
export { generateMetadata } from '@/lib/seo/seo.site';
export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  gap-16 font-[family-name:var(--font-geist-sans)]">
            <main className="w-full h-full flex flex-col gap-8 row-start-2 items-center justify-center">
                <SoundWrapper />
                <PageLoading />
            </main>
        </div>
    );
}
