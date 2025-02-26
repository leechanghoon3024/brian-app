'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSuspenseQuery } from '@tanstack/react-query';
import { API_URL } from '@/const/api.const';
import { MotionImage } from '@/components/image/motion.image';

export const ImageModal = ({ id }: { id: string }) => {
    const router = useRouter();
    const { data: item } = useSuspenseQuery({
        queryKey: ['item', id],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/api/data?selectIndex=${id}`);
            if (!res.ok) throw new Error('실패');
            const result = await res.json();
            return result.data;
        }
    });

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => router.back()}
        >
            <motion.div
                className="bg-white p-4 rounded-lg w-[600px] relative overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                layoutId={`item-${item.id}`}
            >
                <div className="relative w-[600px] h-[400px] overflow-hidden rounded-lg">
                    <MotionImage
                        src={item.image}
                        alt={item.title}
                        className="object-cover"
                        layoutId={`image-${item.id}`}
                        fill={true}
                        sizes="20vw"
                    />
                </div>
                <motion.div
                    className="p-4 text-white absolute top-0 left-0 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{
                        textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8)'
                    }}
                >
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="mt-2">{item.description}</p>
                </motion.div>
                <motion.div
                    className="absolute bottom-0 left-0 w-full bg-black p-6 text-white rounded-b-lg"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: 'easeIn' }}
                >
                    <p className="text-sm opacity-80">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
