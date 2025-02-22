import { ReactNode } from 'react';

interface IScreenContainer {
    children: ReactNode;
    className?: string;
}
export const ScreenContainer = ({ children, className }: IScreenContainer) => {
    return <div className={`w-full h-full overflow-hidden  ${className}`}>{children}</div>;
};
