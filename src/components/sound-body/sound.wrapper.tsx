import { SoundBody } from '@/components/sound-body/sound.body';
import { detectDevice } from '@/app/page';

export const SoundWrapper = async ({ isIOS }: { isIOS: boolean }) => {
    return <SoundBody isIOS={isIOS} />;
};
