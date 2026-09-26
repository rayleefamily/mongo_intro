import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, posts } from "../posts";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | 芒果誌`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/blog"
        className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft transition-colors hover:text-rust"
      >
        ← 返回芒果誌
      </Link>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rust">{post.tag}</p>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-xs text-ink-soft">
          {formatDate(post.date)} · {post.readTime}
        </p>
      </div>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          priority
          className="object-cover"
        />
      </div>

      <div className="mt-10 flex flex-col gap-8">
        {post.content.map((block, i) => (
          <div key={i}>
            {block.heading && (
              <h2 className="mb-3 font-serif text-xl text-ink sm:text-2xl">{block.heading}</h2>
            )}
            <p className="text-base leading-relaxed text-ink-soft">{block.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-line pt-8">
        <Link
          href="/#contact"
          className="inline-block bg-ink px-7 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:bg-rust"
        >
          想吃當季芒果？和我們聯繫
        </Link>
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-line pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rust">延伸閱讀</p>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 font-serif text-lg text-ink transition-colors group-hover:text-rust">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
