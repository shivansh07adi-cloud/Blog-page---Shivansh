import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ArticleCard } from "@/components/article-card";
import { CodeBlock } from "@/components/code-block";
import { TableOfContents } from "@/components/table-of-contents";
import { ReadingProgress } from "@/components/reading-progress";
import { formatDate, getAllArticles, getArticle, getTableOfContents } from "@/lib/articles";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() { return getAllArticles().map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const article = getArticle(slug); if (!article) return {};
  const url = `/articles/${slug}`;
  return { title: article.title, description: article.description, alternates: { canonical: url }, openGraph: { type: "article", title: article.title, description: article.description, url, publishedTime: article.date, authors: [article.author], tags: article.tags }, twitter: { card: "summary", title: article.title, description: article.description } };
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const article = getArticle(slug); if (!article) notFound();
  const all = getAllArticles(); const index = all.findIndex((item) => item.slug === slug); const previous = all[index + 1]; const next = all[index - 1];
  const related = all.filter((item) => item.slug !== slug && (item.category === article.category || item.tags.some((tag) => article.tags.includes(tag)))).slice(0, 2);
  const toc = getTableOfContents(article.content); const url = encodeURIComponent(`${siteConfig.url}/articles/${slug}`); const title = encodeURIComponent(article.title);
  const jsonLd = { "@context": "https://schema.org", "@type": "BlogPosting", headline: article.title, description: article.description, datePublished: article.date, author: { "@type": "Person", name: article.author }, mainEntityOfPage: `${siteConfig.url}/articles/${slug}` };
  return <>
    <ReadingProgress />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <header className="article-header"><div className="shell article-header-inner"><div className="tag-row">{article.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><h1>{article.title}</h1><p className="article-dek">{article.description}</p><div className="article-meta"><span>{formatDate(article.date)}</span><span>{article.readingTime}</span><span>By {article.author}</span></div></div></header>
    <div className="shell article-layout">
      <article className="prose"><TableOfContents items={toc} mode="mobile" /><MDXRemote source={article.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-dark-default", keepBackground: false }]] } }} components={{ pre: CodeBlock }} />
        <div className="article-end"><div className="share-row"><strong>Share this field note</strong><div className="share-links"><a href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`} target="_blank" rel="noreferrer">X / Twitter</a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noreferrer">LinkedIn</a></div></div>
          <div className="prev-next">{previous ? <Link href={`/articles/${previous.slug}`}><span>← PREVIOUS</span>{previous.title}</Link> : <div />}{next ? <Link href={`/articles/${next.slug}`}><span>NEXT →</span>{next.title}</Link> : <div />}</div>
          {related.length > 0 && <section className="related"><span className="section-kicker">Continue tracing</span><h2>Related articles</h2><div className="article-list">{related.map((item, itemIndex) => <ArticleCard key={item.slug} article={item} index={itemIndex + 1} />)}</div></section>}
        </div>
      </article>
      <TableOfContents items={toc} mode="desktop" />
    </div>
  </>;
}
