/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "valuable-hound-444.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
