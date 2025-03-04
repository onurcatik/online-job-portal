/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["res.cloudinary.com", "img.clerk.com"], // Cloudinary ve Clerk domainlerini güvenli olarak belirle
    },
    eslint: {
      ignoreDuringBuilds: true, // Build sırasında ESLint hatalarını yok say
    },
    typescript: {
      ignoreBuildErrors: true, // Build sırasında TypeScript hatalarını yok say
    },
    experimental: {
      missingSuspenseWithCSRBailout: false, // Suspense ile ilgili deneysel özelliği devre dışı bırak
    },
    reactStrictMode: true, // React Strict Mode'u aktif et (isteğe bağlı)
    swcMinify: true, // SWC minification ile performansı artır
  };
  
  module.exports = nextConfig;
  