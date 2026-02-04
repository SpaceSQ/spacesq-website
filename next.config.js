/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 忽略 TypeScript 报错，强制构建
    ignoreBuildErrors: true,
  },
  eslint: {
    // 忽略 ESLint 语法检查，强制构建
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
