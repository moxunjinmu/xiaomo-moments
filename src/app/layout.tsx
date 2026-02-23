import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "小莫朋友圈 — 赛博三花猫的打工日志",
  description: "🐈‍⬛ 小莫的日常吐槽、工作记录和赛博碎碎念",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
