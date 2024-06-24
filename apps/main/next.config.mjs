/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "grand-panda-430.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
