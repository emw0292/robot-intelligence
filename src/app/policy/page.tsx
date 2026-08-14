import type { Metadata } from "next";
import Link from "next/link";
import { IntelligenceCollection, PageIntro } from "@/components/pages/intelligence-page";
import { getTrendsByCategory } from "@/data/trends";
import { classifications } from "@/config/information-architecture";

export const metadata: Metadata = { title: "정책 Intelligence" };

export default async function PolicyPage({ searchParams }: { searchParams: Promise<{ country?: string }> }) {
  const { country = "" } = await searchParams;
  const all = getTrendsByCategory("policy");
  const items = country ? all.filter((trend) => trend.country === country) : all;
  return <div className="shell page-shell"><PageIntro eyebrow="POLICY INTELLIGENCE" title="정책 Intelligence" description="국내외 로봇·AI 정책, 규제, 정부 지원 및 국가전략 변화를 추적합니다." stats={[{ label: "정책 동향", value: `${all.length}건` }, { label: "중요도 A", value: `${all.filter((item) => item.importance === "A").length}건` }]} /><div className="topic-links"><Link className={!country ? "active" : ""} href="/policy">전체</Link>{classifications.policy.map((item) => <Link className={country === item ? "active" : ""} key={item} href={`/policy?country=${item}`}>{item}</Link>)}</div><IntelligenceCollection title={country ? `${country} 정책 동향` : "주요 정책 동향"} description="전략 수립에 직접 영향을 주는 정책 변화와 지원체계를 우선 제공합니다." trends={items} category="policy" /></div>;
}
