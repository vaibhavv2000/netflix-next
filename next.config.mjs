/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.edigitalagency.com.au',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'assets.stickpng.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: "www.ewbankauctions.co.uk",
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '*',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
 