import { SoundBody } from '@/components/sound-body/sound.body';

export const SoundWrapper = async ({ isIOS }: { isIOS: boolean }) => {
    return <SoundBody isIOS={isIOS} />;
};
