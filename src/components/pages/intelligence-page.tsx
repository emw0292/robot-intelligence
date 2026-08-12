import Link from "next/link";
import type { Trend, TrendCategory } from "@/types";
import { TrendCard } from "@/components/trends/trend-card";
import { SectionHeader } from "@/components/ui/section-header";

export function PageIntro({
  eyebrow,
  title,
  description,
  stats,
}: {
  eyebrow: string;
  title: string;
  description: string;
  stats?: { label: string; value: string }[];
}) {
  return (
    <section className="page-intro">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {stats && <div className="intro-stats">{stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>}
    </section>
  );
}

export function TopicLinks({ items }: { items: string[] }) {
  return <div className="topic-links" aria-label="주요 분류">{items.map((item, i) => <span className={i === 0 ? "active" : ""} key={item}>{item}</span>)}</div>;
}

export function IntelligenceCollection({
  title,
  description,
  trends,
  category,
}: {
  title: string;
  description: string;
  trends: Trend[];
  category: TrendCategory;
}) {
  return (
    <section className="section-block">
      <SectionHeader title={title} description={description} />
      <div className="trend-grid">
        {trends.map((trend) => <TrendCard key={trend.id} trend={trend} />)}
      </div>
      <div className="section-cta"><Link href={`/trends?category=${category}`}>전체 {title} 보기 →</Link></div>
    </section>
  );
}
