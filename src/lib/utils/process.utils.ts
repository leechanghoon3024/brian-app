export const getProgressPercent = (currentTime: number, duration: number) => {
    if (duration === 0) return 0;
    const progress = (currentTime / duration) * 100;
    return parseFloat(progress.toFixed(2));
};
