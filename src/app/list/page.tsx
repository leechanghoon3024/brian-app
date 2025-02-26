import { TransitionList } from '@/components/list/transition.list';
import { Suspense } from 'react';
import { TransitionListFallback } from '@/components/list/transition.list.fallback';
export { generateMetadata } from '@/lib/seo/seo.site';
export default function ListPage() {
    return (
        <main className="flex flex-col items-center justify-center h-[80vh] mt-[100px]">
            <h1 className="text-2xl font-bold mb-4">List </h1>
            <div className="w-full max-w-4xl h-full shadow-lg px-0 md:px-4">
                <Suspense fallback={<TransitionListFallback />}>
                    <TransitionList />
                </Suspense>
            </div>
        </main>
    );
}
