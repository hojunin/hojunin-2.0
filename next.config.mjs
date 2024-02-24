import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import prism from 'rehype-prism-plus';

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'lnwblzacktgzeiihvxtu.supabase.co',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [prism],
  },
});

export default withMDX(nextConfig);
