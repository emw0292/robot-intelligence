import type { Metadata } from "next";
import { PageIntro } from "@/components/pages/intelligence-page";
import { TrendCard } from "@/components/trends/trend-card";
import { TrendFilters } from "@/components/trends/trend-filters";
import { categoryLabels } from "@/data/trends";
import { getPublishedTrends } from "@/lib/supabase/trends";
import type { TrendCategory } from "@/types";

export const metadata: Metadata = { title: "최신 동향" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function TrendsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const getValue = (key: string) => Array.isArray(params[key]) ? params[key]?.[0] : params[key];
  const q = (getValue("q") ?? "").trim();
  const country = getValue("country") ?? "";
  const category = getValue("category") ?? "";
  const importance = getValue("importance") ?? "";
  const period = getValue("period") ?? "";

  const { data: queried, error } = await getPublishedTrends({ q, country, category, importance });
  const periodDays = Number(period);
  const toTimestamp = (value: string) => Date.parse(value.replaceAll(".", "-"));
  const latestTimestamp = queried.length
    ? Math.max(...queried.map((trend) => toTimestamp(trend.publishedAt)))
    : 0;
  const filtered = periodDays
    ? queried.filter((trend) => latestTimestamp - toTimestamp(trend.publishedAt) <= periodDays * 24 * 60 * 60 * 1000)
    : queried;

  return (
    <div className="shell page-shell">
      <PageIntro
        eyebrow="INTELLIGENCE FEED"
        title="최신 동향"
        description="국내외 로봇·AI 정책, 산업, 기술, R&D, 표준·인증 변화를 통합 탐색합니다."
        stats={[
          { label: "공개 데이터", value: error ? "-" : `${filtered.length}건` },
          { label: "데이터 소스", value: "Supabase" },
        ]}
      />
      <TrendFilters values={{ q, country, category, importance, period }} />
      <div className="result-summary">
        <p><strong>{filtered.length}</strong>개의 동향</p>
        {country && <span>국가: {country}</span>}
        {category && <span>분야: {categoryLabels[category as TrendCategory]}</span>}
        {importance && <span>중요도: {importance}</span>}
        {period && <span>기간: 최근 {period}일</span>}
        {q && <span>검색어: “{q}”</span>}
      </div>
      {error ? (
        <div className="empty-state data-error-state" role="alert">
          <strong>데이터를 불러오지 못했습니다.</strong>
          <p>{error}</p>
        </div>
      ) : filtered.length ? (
        <div className="trend-grid">{filtered.map((trend) => <TrendCard key={trend.id} trend={trend} />)}</div>
      ) : (
        <div className="empty-state">
          <strong>조건에 맞는 동향이 없습니다.</strong>
          <p>검색어 또는 필터를 변경해 다시 확인해 주세요.</p>
        </div>
      )}
    </div>
  );
}
