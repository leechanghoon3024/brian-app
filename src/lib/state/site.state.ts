import { create } from 'zustand';

interface SiteState {
    isIos: boolean;
    setIsIos: (ios: boolean) => void;
}

export const useSiteStore = create<SiteState>((set) => ({
    isIos: false,
    setIsIos: (ios) => set({ isIos: ios })
}));
