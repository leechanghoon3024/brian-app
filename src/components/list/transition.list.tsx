'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { API_URL, getBaseUrl } from '@/const/api.const';
import { MotionImage } from '@/components/image/motion.image';

export const TransitionList = () => {
    const observer = useRef<IntersectionObserver | null>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
        queryKey: ['items'],
        queryFn: async ({ pageParam = 1 }) => {
            console.log('Fetching page:', pageParam);
            const res = await fetch(`${getBaseUrl()}/api/data?page=${pageParam}`);
            if (!res.ok) return [];
            return res.json();
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined
    });

    const lastItemRef = (node: HTMLDivElement | null) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );
        if (node) observer.current.observe(node);
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
                {data.pages
                    .flatMap((page) => page.data)
                    .map((item, index) => (
                        <Link
                            key={`${item?.id}-${index}`}
                            href={`/list/item/${item?.id}`}
                            as={`/list/item/${item?.id}`}
                            scroll={false}
                        >
                            <motion.div
                                ref={
                                    index === data.pages.flatMap((page) => page.data).length - 1
                                        ? lastItemRef
                                        : null
                                }
                                className="cursor-pointer overflow-hidden border p-2 rounded-lg relative w-full aspect-[2/1]"
                                layoutId={`item-${item?.id}`}
                            >
                                <div
                                    className={
                                        'overflow-hidden w-[150%] h-[160%] absolute top-[-50%] left-[-25%]'
                                    }
                                >
                                    <MotionImage
                                        src={item?.image}
                                        alt={item?.title}
                                        fill={true}
                                        className="w-full h-auto rounded-md inset-0"
                                        sizes="50vw"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
            </div>
            {isFetchingNextPage && <p className="text-center mt-4">더 불러오는 중...</p>}
        </div>
    );
};
