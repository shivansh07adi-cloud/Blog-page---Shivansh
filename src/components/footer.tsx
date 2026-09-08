import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { ArrowUpRight } from "./icons";

export function Footer() {
  return <footer className="site-footer"><div className="shell footer-grid">
    <div><Link href="/" className="wordmark"><span className="signal-dot"/>SK</Link><p>Notes from the layers underneath.</p></div>
    <div className="footer-links"><span>INDEX</span>{siteConfig.nav.map((x)=><Link href={x.href} key={x.href}>{x.label}</Link>)}</div>
    <div className="footer-links"><span>ELSEWHERE</span><a href={siteConfig.portfolio} target="_blank" rel="noreferrer">Portfolio <ArrowUpRight/></a><a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight/></a><a href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight/></a><a href={`mailto:${siteConfig.email}`}>Email <ArrowUpRight/></a></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Shivansh Kumar</p><p>Designed &amp; built in India</p></div>
  </div></footer>;
}
