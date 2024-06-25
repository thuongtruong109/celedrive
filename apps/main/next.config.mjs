/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    // swcMinify: true,
    /**
     * If you are using `appDir` then you must comment the below `i18n` config out.
     * @see https://github.com/vercel/next.js/issues/41980
    */
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    images: {
        domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
    },
};

export default nextConfig;
