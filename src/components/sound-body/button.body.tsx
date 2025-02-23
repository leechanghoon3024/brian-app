import { useScreenStore } from '@/lib/state/player.state';
import { useAudioStore } from '@/lib/state/audio.state';
import { useButtonProgress } from '@/lib/hooks/use.button.progress';
import { useCamera } from '@react-three/drei';

export const ButtonBody = () => {
    const {
        handleCenterProgress,
        handleRightProgress,
        handleBottomProgress,
        handleTopProgress,
        handleLeftProgress
    } = useButtonProgress();
    const menuButtonConstant = 'w-[40px] h-[40px] ';

    return (
        <div className="cursor-pointer relative w-40 h-40 flex items-center justify-center rounded-full">
            {/* 중앙 버튼 */}
            <div
                onClick={() => handleCenterProgress()}
                className={`absolute w-10 h-10 bg-gray-700 rounded-full ${menuButtonConstant}`}
            ></div>
            {/* 상단 MENU 버튼 */}
            <div
                onClick={() => handleTopProgress()}
                className={`absolute top-6 text-black text-xs ${menuButtonConstant}`}
            ></div>
            {/* 좌측 버튼 */}
            <div
                onClick={() => handleLeftProgress()}
                className={`absolute left-2 text-white text-lg ${menuButtonConstant}`}
            ></div>
            {/* 우측 버튼 */}
            <div
                onClick={() => handleRightProgress()}
                className={`absolute right-2 text-white text-lg ${menuButtonConstant}`}
            ></div>
            {/* 하단 버튼 */}
            <div
                onClick={() => handleBottomProgress()}
                className={`absolute bottom-6 text-white text-lg ${menuButtonConstant}`}
            ></div>
        </div>
    );
};
