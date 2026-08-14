import type { Country, TrendCategory } from "@/types";

export const primaryNavigation = [
  { label: "홈", href: "/" },
  { label: "최신동향", href: "/trends" },
  { label: "정책", href: "/policy" },
  { label: "산업", href: "/industry" },
  { label: "기술", href: "/technology" },
  { label: "R&D", href: "/rnd" },
  { label: "표준·인증", href: "/standards" },
] as const;

export const reportNavigation = [
  { label: "일간 리포트", href: "/reports/daily" },
  { label: "주간 리포트", href: "/reports/weekly" },
  { label: "월간 리포트", href: "/reports/monthly" },
] as const;

export const countries: readonly Country[] = ["대한민국", "미국", "중국", "일본", "EU"];

export const categoryLabels: Record<TrendCategory, string> = {
  policy: "정책",
  industry: "산업",
  technology: "기술",
  rnd: "R&D",
  standards: "표준·인증",
};

export const classifications = {
  policy: countries,
  industry: ["기업", "시장", "투자", "M&A", "생산", "공급망"],
  technology: ["Humanoid", "Robot AI", "VLA", "Foundation Model", "AMR", "제조로봇", "핵심부품"],
  rnd: ["사업공고", "과제공고", "조달", "실증"],
  standards: ["표준", "인증", "안전", "보안", "규제"],
} as const;
