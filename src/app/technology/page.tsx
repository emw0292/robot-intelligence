import type { Metadata } from "next";
import Link from "next/link";
import { IntelligenceCollection, PageIntro } from "@/components/pages/intelligence-page";
import { getTrendsByCategory } from "@/data/trends";

export const metadata: Metadata = { title: "Technology Intelligence" };
const topics = ["Humanoid", "Robot AI", "Foundation Model", "AMR", "제조로봇", "의료로봇", "서비스로봇", "센서", "구동기", "로봇 SW"];

export default async function TechnologyPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic = "" } = await searchParams; const all = getTrendsByCategory("technology");
  const items = topic ? all.filter((trend) => trend.subcategory?.toLowerCase().includes(topic.toLowerCase()) || trend.keywords.some((key) => key.toLowerCase().includes(topic.toLowerCase()))) : all;
  return <div className="shell page-shell"><PageIntro eyebrow="TECHNOLOGY INTELLIGENCE" title="Technology Intelligence" description="로봇 AI, 핵심부품, 제어·센서와 응용기술의 성숙도 변화를 추적합니다." stats={[{ label: "기술 동향", value: `${all.length}건` }, { label: "핵심 분야", value: "10개" }]} /><div className="topic-links"><Link className={!topic ? "active" : ""} href="/technology">전체</Link>{topics.map((item) => <Link className={topic === item ? "active" : ""} key={item} href={`/technology?topic=${item}`}>{item}</Link>)}</div><IntelligenceCollection title={topic ? `${topic} 기술 동향` : "주요 기술 동향"} description="연구개발과 기술전략 수립에 필요한 변화 신호를 제공합니다." trends={items} category="technology" /></div>;
}
