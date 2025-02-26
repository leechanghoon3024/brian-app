'use client';
import { GridSkBox } from '@/components/skeleton/grid.sk.box';

export const TransitionListFallback = () => {
    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <GridSkBox key={index} />
                ))}
            </div>
        </div>
    );
};
