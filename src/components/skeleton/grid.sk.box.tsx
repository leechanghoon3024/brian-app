export const GridSkBox = () => {
    return (
        <div className="cursor-pointer overflow-hidden border p-2 rounded-lg relative w-full aspect-[2/1]">
            <div className="w-full h-full animate-pulse">
                <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <rect width="100%" height="100%" fill="url(#gradient)" />
                    <defs>
                        <linearGradient id="gradient">
                            <stop offset="0%" stopColor="#E0E0E0">
                                <animate
                                    attributeName="offset"
                                    values="-1;1"
                                    dur="1.5s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                            <stop offset="50%" stopColor="#F0F0F0">
                                <animate
                                    attributeName="offset"
                                    values="-1.5;1.5"
                                    dur="1.5s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                            <stop offset="100%" stopColor="#E0E0E0">
                                <animate
                                    attributeName="offset"
                                    values="-1;1"
                                    dur="1.5s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};
