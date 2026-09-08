import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { getAllArticles } from "@/lib/articles";
import { topicDescriptions } from "@/lib/site";
export const metadata: Metadata = { title: "Topics", description: "Explore articles by technical topic.", alternates: { canonical: "/topics" } };
export default function Topics() { const articles = getAllArticles(); return <><header className="page-header"><div className="shell page-heading"><span className="section-kicker">Knowledge map</span><h1>Choose a rabbit hole.</h1><p>Browse the archive by the layer of the stack you want to understand next.</p></div></header><section className="section"><div className="shell"><div className="topic-grid">{Object.entries(topicDescriptions).map(([topic, description], index) => { const count = articles.filter((article) => article.category === topic || article.tags.includes(topic)).length; return <Link className="topic-card" href={`/topics/${topic.toLowerCase()}`} key={topic}><span>0{index + 1} / {count} {count === 1 ? "ARTICLE" : "ARTICLES"}</span><div><strong>{topic}</strong><p>{description}</p></div><ArrowUpRight width="18" /></Link>; })}</div></div></section></>; }
