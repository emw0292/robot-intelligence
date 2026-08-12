import Link from "next/link";
import { BriefCard } from "@/components/trends/brief-card";
import { TrendCard } from "@/components/trends/trend-card";
import { TrendListItem } from "@/components/trends/trend-list-item";
import { StrategicSignals } from "@/components/dashboard/strategic-signals";
import { RNDTable } from "@/components/dashboard/rnd-table";
import { SearchBar } from "@/components/ui/search-bar";
import { SectionHeader } from "@/components/ui/section-header";
import { categoryLabels, countries, trends } from "@/data/trends";
import type { TrendCategory } from "@/types";

const briefIds = [
  "industry-cn-humanoid-capacity",
  "policy-kr-embodied-ai",
  "technology-foundation-model-safety",
];

export default function Home() {
  const briefs = briefIds.map((id) => trends.find((trend) => trend.id === id)!).filter(Boolean);
  const latest = trends.slice(0, 6);
  const categories: { key: TrendCategory; title: string; href: string }[] = [
    { key: "policy", title: "정책 동향", href: "/policy" },
    { key: "industry", title: "산업 동향", href: "/industry" },
    { key: "technology", title: "기술 동향", href: "/technology" },
  ];

  return (
    <div className="home-dashboard">
      <section className="intelligence-head">
        <div className="shell intelligence-head-grid">
          <div>
            <p className="eyebrow">ROBOT · AI STRATEGIC INTELLIGENCE</p>
            <h1>Robot Intelligence</h1>
            <p>로봇·AI 정책·산업·기술 통합 분석 플랫폼</p>
          </div>
          <SearchBar />
        </div>
      </section>

      <div className="shell">
        <section className="market-strip" aria-label="금주 주요 지표">
          <div><span>금주 수집 동향</span><strong>40</strong><em>건</em></div>
          <div><span>중요도 A</span><strong>15</strong><em>건</em></div>
          <div><span>신규 R&amp;D 공고</span><strong>8</strong><em>건</em></div>
          <div><span>상승 신호</span><strong className="up">4</strong><em>개</em></div>
          <p><span className="live-dot" /> Intelligence 기준일 <b>2026.08.12</b></p>
        </section>

        <section className="section-block brief-section">
          <SectionHeader eyebrow="EXECUTIVE BRIEF" title="이번 주 핵심 브리프" href="/reports/weekly" linkLabel="전체 브리프 보기" />
          <div className="brief-grid">
            {briefs.map((trend, index) => <BriefCard key={trend.id} trend={trend} primary={index === 0} />)}
          </div>
        </section>

        <section className="section-block sector-section">
          <SectionHeader eyebrow="LATEST BY SECTOR" title="주요 분야별 동향" description="정책·시장·기술 축에서 즉시 검토해야 할 최근 변화를 선별했습니다." />
          <div className="three-column-trends">
            {categories.map((category) => (
              <div className="trend-column" key={category.key}>
                <div className="column-head"><h3>{category.title}</h3><span>{categoryLabels[category.key]}</span></div>
                <div>{trends.filter((trend) => trend.category === category.key).slice(0, 6).map((trend) => <TrendListItem compact key={trend.id} trend={trend} />)}</div>
                <Link href={category.href}>{category.title} 더보기 <span aria-hidden="true">→</span></Link>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block signal-section">
          <SectionHeader eyebrow="EARLY WARNING · 5 SIGNALS" title="Strategic Signal" description="정책·산업·기술 데이터의 방향성과 변화 강도를 교차 분석한 조기경보 지표" href="/reports/monthly" linkLabel="월간 신호 분석" />
          <div className="signal-summary" aria-label="전략 신호 요약">
            <span><b>상승</b><strong>4</strong></span>
            <span><b>유지</b><strong>1</strong></span>
            <span><b>관찰국가</b><strong>5</strong></span>
            <p>최근 30일 정책·산업·기술 표본 기준</p>
          </div>
          <StrategicSignals />
        </section>

        <section className="section-block latest-section">
          <SectionHeader eyebrow="LATEST INTELLIGENCE" title="최신 동향" description="국가·분야별 주요 업데이트를 전략적 중요도와 함께 제공합니다." href="/trends" />
          <div className="trend-grid">
            {latest.map((trend) => <TrendCard trend={trend} key={trend.id} />)}
          </div>
        </section>

        <section className="section-block">
          <SectionHeader eyebrow="OPEN CALLS" title="R&D · 사업공고" description="마감이 임박한 정부 R&D, 실증, 공공조달 기회를 우선 표시합니다." href="/rnd" linkLabel="전체 공고 보기" />
          <RNDTable limit={5} />
        </section>

        <section className="section-block country-section">
          <SectionHeader eyebrow="COUNTRY WATCH" title="국가별 Intelligence" description="주요 5개국의 정책·산업 변화와 핵심 키워드를 한눈에 비교합니다." />
          <div className="country-grid">
            {countries.map((country) => {
              const countryTrends = trends.filter((trend) => trend.country === country);
              const representative = countryTrends.find((trend) => trend.importance === "A") ?? countryTrends[0];
              return (
                <article className="country-card" key={country}>
                  <div><span>{country === "대한민국" ? "KR" : country === "미국" ? "US" : country === "중국" ? "CN" : country === "일본" ? "JP" : "EU"}</span><h3>{country}</h3></div>
                  <dl><div><dt>정책</dt><dd>{countryTrends.filter((item) => item.category === "policy").length}</dd></div><div><dt>산업·기술</dt><dd>{countryTrends.filter((item) => ["industry", "technology"].includes(item.category)).length}</dd></div></dl>
                  <p className="country-keywords">{Array.from(new Set(countryTrends.flatMap((item) => item.keywords))).slice(0, 3).join(" · ")}</p>
                  <Link href={`/trends?country=${country}`}>{representative.title}</Link>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
