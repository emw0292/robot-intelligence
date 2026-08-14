export type TrendCategory =
  | "policy"
  | "industry"
  | "technology"
  | "rnd"
  | "standards";

export type Country = "대한민국" | "미국" | "중국" | "일본" | "EU";

export type Importance = "A" | "B" | "C";

export type Trend = {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: TrendCategory;
  subcategory?: string;
  country: Country;
  organization: string;
  publishedAt: string;
  importance: Importance;
  keywords: string[];
  implication: string;
  sourceName: string;
  sourceUrl?: string;
};

export type RNDNotice = {
  id: string;
  importance: Importance;
  organization: string;
  title: string;
  field: string;
  deadline: string;
  remainingDays: number;
  status: "접수중" | "마감임박" | "예정";
  type: "사업공고" | "과제공고" | "조달" | "실증";
};

export type Signal = {
  keyword: string;
  direction: "up" | "steady" | "watch";
  intensity: 1 | 2 | 3;
  description: string;
  category: TrendCategory;
};

export type ReportItem = {
  label: string;
  title: string;
  description: string;
  importance: Importance;
  metric?: string;
};
