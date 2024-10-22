/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "otakujatraserver.onrender.com",
      "good-erin-penguin-wrap.cyclic.cloud",
      "otakunodeserver.otaku-festival.com",
      "otakunode.otaku-festival.com",
    ],
  },
};

module.exports = nextConfig;
