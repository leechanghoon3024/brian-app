import { create } from 'zustand';

type ScreenNameType = 'init' | 'loading' | 'music';
type MenuNameType = 'init' | 'musicList' | 'options';

type ScreenState = {
    screens: ScreenNameType[];
    menuScreen: MenuNameType;
    currentScreen: ScreenNameType;
    setScreen: (screen: ScreenNameType) => void;
    setMenu: (menu: MenuNameType) => void;
    isOpen: boolean;
    setOpen: () => void;
};

export const useScreenStore = create<ScreenState>((set) => ({
    isOpen: false,
    screens: ['init', 'loading', 'music'],
    menuScreen: 'init',
    currentScreen: 'init',
    setOpen: () =>
        set(() => ({
            isOpen: true
        })),
    setScreen: (screen) =>
        set((state) => ({
            currentScreen: state.screens.includes(screen) ? screen : state.currentScreen
        })),
    setMenu: (menu) =>
        set(() => ({
            menuScreen: menu
        }))
}));
