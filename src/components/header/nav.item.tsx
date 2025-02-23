import Link from 'next/link';

export const NavItem = ({
    href,
    pathname,
    children,
    onClick,
    blank
}: {
    href: string;
    pathname: string;
    children: React.ReactNode;
    blank?: boolean;
    onClick?: () => void;
}) => {
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`relative text-xl font-bold transition-all duration-300 px-4 py-2 rounded-lg ${
                isActive ? 'bg-purple-500/20 backdrop-blur-lg' : 'hover:bg-purple-500/10'
            }`}
            target={blank ? '_blank' : '_self'}
        >
            <span className="text-purple-200 drop-shadow-glow">{children}</span>
        </Link>
    );
};
