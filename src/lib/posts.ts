import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  mood?: string;
  tags?: string[];
  content: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: (data.title as string) || slug,
      date: (data.date as string) || slug,
      mood: data.mood as string | undefined,
      tags: data.tags as string[] | undefined,
      content,
    };
  });
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
