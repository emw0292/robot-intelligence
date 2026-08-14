import Link from "next/link";
import { primaryNavigation, reportNavigation } from "@/config/information-architecture";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>ROBOT INTELLIGENCE</strong>
          <p>로봇·AI 정책·산업·기술 통합 분석 플랫폼</p>
        </div>
        <div className="footer-sitemap" aria-label="사이트맵">
          <div><b>Intelligence</b><div className="footer-links">{primaryNavigation.slice(1).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div></div>
          <div><b>Report</b><div className="footer-links">{reportNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label.replace(" 리포트", "")}</Link>)}</div></div>
        </div>
      </div>
      <div className="shell footer-note">
        <span>데이터 기준 2026.08.12</span><span>본 화면의 콘텐츠는 서비스 구조 검증을 위한 mock data이며 실제 정책 판단의 근거로 사용할 수 없습니다.</span>
      </div>
    </footer>
  );
}
