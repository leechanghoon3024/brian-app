'use client';
import { SoundBody } from '@/components/sound-body/sound.body';
import { useSiteStore } from '@/lib/state/site.state';
import { useEffect } from 'react';
export const SoundWrapper = ({ isMobileSafari }: { isMobileSafari: boolean }) => {
    const { setIsIos } = useSiteStore();
    useEffect(() => {
        setIsIos(isMobileSafari);
    }, [isMobileSafari]);
    return <SoundBody />;
};
