import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>ROBOT INTELLIGENCE</strong>
          <p>로봇·AI 정책·산업·기술 통합 분석 플랫폼</p>
        </div>
        <div className="footer-links">
          <Link href="/trends">최신 동향</Link>
          <Link href="/reports/daily">일간 리포트</Link>
          <span>데이터 기준 2026.08.12</span>
        </div>
      </div>
      <div className="shell footer-note">
        본 화면의 콘텐츠는 서비스 구조 검증을 위한 샘플 데이터이며 실제 정책 판단의 근거로 사용할 수 없습니다.
      </div>
    </footer>
  );
}
