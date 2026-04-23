/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Useful for some environments or static exports, can be removed if not needed
  },
};

export default nextConfig;
