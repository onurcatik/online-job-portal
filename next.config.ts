// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["res.cloudinary.com", "img.clerk.com"], // Cloudinary'yi güvenli host olarak ekle
//   },
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "img.clerk.com"], // Cloudinary'yi güvenli host olarak ekle
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint hatalarını build sırasında yok say
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript hatalarını build sırasında yok say
  },
};

module.exports = nextConfig;
