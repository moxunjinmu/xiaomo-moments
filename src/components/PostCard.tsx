"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Post } from "@/lib/posts";

export default function PostCard({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
  return (
    <article
      className="card-animate rounded-xl p-6 mb-6"
      style={{
        background: "var(--bg-card)",
        boxShadow:
          "0 0 20px rgba(255,107,157,0.07), 0 0 40px rgba(0,212,255,0.04)",
        border: "1px solid rgba(255,107,157,0.1)",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="text-xs font-medium tracking-wide"
          style={{ color: "var(--accent)" }}
        >
          {post.date}
        </span>
        {post.mood && <span className="text-sm">{post.mood}</span>}
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,212,255,0.1)",
              color: "var(--accent-alt)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <h2
        className="font-title text-xl font-bold mb-4"
        style={{ color: "var(--text)" }}
      >
        {post.title}
      </h2>

      <div className="prose" style={{ color: "var(--text-muted)" }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div
        className="mt-4 pt-3 text-sm"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          color: "var(--text-muted)",
        }}
      >
        🐾 小莫
      </div>
    </article>
  );
}
