export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const getBaseUrl = () => {
    return `${process.env.NEXT_PUBLIC_API_URL}`;
};

