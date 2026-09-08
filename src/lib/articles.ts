import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  author: string;
  readingTime: string;
  published: boolean;
  featured?: boolean;
  cover?: string;
  content: string;
};

export type TocItem = { id: string; text: string; level: number };

const articlesDirectory = path.join(process.cwd(), "content", "articles");

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) return [];
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data, content } = matter(
        fs.readFileSync(path.join(articlesDirectory, file), "utf8"),
      );
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags ?? [],
        category: data.category,
        author: data.author ?? "Shivansh Kumar",
        readingTime: data.readingTime ?? estimateReadingTime(content),
        published: data.published !== false,
        featured: data.featured ?? false,
        cover: data.cover,
        content,
      } as Article;
    })
    .filter((article) => article.published)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getArticle(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getTableOfContents(content: string): TocItem[] {
  return [...content.matchAll(/^(##|###)\s+(.+)$/gm)].map((match) => ({
    level: match[1].length,
    text: match[2].replace(/[`*_]/g, ""),
    id: slugify(match[2].replace(/[`*_]/g, "")),
  }));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 210))} min read`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
