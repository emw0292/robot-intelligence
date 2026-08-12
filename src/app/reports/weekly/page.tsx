import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/intelligence-page";
import { ImportanceBadge } from "@/components/ui/badges";
import { weeklyReport } from "@/data/reports";
import { trends } from "@/data/trends";
import { BriefCard } from "@/components/trends/brief-card";

export const metadata: Metadata = { title: "주간 리포트" };

export default function WeeklyReportPage() {
  const briefs = trends.filter((item) => item.importance === "A").slice(0, 3);
  return <div className="shell page-shell"><PageIntro eyebrow="WEEKLY REPORT · 2026 W33" title="이번 주에 실제로 움직인 것" description="신규 사업, 현장 실증, 공급망 투자, 표준 변화를 하나의 전략 흐름으로 연결합니다." stats={[{ label: "주요 이벤트", value: "18건" }, { label: "전략 신호", value: "5개" }]} /><section className="section-block"><div className="brief-grid">{briefs.map((trend, index) => <BriefCard key={trend.id} trend={trend} primary={index === 0} />)}</div></section><section className="weekly-movement"><h2>Movement Tracker</h2><div className="movement-grid">{weeklyReport.map((item, index) => <article key={item.title}><span className="movement-index">0{index + 1}</span><div className="badge-row"><span className="badge badge-country">{item.label}</span><ImportanceBadge importance={item.importance} /></div><h3>{item.title}</h3><p>{item.description}</p>{item.metric && <strong>{item.metric}</strong>}</article>)}</div></section><section className="report-implication"><p className="eyebrow">WEEKLY IMPLICATION</p><h2>기술개발에서 양산·운영 기준으로 경쟁축이 이동</h2><p>이번 주 변화는 로봇 AI 모델 자체보다 실제 현장 배치에 필요한 부품 공급, 안전 인증, 운영 소프트웨어가 더 중요한 병목으로 부상했음을 보여줍니다. 실증사업 기획 시 기술개발·인증·수요기관 조달을 하나의 패키지로 설계할 필요가 있습니다.</p></section></div>;
}
