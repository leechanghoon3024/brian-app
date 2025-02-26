'use client';
import { QueryClient as ReactQueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cache, ReactNode, useState } from 'react';
export const getQueryClient = cache(() => new ReactQueryClient());

export const QueryProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const [client] = useState(new ReactQueryClient());
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
