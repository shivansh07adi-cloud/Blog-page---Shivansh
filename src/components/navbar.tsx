"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { SearchIcon } from "./icons";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="shell nav-inner">
      <Link href="/" className="wordmark" onClick={() => setOpen(false)}><span className="signal-dot" />SK</Link>
      <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        {siteConfig.nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
      </nav>
      <div className="nav-actions">
        <Link className="icon-button" href="/search" aria-label="Search articles"><SearchIcon /></Link>
        <ThemeToggle />
        <button className="menu-button" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}><span/><span/></button>
      </div>
    </div>
  </header>;
}
