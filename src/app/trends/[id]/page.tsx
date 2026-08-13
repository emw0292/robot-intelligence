import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryBadge, CountryBadge, ImportanceBadge } from "@/components/ui/badges";
import { TrendCard } from "@/components/trends/trend-card";
import { getTrend, trends } from "@/data/trends";

export function generateStaticParams() {
  return trends.map((trend) => ({ id: trend.id }));
}

export async function generateMetadata({ params }: PageProps<"/trends/[id]">): Promise<Metadata> {
  const { id } = await params; const trend = getTrend(id);
  return trend ? { title: trend.title, description: trend.summary } : { title: "동향을 찾을 수 없습니다" };
}

export default async function TrendDetailPage({ params }: PageProps<"/trends/[id]">) {
  const { id } = await params; const trend = getTrend(id); if (!trend) notFound();
  const related = trends.filter((item) => item.id !== trend.id && (item.category === trend.category || item.country === trend.country)).slice(0, 3);
  return <div className="shell detail-shell"><nav className="breadcrumb" aria-label="현재 위치"><Link href="/">홈</Link><span>/</span><Link href="/trends">최신 동향</Link><span>/</span><span>{trend.title}</span></nav><article className="detail-article"><header><div className="badge-row"><CategoryBadge category={trend.category} /><CountryBadge country={trend.country} /><ImportanceBadge importance={trend.importance} /></div><h1>{trend.title}</h1><dl className="detail-meta"><div><dt>기관</dt><dd>{trend.organization}</dd></div><div><dt>발표일</dt><dd>{trend.publishedAt}</dd></div><div><dt>출처</dt><dd>{trend.sourceName}</dd></div><div><dt>분류</dt><dd>{trend.subcategory ?? "일반"}</dd></div></dl></header><div className="detail-body"><aside><p>INTELLIGENCE NOTE</p><strong>중요도 {trend.importance}</strong><span>정책·사업 영향과 대응 시급성을 기준으로 분류했습니다.</span><Link href={`/trends?country=${trend.country}`}>{trend.country} 동향 더보기 →</Link></aside><div className="detail-content"><section className="detail-summary-section"><p className="eyebrow">EXECUTIVE SUMMARY</p><h2>핵심 요약</h2><p className="detail-summary">{trend.summary}</p></section><section><h2>주요 내용</h2><p>{trend.content}</p><ul><li>관련 제도와 시장 적용 일정의 구체화 여부를 후속 모니터링</li><li>국내 기술·기업의 연계 가능성과 공급망 영향 점검</li><li>실증 및 국제협력 프로그램 참여 기회 검토</li></ul></section><section className="implication-box"><p className="eyebrow">STRATEGIC IMPLICATION</p><h2>전략적 시사점</h2><p>{trend.implication}</p></section><section><h2>Keywords</h2><div className="keyword-row">{trend.keywords.map((keyword) => <span key={keyword}>#{keyword}</span>)}</div></section></div></div></article><section className="section-block"><div className="section-header"><div><p className="eyebrow">RELATED INTELLIGENCE</p><h2>관련 동향</h2></div></div><div className="trend-grid">{related.map((item) => <TrendCard key={item.id} trend={item} />)}</div></section></div>;
}
