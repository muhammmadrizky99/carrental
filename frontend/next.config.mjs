import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {  
                protocol: 'http',
                hostname: 'localhost',
                port: '2500',
                pathname:'/uploads/**',
            },
        ],
    },

};

export default nextConfig;
