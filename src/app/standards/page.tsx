import type { Metadata } from "next";
import Link from "next/link";
import { IntelligenceCollection, PageIntro } from "@/components/pages/intelligence-page";
import { getTrendsByCategory } from "@/data/trends";
import { classifications } from "@/config/information-architecture";

export const metadata: Metadata = { title: "표준·인증 Intelligence" };
export default async function StandardsPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic = "" } = await searchParams; const all = getTrendsByCategory("standards"); const items = topic ? all.filter((trend) => trend.subcategory === topic) : all;
  return <div className="shell page-shell"><PageIntro eyebrow="STANDARDS & CERTIFICATION" title="표준·인증 Intelligence" description="ISO·IEC·NIST 및 국내외 인증기관의 로봇 표준, 인증, 안전, 보안, 규제 변화를 제공합니다." stats={[{ label: "표준·인증", value: `${all.length}건` }, { label: "중요도 A", value: `${all.filter((item) => item.importance === "A").length}건` }]} /><div className="topic-links"><Link className={!topic ? "active" : ""} href="/standards">전체</Link>{classifications.standards.map((item) => <Link className={topic === item ? "active" : ""} key={item} href={`/standards?topic=${item}`}>{item}</Link>)}</div><IntelligenceCollection title={topic ? `${topic} 동향` : "주요 표준·인증 동향"} description="제품 개발과 시장 진입 전에 검토해야 할 기준 변화를 선별했습니다." trends={items} category="standards" /></div>;
}
