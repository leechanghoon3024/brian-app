import { Suspense } from 'react';
import { ImageModal } from '@/components/modal/image.modal';

export default async function ItemModal({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) return null;
    return (
        <Suspense>
            <ImageModal id={id} />
        </Suspense>
    );
}
