"use client";

import { Moon, Sun } from "./icons";

export function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }
  return <button className="icon-button" onClick={toggle} aria-label="Toggle color theme"><Sun className="theme-sun"/><Moon className="theme-moon"/></button>;
}
