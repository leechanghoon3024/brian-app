import { NextResponse } from 'next/server';
import { DemoImageList } from '@/mock/image.list';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') || '1');

    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    if (searchParams.has('selectIndex')) {
        const index = Number(searchParams.get('selectIndex'));
        if (index < 0 || index >= DemoImageList.length) {
            return NextResponse.json({ error: 'Invalid index' }, { status: 400 });
        }
        const selectData = {
            id: index,
            title: `제목 ${index + 1}`,
            description: `이것은 항목 ${index}의 설명입니다.`,
            image: DemoImageList[index - 1].download_url
        };
        return NextResponse.json({ data: selectData });
    }
    const itemsPerPage = 10;
    const start = (page - 1) * itemsPerPage;
    const data = Array.from({ length: itemsPerPage }, (_, i) => {
        const demoImage = DemoImageList[(start + i) % DemoImageList.length];
        return {
            id: start + i + 1,
            title: `제목 ${start + i + 1}`,
            description: `이것은 항목 ${start + i + 1}의 설명입니다.`,
            image: demoImage.download_url
        };
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return NextResponse.json({ data, nextPage: page < 5 ? page + 1 : null });
}
