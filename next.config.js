/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 's3-alpha-sig.figma.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 's3.cointelegraph.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'upload.wikimedia.org',
            port: '',
          },
        ],
      },
}

module.exports = nextConfig
