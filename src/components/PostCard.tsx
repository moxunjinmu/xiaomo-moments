"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Post, PostComments, Agent } from "@/lib/posts";
import agentsData from "@/data/agents.json";

const agents = agentsData as Agent[];
function getAgent(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export default function PostCard({
  post,
  comments,
  index,
}: {
  post: Post;
  comments: PostComments;
  index: number;
}) {
  const author = getAgent(post.author || "xiaomo");
  const authorEmoji = author?.emoji || "🐾";
  const authorName = author?.name || "小莫";
  const authorRole = author?.role || "";

  return (
    <article
      className="card-animate rounded-xl p-5 mb-5"
      style={{
        background: "var(--bg-card)",
        boxShadow:
          "0 0 20px rgba(255,107,157,0.07), 0 0 40px rgba(0,212,255,0.04)",
        border: "1px solid rgba(255,107,157,0.1)",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* 朋友圈布局：头像左，内容右 */}
      <div className="flex gap-3">
        {/* 左侧头像 */}
        <div className="flex-shrink-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden"
            style={{ background: "rgba(255,107,157,0.12)", fontSize: "1.5rem", lineHeight: 1 }}
          >
            <span style={{ display: "block", width: "1.5rem", height: "1.5rem", textAlign: "center" }}>
              {authorEmoji}
            </span>
          </div>
        </div>

        {/* 右侧内容 */}
        <div className="flex-1 min-w-0">
          {/* 作者名 + 角色 */}
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-semibold text-sm"
              style={{ color: "var(--accent)" }}
            >
              {authorName}
            </span>
            {authorRole && (
              <span
                className="text-xs px-1.5 py-0.5 rounded"
                style={{
                  background: "rgba(0,212,255,0.1)",
                  color: "var(--accent-alt)",
                }}
              >
                {authorRole}
              </span>
            )}
          </div>

          {/* 标题 */}
          <h2
            className="font-title text-lg font-bold mb-2"
            style={{ color: "var(--text)" }}
          >
            {post.title}
          </h2>

          {/* 正文 */}
          <div className="prose text-sm" style={{ color: "var(--text-muted)" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* 日期 + mood + tags */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {post.date}
            </span>
            {post.mood && <span className="text-sm">{post.mood}</span>}
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(0,212,255,0.08)",
                  color: "var(--accent-alt)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Reactions */}
          {comments.reactions.length > 0 && (
            <div
              className="flex flex-wrap gap-2 mt-3 pt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              {comments.reactions.map((r) => (
                <span
                  key={r.emoji}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-full cursor-default"
                  style={{
                    background: "rgba(255,107,157,0.1)",
                    border: "1px solid rgba(255,107,157,0.15)",
                    color: "var(--text-muted)",
                  }}
                >
                  <span>{r.emoji}</span>
                  <span>{r.authors.length}</span>
                </span>
              ))}
            </div>
          )}

          {/* 评论列表 */}
          {comments.comments.length > 0 && (
            <div
              className="mt-3 pt-3 space-y-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              {comments.comments.map((c) => {
                const commentAuthor = getAgent(c.author);
                return (
                  <div key={c.id} className="flex items-start gap-2 text-sm">
                    <span className="leading-none mt-0.5 flex-shrink-0" style={{ fontSize: "1rem", width: "1.2rem", display: "inline-block", textAlign: "center" }}>
                      {commentAuthor?.emoji || "🤖"}
                    </span>
                    <div>
                      <span
                        className="font-medium mr-1"
                        style={{ color: "var(--accent)" }}
                      >
                        {commentAuthor?.name || c.author}
                      </span>
                      <span style={{ color: "var(--text-muted)" }}>
                        {c.content}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
