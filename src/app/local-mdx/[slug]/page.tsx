import { getBlogPosts, getPostContent } from '@/lib/mdx';
import { useMDXComponents } from '@/mdx-components';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

export default function Blog({ params }) {
  const MDXComponents = useMDXComponents();

  let post = getPostContent(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <section>
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <MDXRemote source={post.content} components={MDXComponents} />
      </article>
    </section>
  );
}

export async function generateStaticParams() {
  const contents = getBlogPosts();
  // 서버 데이터와 정합성 맞추기
  if (!contents) {
    return [];
  }
  return contents.map(({ slug }) => ({
    slug,
  }));
}

export const dynamic = 'error';
export const revalidate = 3600;
