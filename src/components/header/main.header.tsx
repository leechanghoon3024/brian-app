'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaGithub, FaBars } from 'react-icons/fa';
import { NavItem } from '@/components/header/nav.item';
import { SideNav } from '@/components/header/side.nav';
import { MenuConst } from '@/const/menu.const';
import Image from 'next/image';

export const MainHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const handleIsOpen = (state: boolean) => {
        setIsOpen(state);
    };

    return (
        <header className="fixed top-0 w-full  backdrop-blur-xl text-white p-4 shadow-lg z-[1000000000]">
            <div className="grid grid-cols-10 md:grid-cols-10 w-full items-center px-6">
                <div className="col-span-1 w-full">
                    <div className={'w-16 h-12 relative'}>
                        <Image
                            priority={true}
                            src={'/images/hamster/hamster.gif'}
                            alt={'/images/hamster/logo.png'}
                            fill={true}
                            style={{ objectFit: 'contain' }}
                            unoptimized
                        />
                    </div>
                </div>
                <div className="hidden md:flex col-span-8 items-center gap-6">
                    {MenuConst.map((v) => (
                        <NavItem key={v.name} href={v.href} pathname={pathname} blank={v.blank}>
                            {v.name}
                        </NavItem>
                    ))}
                </div>
                <div className="hidden md:flex md:col-span-1 w-full justify-end">
                    <Link href="https://github.com/leechanghoon3024/brian-app" target="_blank">
                        <FaGithub
                            size={30}
                            className="text-white hover:text-purple-300 transition-all duration-300"
                        />
                    </Link>
                </div>
                <div className="flex md:hidden justify-end col-span-9">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <FaBars size={30} />
                    </button>
                </div>
                <SideNav isOpen={isOpen} onOpen={handleIsOpen} />
            </div>
        </header>
    );
};
