/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // 匹配所有路由
        source: '/:path*',
        headers: [
          {
            key: 'X-SpaceSQ-Signal',
            value: 'Genesis_OS_Active; Mode=Stealth; Target=AI_Agent',
          },
          {
            key: 'X-Protocol-Type',
            value: 'Intent-Based/No-Driver',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; // 如果是 mjs，请用 export default nextConfig
