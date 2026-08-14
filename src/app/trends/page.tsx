import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/intelligence-page";
import { TrendCard } from "@/components/trends/trend-card";
import { TrendFilters } from "@/components/trends/trend-filters";
import { categoryLabels, trends } from "@/data/trends";
import type { TrendCategory } from "@/types";

export const metadata: Metadata = { title: "최신 동향" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function TrendsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const getValue = (key: string) => Array.isArray(params[key]) ? params[key]?.[0] : params[key];
  const q = (getValue("q") ?? "").trim().toLowerCase();
  const country = getValue("country") ?? "";
  const category = getValue("category") ?? "";
  const importance = getValue("importance") ?? "";
  const period = getValue("period") ?? "";

  const toTimestamp = (value: string) => Date.parse(value.replaceAll(".", "-"));
  const latestTimestamp = Math.max(...trends.map((trend) => toTimestamp(trend.publishedAt)));
  const periodDays = Number(period);

  const filtered = trends.filter((trend) => {
    const haystack = [trend.title, trend.summary, trend.organization, trend.country, ...trend.keywords].join(" ").toLocaleLowerCase("ko-KR");
    const publishedTimestamp = toTimestamp(trend.publishedAt);
    const inPeriod = !periodDays || latestTimestamp - publishedTimestamp <= periodDays * 24 * 60 * 60 * 1000;
    return (!q || haystack.includes(q)) && (!country || trend.country === country) && (!category || trend.category === category) && (!importance || trend.importance === importance) && inPeriod;
  });

  return (
    <div className="shell page-shell">
      <PageIntro eyebrow="INTELLIGENCE FEED" title="최신 동향" description="국내외 로봇·AI 정책, 산업, 기술, R&D, 표준·인증 변화를 통합 탐색합니다." stats={[{ label: "전체 데이터", value: `${trends.length}건` }, { label: "검색 결과", value: `${filtered.length}건` }]} />
      <TrendFilters values={{ q, country, category, importance, period }} />
      <div className="result-summary"><p><strong>{filtered.length}</strong>개의 동향</p>{country && <span>국가: {country}</span>}{category && <span>분야: {categoryLabels[category as TrendCategory]}</span>}{importance && <span>중요도: {importance}</span>}{period && <span>기간: 최근 {period}일</span>}{q && <span>검색어: “{q}”</span>}</div>
      {filtered.length ? <div className="trend-grid">{filtered.map((trend) => <TrendCard key={trend.id} trend={trend} />)}</div> : <div className="empty-state"><strong>조건에 맞는 동향이 없습니다.</strong><p>검색어 또는 필터를 변경해 다시 확인해 주세요.</p></div>}
    </div>
  );
}
