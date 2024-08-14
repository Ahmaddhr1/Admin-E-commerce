/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "utfs.io",  
        },
        {
          protocol: "https",
          hostname: "via.placeholder.com",  
        },
      ],
    },
  };
  
  export default nextConfig;
  