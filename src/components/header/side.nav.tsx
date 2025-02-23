import { AnimatePresence, motion } from 'framer-motion';
import { FaGithub, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/components/header/nav.item';
import { useEffect } from 'react';
import { MenuConst } from '@/const/menu.const';
interface ISideNav {
    isOpen: boolean;
    onOpen: (state: boolean) => void;
}
export const SideNav = ({ isOpen, onOpen }: ISideNav) => {
    const pathname = usePathname();
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && !(event.target as HTMLElement).closest('#sidebar')) {
                onOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key={'sidebar'}
                    id="sidebar"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="fixed top-0 right-0 h-screen w-64 bg-[#1A0B28] backdrop-blur-2xl text-white p-6 shadow-lg z-[999999999]"
                >
                    <button className="absolute top-4 right-4" onClick={() => onOpen(false)}>
                        <FaTimes size={30} />
                    </button>
                    <nav className="mt-16 flex flex-col gap-6">
                        {MenuConst.map((v) => (
                            <NavItem
                                key={v.name}
                                href={v.href}
                                pathname={pathname}
                                onClick={() => onOpen(false)}
                                blank={v.blank}
                            >
                                {v.name}
                            </NavItem>
                        ))}
                        <Link
                            href="https://github.com/leechanghoon3024/brian-app"
                            target="_blank"
                            className="flex items-center gap-2 text-xl font-bold"
                        >
                            <FaGithub size={30} />
                            GitHub
                        </Link>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
