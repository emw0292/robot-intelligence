import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/intelligence-page";
import { ImportanceBadge } from "@/components/ui/badges";
import { dailyReport } from "@/data/reports";
import type { Importance } from "@/types";

export const metadata: Metadata = { title: "일간 리포트" };

export default function DailyReportPage() {
  const groups: { importance: Importance; title: string; description: string }[] = [
    { importance: "A", title: "오늘 즉시 검토할 변화", description: "예산·공고·조달·핵심 정책" },
    { importance: "B", title: "이번 주 확인할 변화", description: "실증·표준·인증" },
    { importance: "C", title: "배경 맥락", description: "기사·행사·인터뷰" },
  ];
  return <div className="shell page-shell"><PageIntro eyebrow="DAILY REPORT · 2026.08.12" title="오늘 실제로 움직인 것" description="뉴스의 양보다 의사결정에 영향을 주는 변화를 중요도 순으로 정리했습니다." stats={[{ label: "핵심 변화", value: "6건" }, { label: "즉시 검토", value: "3건" }]} /><div className="report-lead"><span>DAILY NOTE</span><strong>휴머노이드 양산과 로봇 AI 정책이 동시에 구체화되고 있습니다.</strong><p>산업 측면에서는 핵심부품 투자, 정책 측면에서는 실증 인프라와 안전 기준의 변화가 집중됐습니다.</p></div>{groups.map((group) => <section className="report-group" key={group.importance}><div className="report-group-head"><ImportanceBadge importance={group.importance} /><div><h2>{group.title}</h2><p>{group.description}</p></div></div><div className="report-items">{dailyReport.filter((item) => item.importance === group.importance).map((item) => <article key={item.title}><span>{item.label}</span><div><h3>{item.title}</h3><p>{item.description}</p></div>{item.metric && <strong>{item.metric}</strong>}</article>)}</div></section>)}</div>;
}
