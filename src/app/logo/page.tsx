import { TransitionList } from '@/components/list/transition.list';
import { Suspense } from 'react';
import { TransitionListFallback } from '@/components/list/transition.list.fallback';
import { NSpaceLogo } from '@/components/logo/n.space';
export { generateMetadata } from '@/lib/seo/seo.site';
export default function ListPage() {
    return (
        <main className="flex flex-col items-center justify-center h-[80vh] mt-[100px]">
            <div className="w-full max-w-4xl h-full shadow-lg px-0 md:px-4">
                <NSpaceLogo />
            </div>
        </main>
    );
}
