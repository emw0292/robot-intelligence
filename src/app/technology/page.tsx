import type { Metadata } from "next";
import Link from "next/link";
import { IntelligenceCollection, PageIntro } from "@/components/pages/intelligence-page";
import { getTrendsByCategory } from "@/data/trends";
import { classifications } from "@/config/information-architecture";

export const metadata: Metadata = { title: "Technology Intelligence" };
export default async function TechnologyPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic = "" } = await searchParams; const all = getTrendsByCategory("technology");
  const items = topic ? all.filter((trend) => [trend.subcategory, trend.title, trend.summary, ...trend.keywords].join(" ").toLowerCase().includes(topic.toLowerCase())) : all;
  return <div className="shell page-shell"><PageIntro eyebrow="TECHNOLOGY INTELLIGENCE" title="기술 Intelligence" description="Humanoid, Robot AI, VLA, Foundation Model과 로봇 핵심기술의 성숙도 변화를 추적합니다." stats={[{ label: "기술 동향", value: `${all.length}건` }, { label: "핵심 분야", value: `${classifications.technology.length}개` }]} /><div className="topic-links"><Link className={!topic ? "active" : ""} href="/technology">전체</Link>{classifications.technology.map((item) => <Link className={topic === item ? "active" : ""} key={item} href={`/technology?topic=${item}`}>{item}</Link>)}</div><IntelligenceCollection title={topic ? `${topic} 기술 동향` : "주요 기술 동향"} description="연구개발과 기술전략 수립에 필요한 변화 신호를 제공합니다." trends={items} category="technology" /></div>;
}
