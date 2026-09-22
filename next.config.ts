/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // أضف هنا دومين السيرفر اللي بيعرض الصور (مثلاً Strapi)
    domains: ['localhost',"localhost:1337","127.0.0.1"],
  },
};

export default nextConfig;
