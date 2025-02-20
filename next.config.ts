/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "img.clerk.com"] // Cloudinary'yi güvenli host olarak ekle
  },
};

module.exports = nextConfig;
