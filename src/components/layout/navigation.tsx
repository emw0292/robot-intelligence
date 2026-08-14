"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNavigation, reportNavigation } from "@/config/information-architecture";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="site-nav" aria-label="주요 메뉴">
      <div className="shell nav-inner">
        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-bars" aria-hidden="true"><i /><i /><i /></span>
          메뉴
        </button>
        <div id="primary-navigation" className={`nav-links ${open ? "is-open" : ""}`}>
          {primaryNavigation.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={isActive(href) ? "active" : undefined}
              aria-current={isActive(href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className={`nav-dropdown ${pathname.startsWith("/reports") ? "active" : ""} ${reportsOpen ? "is-open" : ""}`}>
            <button
              type="button"
              aria-expanded={reportsOpen}
              aria-controls="report-navigation"
              onClick={() => setReportsOpen((value) => !value)}
            >
              리포트 <span aria-hidden="true">▾</span>
            </button>
            <div id="report-navigation" className="nav-dropdown-menu">
              {reportNavigation.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={isActive(href) ? "active" : undefined}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={() => { setOpen(false); setReportsOpen(false); }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
