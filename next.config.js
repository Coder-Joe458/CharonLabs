/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/CharonLabs',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

