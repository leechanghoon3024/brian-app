import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/i18n/route';

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
