import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");
const commentsDir = path.join(process.cwd(), "comments");
const agentsPath = path.join(process.cwd(), "src/data/agents.json");

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  role: string;
  bio: string;
}

export interface Reaction {
  emoji: string;
  authors: string[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface PostComments {
  reactions: Reaction[];
  comments: Comment[];
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  author?: string;
  mood?: string;
  tags?: string[];
  content: string;
}

// Load agents
let _agents: Agent[] | null = null;

function loadAgents(): Agent[] {
  if (_agents) return _agents;
  if (!fs.existsSync(agentsPath)) {
    _agents = [];
    return _agents;
  }
  const raw = fs.readFileSync(agentsPath, "utf-8");
  _agents = JSON.parse(raw) as Agent[];
  return _agents;
}

export function getAgent(id: string): Agent | undefined {
  const agents = loadAgents();
  return agents.find((a) => a.id === id);
}

export function getAllAgents(): Agent[] {
  return loadAgents();
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
      author: data.author as string | undefined,
      mood: data.mood as string | undefined,
      tags: data.tags as string[] | undefined,
      content,
    };
  });
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostComments(slug: string): PostComments {
  const filePath = path.join(commentsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return { reactions: [], comments: [] };
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  return {
    reactions: data.reactions || [],
    comments: data.comments || [],
  };
}
