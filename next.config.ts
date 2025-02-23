import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.worker\.js$/,
            use: 'raw-loader'
        });

        return config;
    }
    // experimental: {
    //     turbo: {
    //         rules: {
    //             '*.worker.js': {
    //                 loaders: ['raw-loader'],
    //                 as: 'asset/source'
    //             }
    //         }
    //     }
    // }
};

export default nextConfig;
