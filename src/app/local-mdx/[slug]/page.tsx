import { getBlogPosts } from '@/lib/mdx';
import { useMDXComponents } from '@/mdx-components';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  const MDXComponents = useMDXComponents();
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
