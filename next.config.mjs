import withMDX from '@next/mdx';

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['i.imgur.com', 'lnwblzacktgzeiihvxtu.supabase.co'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withMDX({})(nextConfig);
