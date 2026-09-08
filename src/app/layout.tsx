import type { Metadata } from "next";
import Script from "next/script";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "./simple.css";
export const metadata:Metadata={metadataBase:new URL(siteConfig.url),title:{default:siteConfig.title,template:"%s — Shivansh Kumar"},description:siteConfig.description,alternates:{canonical:"/"},openGraph:{type:"website",siteName:siteConfig.name,title:siteConfig.title,description:siteConfig.description,url:siteConfig.url},twitter:{card:"summary_large_image",title:siteConfig.title,description:siteConfig.description}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth"><body><Script id="theme-init" strategy="beforeInteractive">{`try{const t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`}</Script><Navbar/><main>{children}</main><Footer/></body></html>}
