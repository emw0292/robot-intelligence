"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
  ["홈", "/"],
  ["최신 동향", "/trends"],
  ["정책", "/policy"],
  ["산업", "/industry"],
  ["기술", "/technology"],
  ["R&D", "/rnd"],
  ["표준·인증", "/standards"],
  ["일간 리포트", "/reports/daily"],
  ["주간 리포트", "/reports/weekly"],
  ["월간 리포트", "/reports/monthly"],
] as const;

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
          {items.map(([label, href]) => (
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
        </div>
      </div>
    </nav>
  );
}
