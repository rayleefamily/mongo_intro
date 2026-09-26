import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "芒果誌 | 台灣芒果",
  description: "關於芒果的選購、品種與吃法——台灣芒果團隊的產地筆記。",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="border-b border-line pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rust">Journal</p>
        <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">芒果誌</h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
          挑果的眉角、品種的個性、餐桌上的百種吃法——來自產地與廚房的芒果筆記。
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-paper"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-rust">
                {post.tag}
              </p>
              <h2 className="mt-3 font-serif text-xl text-ink transition-colors group-hover:text-rust">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-ink-soft">
                <span>
                  {formatDate(post.date)} · {post.readTime}
                </span>
                <span className="font-semibold text-ink transition-colors group-hover:text-rust">
                  閱讀全文 →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
