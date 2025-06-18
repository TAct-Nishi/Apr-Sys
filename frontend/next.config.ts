/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        // FlaskのAPIサーバーのURLを指定
        source: '/api/:path*',
        destination: 'http://162.43.70.208:9000/api/:path*',
      },
    ]
  },
}

export default nextConfig;
