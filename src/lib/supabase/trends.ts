import type { Country, Importance, Trend, TrendCategory } from "@/types";
import { createSupabaseClient } from "./client";

type TrendRow = {
  id: string | number;
  title: string | null;
  summary: string | null;
  content: string | null;
  category: string | null;
  subcategory: string | null;
  country: string | null;
  organization: string | null;
  published_at: string | null;
  importance: string | null;
  keywords: string[] | string | null;
  implication: string | null;
  source_name: string | null;
  source_url: string | null;
  status: string | null;
};

export type TrendQueryFilters = {
  q?: string;
  country?: string;
  category?: string;
  importance?: string;
};

export type TrendQueryResult = {
  data: Trend[];
  error: string | null;
};

const validCategories = new Set<TrendCategory>([
  "policy",
  "industry",
  "technology",
  "rnd",
  "standards",
]);
const validCountries = new Set<Country>(["대한민국", "미국", "중국", "일본", "EU"]);
const validImportance = new Set<Importance>(["A", "B", "C"]);

function formatPublishedAt(value: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replaceAll(". ", ".")
    .replace(/\.$/, "");
}

function normalizeKeywords(value: TrendRow["keywords"]) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return value
    .split(",")
    .map((keyword) => keyword.trim().replace(/^#/, ""))
    .filter(Boolean);
}

function mapTrend(row: TrendRow): Trend | null {
  if (!row.title || !row.category || !row.country || !row.importance) return null;
  if (!validCategories.has(row.category as TrendCategory)) return null;
  if (!validCountries.has(row.country as Country)) return null;
  if (!validImportance.has(row.importance as Importance)) return null;

  return {
    id: String(row.id),
    title: row.title,
    summary: row.summary ?? "요약 정보가 준비 중입니다.",
    content: row.content ?? row.summary ?? "상세 정보가 준비 중입니다.",
    category: row.category as TrendCategory,
    subcategory: row.subcategory ?? undefined,
    country: row.country as Country,
    organization: row.organization ?? "기관 정보 없음",
    publishedAt: formatPublishedAt(row.published_at),
    importance: row.importance as Importance,
    keywords: normalizeKeywords(row.keywords),
    implication: row.implication ?? "전략적 시사점이 준비 중입니다.",
    sourceName: row.source_name ?? row.organization ?? "출처 정보 없음",
    sourceUrl: row.source_url ?? undefined,
  };
}

function configurationError(): TrendQueryResult {
  return {
    data: [],
    error: "Supabase 연결 환경변수가 설정되지 않았습니다.",
  };
}

export async function getPublishedTrends(
  filters: TrendQueryFilters = {},
): Promise<TrendQueryResult> {
  const supabase = createSupabaseClient();
  if (!supabase) return configurationError();

  let query = supabase
    .from("trends")
    .select("id,title,summary,content,category,subcategory,country,organization,published_at,importance,keywords,implication,source_name,source_url,status")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (filters.country) query = query.eq("country", filters.country);
  if (filters.category) query = query.eq("category", filters.category);
  if (filters.importance) query = query.eq("importance", filters.importance);

  const { data, error } = await query;
  if (error) {
    console.error("Failed to fetch published trends:", error.message);
    return { data: [], error: "동향 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }

  const mapped = ((data ?? []) as TrendRow[])
    .map(mapTrend)
    .filter((trend): trend is Trend => trend !== null);
  const keyword = filters.q?.trim().toLocaleLowerCase("ko-KR");

  if (!keyword) return { data: mapped, error: null };

  return {
    data: mapped.filter((trend) =>
      [trend.title, trend.summary, trend.organization, trend.country, ...trend.keywords]
        .join(" ")
        .toLocaleLowerCase("ko-KR")
        .includes(keyword),
    ),
    error: null,
  };
}

export async function getPublishedTrend(id: string): Promise<{ data: Trend | null; error: string | null }> {
  const supabase = createSupabaseClient();
  if (!supabase) return { data: null, error: configurationError().error };

  const { data, error } = await supabase
    .from("trends")
    .select("id,title,summary,content,category,subcategory,country,organization,published_at,importance,keywords,implication,source_name,source_url,status")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(`Failed to fetch published trend ${id}:`, error.message);
    return { data: null, error: "동향 상세 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }

  return { data: data ? mapTrend(data as TrendRow) : null, error: null };
}

export async function getRelatedPublishedTrends(trend: Trend): Promise<TrendQueryResult> {
  const result = await getPublishedTrends({ category: trend.category });
  return { ...result, data: result.data.filter((item) => item.id !== trend.id).slice(0, 3) };
}
