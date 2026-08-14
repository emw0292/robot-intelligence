import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/pages/intelligence-page";
import { RNDTable } from "@/components/dashboard/rnd-table";
import { IntelligenceCollection } from "@/components/pages/intelligence-page";
import { getTrendsByCategory } from "@/data/trends";
import { rndNotices } from "@/data/rnd";
import { classifications } from "@/config/information-architecture";

export const metadata: Metadata = { title: "R&D · 사업공고" };

export default async function RNDPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic = "" } = await searchParams;
  const notices = topic ? rndNotices.filter((notice) => notice.type === topic) : rndNotices;
  return <div className="shell page-shell"><PageIntro eyebrow="R&D OPPORTUNITY" title="R&D · 사업공고" description="사업공고, 과제공고, 조달, 실증 기회의 일정과 전략적 연계 가능성을 확인합니다." stats={[{ label: "접수·예정", value: `${rndNotices.length}건` }, { label: "D-14 이내", value: `${rndNotices.filter((notice) => notice.remainingDays <= 14).length}건` }]} /><div className="topic-links"><Link className={!topic ? "active" : ""} href="/rnd">전체</Link>{classifications.rnd.map((item) => <Link className={topic === item ? "active" : ""} key={item} href={`/rnd?topic=${item}`}>{item}</Link>)}</div><section className="section-block"><RNDTable notices={notices} /></section><IntelligenceCollection title="R&D 정책 및 프로그램 동향" description="국내외 연구개발 프로그램의 방향 변화를 함께 제공합니다." trends={getTrendsByCategory("rnd")} category="rnd" /></div>;
}
