/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
      env: {
        CMS_SAAS: process.env.CMS_SAAS,
        OPTI_AI_KEY: process.env.OPTI_AI_KEY,
        OPTI_GRAPH_KEY: process.env.OPTI_GRAPH_KEY,
      }
};

export default nextConfig;
