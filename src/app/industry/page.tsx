import type { Metadata } from "next";
import Link from "next/link";
import { IntelligenceCollection, PageIntro } from "@/components/pages/intelligence-page";
import { getTrendsByCategory } from "@/data/trends";
import { classifications } from "@/config/information-architecture";

export const metadata: Metadata = { title: "Industry Intelligence" };
export default async function IndustryPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic = "" } = await searchParams; const all = getTrendsByCategory("industry");
  const items = topic ? all.filter((trend) => [trend.subcategory, trend.title, trend.summary, ...trend.keywords].join(" ").toLowerCase().includes(topic.toLowerCase())) : all;
  return <div className="shell page-shell"><PageIntro eyebrow="INDUSTRY INTELLIGENCE" title="산업 Intelligence" description="로봇 산업의 기업, 시장, 투자, M&A, 생산 및 공급망 변화를 분석합니다." stats={[{ label: "산업 동향", value: `${all.length}건` }, { label: "상승 신호", value: "3개" }]} /><div className="topic-links"><Link className={!topic ? "active" : ""} href="/industry">전체</Link>{classifications.industry.map((item) => <Link className={topic === item ? "active" : ""} key={item} href={`/industry?topic=${item}`}>{item}</Link>)}</div><IntelligenceCollection title={topic ? `${topic} 동향` : "주요 산업 동향"} description="사업과 공급망 의사결정에 영향을 주는 시장 변화를 정리했습니다." trends={items} category="industry" /></div>;
}
