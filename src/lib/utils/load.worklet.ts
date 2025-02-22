export const installWorklet = async (raw: string, ctx?: AudioContext) => {
    if (ctx) {
        try {
            const blob = new Blob([raw], { type: 'application/javascript' });
            const workerUrl = URL.createObjectURL(blob);
            await ctx.audioWorklet.addModule(workerUrl);
            return;
        } catch (error) {
            console.error('not install audio', error);
        }
    }
};

export const loadWorklet = (raw: string) => {
    const blob = new Blob([raw], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    return new Worker(workerUrl);
};
