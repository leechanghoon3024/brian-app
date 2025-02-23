export const BackgroundWrapper = () => (
    <div className="z-[98] pointer-events-none flex justify-center items-start h-full fixed top-0 left-0 right-0">
        <BackgroundStar />
        <BackgroundBlur />
    </div>
);

export const BackgroundStar = () => (
    <div className="z-[99999] pointer-events-none bg-[url('/images/stars.png')] bg-cover h-full absolute inset-0" />
);

export const BackgroundBlur = () => (
    <div className="z-[99] absolute inset-0 overflow-hidden">
        <div className="blur-[512px] bg-[#b98dfc] w-full h-[80%] absolute top-[99.5vh] left-[-23.9vw]" />
    </div>
);
