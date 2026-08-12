import Image from "next/image";
import Link from "next/link";

export function Header() {
  const today = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date());

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="ROBOT·AI 동향 브리프 홈">
          <Image
            className="brand-logo"
            src="/kiro-logo.png"
            alt="KIRO 한국로봇융합연구원"
            width={88}
            height={30}
            priority
          />
          <span>
            <strong>ROBOT·AI 동향 브리프</strong>
            <small>Robot · AI Policy &amp; Industry Intelligence</small>
          </span>
        </Link>
        <div className="header-meta">
          <Link href="/trends" className="header-search" aria-label="통합 검색 페이지로 이동">
            <span aria-hidden="true">⌕</span>
            <span>통합검색</span>
          </Link>
          <time dateTime={new Date().toISOString()}>{today}</time>
          <span className="admin-slot">ADMIN · 준비중</span>
        </div>
      </div>
    </header>
  );
}
