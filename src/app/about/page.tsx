import { IframeNotion } from '@/components/iframe/iframe.notion';
import Link from 'next/link';
import { Suspense } from 'react';
export { generateMetadata } from '@/lib/seo/seo.site';
export default function About() {
    return (
        <main className="flex flex-col items-center justify-center h-[80vh] mt-[100px]">
            <Link href={'https://dolomite-smartphone-f70.notion.site/brian'} target={'_blank'}>
                <h1 className="text-2xl font-bold mb-4">Notion </h1>
            </Link>
            <div className="w-full max-w-4xl h-full shadow-lg px-0 md:px-4">
                <IframeNotion />
            </div>
        </main>
    );
}
