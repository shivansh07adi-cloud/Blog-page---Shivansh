import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GithubIcon, GlobeIcon, LinkedinIcon } from "@/components/icons";
import { formatDate, getAllArticles, type Article } from "@/lib/articles";
import { siteConfig } from "@/lib/site";

function Story({ article, featured = false }: { article: Article; featured?: boolean }) {
  return <Link href={`/articles/${article.slug}`} className={`story ${featured ? "story-featured" : ""}`}>
    <div className="story-image">{article.cover && <Image src={article.cover} alt="" fill sizes={featured ? "(max-width: 800px) 100vw, 50vw" : "(max-width: 800px) 100vw, 33vw"} />}{featured && <span className="pinned">PINNED</span>}</div>
    <div className="story-copy"><span className="story-topic">{article.category}</span><h2>{article.title}</h2><p>{article.description}</p><div className="story-meta"><span>{formatDate(article.date)}</span><span>{article.readingTime}</span></div></div>
  </Link>;
}

export default function Home() {
  const articles = getAllArticles();
  const bySlug = (slug: string) => articles.find(article => article.slug === slug);
  const featured = bySlug("death-of-the-junior-developer") ?? articles[0];
  const awsBill = bySlug("the-aws-bill-that-taught-me-more-than-any-cloud-course");
  const ec2 = bySlug("your-ec2-instance-is-lying-to-you");
  const selectedWriting = [
    bySlug("the-last-person-who-understands-the-system"),
    bySlug("the-bug-that-exists-only-when-you-are-watching"),
    bySlug("the-day-your-application-becomes-a-distributed-system"),
  ].filter((article): article is Article => Boolean(article));
  return <div className="home-page">
    <section className="publication-intro shell"><div><span className="section-kicker">Personal engineering journal</span><h1>Shivansh Kumar</h1></div><p>Building software. Breaking down systems.<br />Understanding what happens underneath.</p></section>
    <section className="shell feature-board"><div className="side-stories">{awsBill && <Story article={awsBill} />}</div><Story article={featured} featured /><div className="side-stories">{ec2 && <Story article={ec2} />}</div></section>
    <section className="shell author-panel">
      <div className="author-mark" aria-hidden="true"><span /></div>
      <div className="author-identity"><h2>Shivansh Kumar</h2><p className="author-count">{articles.length} posts</p><p className="author-tagline">I trace software past the happy path—into the systems, trade-offs, and failures that make it real.</p></div>
      <div className="author-links"><a href={siteConfig.portfolio} target="_blank" rel="noreferrer" aria-label="Portfolio" title="Portfolio"><GlobeIcon /></a><a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><GithubIcon /></a><a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><LinkedinIcon /></a></div>
    </section>
    <section className="shell home-archive"><div className="archive-heading"><div><span className="section-kicker">Selected field notes</span><h2>Continue reading</h2></div></div><div className="story-grid">{selectedWriting.map(a => <Story key={a.slug} article={a} />)}</div><div className="more-posts"><Link href="/articles">See all {articles.length} posts <ArrowUpRight /></Link></div></section>
    <section className="shell home-ending"><p>THE CODE WORKS.</p><strong>BUT WHY?</strong><Link href="/articles">Explore all articles <ArrowUpRight /></Link></section>
  </div>;
}
