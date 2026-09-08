import Link from "next/link";
import type { Article } from "@/lib/articles";
import { ArrowUpRight } from "./icons";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}

export function ArticleCard({ article, index }: { article: Article; index?: number }) {
  return <article className="article-card">
    <div className="card-index">{String(index ?? 1).padStart(2, "0")}</div>
    <div className="card-body"><div className="eyebrow"><span>{article.category}</span><span>{formatDate(article.date)}</span></div>
      <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><p>{article.description}</p>
      <div className="card-footer"><span>{article.readingTime}</span><Link className="round-link" href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}><ArrowUpRight/></Link></div>
    </div>
  </article>;
}
